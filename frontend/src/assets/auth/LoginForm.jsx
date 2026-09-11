import { Link } from "react-router-dom";
import { useState } from "react";

function LoginForm() {

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/api/auth/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: employeeId,
          password: password,
        }),
      });
      const data = await response.text();
      if(response.ok){
        if (data === "Invalid password" || data === "Employee not found") {
            console.log("Login failed:", data);
            return;
        }
        localStorage.setItem("token",data);
        console.log("Login successful");
        console.log("JWT:",data);
      }else{
        console.log("Login failed:",data);
      }

      
    } catch (error){
      console.error("Error connecting to backend:", error);

    }
  };

  return (
    <div className="w-full max-w-md">

      <h2 className="text-4xl font-bold text-slate-900 mb-2">
        Welcome Back
      </h2>

      <p className="text-slate-500 mb-8">
        Login to access your workspace
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm font-medium mb-2">
            Employee ID
          </label>

          <input
            type="text"
            placeholder="EMP001"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="
              w-full
              border
              border-slate-300
              rounded-lg
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full
              border
              border-slate-300
              rounded-lg
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <button
            type="button"
            className="text-indigo-600 hover:text-indigo-700"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="
            w-full
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            py-3
            rounded-lg
            font-medium
            transition
          "
        >
          Login
        </button>

      </form>

      <p className="mt-6 text-center text-slate-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-indigo-600 font-medium"
        >
          Register
        </Link>
      </p>

    </div>
  );
}

export default LoginForm;