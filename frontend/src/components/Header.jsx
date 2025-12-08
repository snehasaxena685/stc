import React from "react";

export default function Header({ user, onLogout }) {
  return (
    <header className="bg-gradient-to-r from-[var(--g1)] to-[var(--g2)] text-white shadow-lg relative">
      {/* Floating Shapes */}
      <div className="floating-bg"></div>
      <div className="floating-bg2"></div>

      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* LEFT LOGO + TEXT */}
        <div className="flex items-center gap-4">
          <img
            src="/images/logo1.jpeg"
            className="w-24 bg-white p-2 rounded shadow"
            alt="CFTRI Logo"
          />

          <div>
            <div className="text-xs opacity-90">CSIR – CENTRAL FOOD TECHNOLOGICAL RESEARCH INSTITUTE</div>
            <div className="text-lg font-bold leading-tight">
              Short Term Courses Portal
            </div>
          </div>
        </div>

        {/* RIGHT USER SECTION */}
        <div className="flex gap-3 items-center">

          {user ? (
            <>
              <span className="hidden sm:inline text-sm">
                Welcome, <b>{user.name}</b>
              </span>

              <button
                onClick={onLogout}
                className="bg-white text-[var(--g1)] px-3 py-1 rounded shadow hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <span className="text-sm italic opacity-80">
              Not logged in
            </span>
          )}

        </div>
      </div>
    </header>
  );
}
