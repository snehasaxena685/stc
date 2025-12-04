// src/components/ProfileCard.jsx
import React from "react";

export default function ProfileCard({ user }) {
  if (!user) return <div className="bg-white p-6 rounded">Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-slate-600">Name</div>
          <div className="font-medium">{user.name}</div>

          <div className="mt-3 text-sm text-slate-600">Email</div>
          <div className="font-medium">{user.email}</div>
        </div>

        <div>
          <div className="text-sm text-slate-600">Registrations</div>
          <ul className="mt-2 list-disc list-inside text-sm text-slate-700">
            {(user.registrations || []).length === 0 && <li>No registrations yet</li>}
            {(user.registrations || []).map((r, i) => <li key={i}>{r.title} — {r.status}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
