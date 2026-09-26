import { Link } from "react-router-dom";
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Admin login:", {
      email,
      password,
    });
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-2 text-4xl font-bold text-slate-900">
        Admin Login
      </h2>

      <p className="mb-8 text-slate-500">
        Login to access the admin panel
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Admin Email
          </label>

          <input
            type="email"
            placeholder="admin@contextflow.ai"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full
              rounded-lg
              border
              border-slate-300
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
            rounded-lg
            bg-indigo-600
            py-3
            font-medium
            text-white
            transition
            hover:bg-indigo-700
          "
        >
          Login as Admin
        </button>
      </form>

      <p className="mt-6 text-center text-slate-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-indigo-600"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;