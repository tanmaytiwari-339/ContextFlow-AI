import { Link } from "react-router-dom";

function RegisterForm() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-[450px]">
      <h1 className="text-3xl font-bold mb-6">
        Create Account
      </h1>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Employee ID"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Name"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3"
        />

        <select className="w-full border rounded-lg p-3">
          <option>EMPLOYEE</option>
          <option>ADMIN</option>
        </select>

        <button
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-indigo-600 font-semibold"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;