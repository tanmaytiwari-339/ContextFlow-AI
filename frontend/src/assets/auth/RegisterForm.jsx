import { Link } from "react-router-dom";
import { useState } from "react";

function RegisterForm() {

  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch("http://localhost:8081/api/auth/register",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: employeeId,
          name: name,
          password: password,
          role: role,
        }),
      }

    );

    const data = await response.text();
    if(response.ok){
      console.log("Registration:", data);
    }else {
      console.log("Registration failed:", data);
    }
    
  } catch (error){
    console.error("Error connecting to backend:", error);
  }
};
  return (
    <div className="w-full max-w-md">

      <h2 className="text-4xl font-bold text-slate-900 mb-2">
        Create Account
      </h2>

      <p className="text-slate-500 mb-8">
        Join ContextFlow AI
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Employee ID"
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

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
        >
          <option value="EMPLOYEE">
            EMPLOYEE
          </option>

          <option value="ADMIN">
            ADMIN
          </option>
        </select>

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
          Register
        </button>

      </form>

      <p className="mt-6 text-center text-slate-600">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-indigo-600 font-medium"
        >
          Login
        </Link>
      </p>

    </div>
  );
}

export default RegisterForm;