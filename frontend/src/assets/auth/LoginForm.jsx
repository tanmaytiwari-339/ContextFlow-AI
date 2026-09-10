import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="w-full max-w-md">

      <h2 className="text-4xl font-bold text-slate-900 mb-2">
        Welcome Back
      </h2>

      <p className="text-slate-500 mb-8">
        Login to access your workspace
      </p>

      <form className="space-y-5">

        <div>
          <label className="block text-sm font-medium mb-2">
            Employee ID
          </label>

          <input
            type="text"
            placeholder="EMP001"
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