package com.contextflow.service;
import com.contextflow.entity.User;
import com.contextflow.repository.UserRepository;
import com.contextflow.security.JwtService;
import com.contextflow.dto.RegisterRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    public AuthService(UserRepository userRepository,JwtService jwtService){
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();
    public String login(String employeeId,String password){

        User user = userRepository
                .findByEmployeeId(employeeId)
                .orElse(null);
        if(user == null){
            return "Employee not found";
        }
        if(!passwordEncoder.matches(password,user.getPassword())){
            return "Invalid password";
        }
        return jwtService.generateToken(user);
        
    }
    public String register(RegisterRequest request){
        if(userRepository.findByEmployeeId(request.getEmployeeId()).isPresent()){
            return "Employee Id already exists";
        }
        User user = new User();
        user.setEmployeeId(request.getEmployeeId());
        user.setName(request.getName());

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole("USER");
        userRepository.save(user);
        return "Employee registered successfully";
    }
}
