import React, { useEffect } from "react";

export default function AuthModal({
  isOpen,
  mode,
  onClose,

  /* LOGIN */
  loginEmail,
  loginPassword,
  setLoginEmail,
  setLoginPassword,
  handleLogin,

  /* REGISTER */
  fullName,
  regEmail,
  regPassword,
  confirmPassword,
  address,
  phone,
  nationality,

  setFullName,
  setRegEmail,
  setRegPassword,
  setConfirmPassword,
  setAddress,
  setPhone,
  setNationality,

  handleRegister,
  switchToRegister,
  switchToLogin,
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="glass-modal-bg" style={{ display: "flex" }}>
      <div className="glass-modal open relative">

        <button className="modal-close-btn" onClick={onClose}>×</button>

        {/* LEFT SECTION */}
        <div className="glass-left">
          <img src="/images/logo1.jpeg" className="w-20 rounded bg-white p-2" />
          <h2>CSIR-CFTRI STC Portal</h2>
          <p>Login to apply for trainings, manage your profile and more.</p>
          <div className="text-sm opacity-80">Secure login • Govt Certified</div>
        </div>

        {/* RIGHT SECTION */}
        <div className="glass-right">

          {/* LOGIN FORM */}
          {mode === "login" && (
            <>
              <h3 className="text-lg font-semibold text-[var(--g1)] mb-4">Login</h3>

              <input
                className="input-field mb-3"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />

              <input
                className="input-field mb-4"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />

              <button
                className="w-full py-2 bg-[var(--g2)] text-white rounded font-semibold"
                onClick={handleLogin}
              >
                Sign In
              </button>

              <p className="text-sm mt-4">
                New here?{" "}
                <button className="text-[var(--g2)] font-semibold" onClick={switchToRegister}>
                  Create an account
                </button>
              </p>
            </>
          )}

          {/* REGISTER FORM */}
          {mode === "register" && (
            <>
              <h3 className="text-lg font-semibold text-[var(--g1)] mb-4">Register</h3>

              <input
                className="input-field mb-3"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <input
                className="input-field mb-3"
                placeholder="Email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />

              <input
                className="input-field mb-3"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <input
                className="input-field mb-3"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                className="input-field mb-3"
                placeholder="Nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              />

              <input
                className="input-field mb-3"
                type="password"
                placeholder="Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />

              <input
                className="input-field mb-4"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                className="w-full py-2 bg-[var(--g1)] text-white rounded font-semibold"
                onClick={handleRegister}
              >
                Register
              </button>

              <p className="text-sm mt-4">
                Already registered?{" "}
                <button className="text-[var(--g1)] font-semibold" onClick={switchToLogin}>
                  Login
                </button>
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
