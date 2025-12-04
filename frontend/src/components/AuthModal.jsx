// src/components/AuthModal.jsx
import React, { useState } from "react";

export default function AuthModal({ mode = "login", onClose, onSwitch, onLogin, onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {
    e.preventDefault();
    if (mode === "register") {
      if (!name || !email || !password) return alert("All fields required");
      onRegister({ name, email, password });
    } else {
      if (!email || !password) return alert("Email & password required");
      onLogin({ email, password });
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-semibold text-gov-green">{mode === "login" ? "Login" : "Register"}</div>
          <button onClick={onClose} className="text-slate-600">✖</button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          {mode === "register" && (
            <div>
              <label className="text-xs text-slate-600">Full name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded" placeholder="Your full name" />
            </div>
          )}

          <div>
            <label className="text-xs text-slate-600">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded" placeholder="you@example.com" />
          </div>

          <div>
            <label className="text-xs text-slate-600">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded" placeholder="••••••" />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 rounded bg-gov-green text-white">{mode === "login" ? "Login" : "Create account"}</button>
            <button type="button" onClick={onSwitch} className="text-sm text-gov-green underline">{mode === "login" ? "Create account" : "Already have an account? Login"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
