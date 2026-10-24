package com.contextflow.security;
import com.contextflow.entity.User;
import com.contextflow.repository.UserRepository;

import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final JwtService jwtService;
    private final UserRepository userRepository;
    public JwtAuthenticationFilter(JwtService jwtService,UserRepository userRepository){
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException{

        String authHeader = request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }

        String token = authHeader.substring(7);
        

        String employeeId = jwtService.extractEmployeeId(token);
        

        User user = userRepository.findByEmployeeId(employeeId).orElse(null);
        if(user != null && jwtService.isTokenValid(token,user)){
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                user,
                null,
                List.of(
                    new SimpleGrantedAuthority(
                        "ROLE_" + user.getRole()
                    )
                )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        System.out.println(
            "Method: " + request.getMethod()
            + " | URI: " + request.getRequestURI()
            + " | Authentication: "
            + SecurityContextHolder.getContext().getAuthentication()
        );

        filterChain.doFilter(request,response);

    }
    
}
