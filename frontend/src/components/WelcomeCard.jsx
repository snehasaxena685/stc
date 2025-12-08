import React from "react";

export default function WelcomeCard({ user }) {
  if (!user) return null;

  return (
    <div className="card fade">
      <h2 className="text-xl font-bold text-[var(--g1)]">
        Welcome, {user.name}
      </h2>

      <p className="text-gray-600 text-sm mt-1">
        Manage your profile & applications.
      </p>
    </div>
  );
}
