import authImage from "../../assets/auth/auth-bg.png";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="grid md:grid-cols-2">

          {/* Left Section */}
          <div className="p-6">
            <div className="mb-4">
              <h1 className="font-bold text-lg text-indigo-600">
                ContextFlow AI
              </h1>
            </div>

            <div className="relative rounded-xl overflow-hidden h-[500px]">

              <img
                src={authImage}
                alt="ContextFlow AI"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30"></div>

              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-semibold max-w-xs">
                  "Turn your documents into knowledge."
                </h3>

                <p className="mt-2 text-sm opacity-90">
                  — ContextFlow AI
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center justify-center p-8 md:p-12">
            {children}
          </div>

        </div>

      </div>
    </div>
  );
}

export default AuthLayout;