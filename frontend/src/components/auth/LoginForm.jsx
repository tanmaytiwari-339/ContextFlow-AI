import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
      <h1 className="text-3xl font-bold mb-2">
        ContextFlow AI
      </h1>

      <p className="text-gray-500 mb-6">
        Enterprise Knowledge Intelligence Platform
      </p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Employee ID"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3"
        />

        <button
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-indigo-600 font-semibold"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;