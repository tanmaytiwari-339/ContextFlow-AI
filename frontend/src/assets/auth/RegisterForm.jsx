import { Link } from "react-router-dom";

function RegisterForm() {
  return (
    <div className="w-full max-w-md">

      <h2 className="text-4xl font-bold text-slate-900 mb-2">
        Create Account
      </h2>

      <p className="text-slate-500 mb-8">
        Join ContextFlow AI
      </p>

      <form className="space-y-4">

        <input
          type="text"
          placeholder="Employee ID"
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