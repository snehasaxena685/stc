import React from "react";

export default function ApplyModal({ isOpen, course, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="apply-modal-bg" style={{ display: "flex" }}>
      <div className="apply-modal">
        <h3 className="text-lg font-bold text-[var(--g1)] mb-3">
          Confirm Application
        </h3>

        <div className="bg-green-50 border border-green-300 p-3 rounded mb-4">
          Applying for: <b>{course?.title}</b>
        </div>

        <button
          onClick={onConfirm}
          className="w-full py-2 bg-[var(--g2)] text-white rounded font-semibold"
        >
          Confirm Apply
        </button>

        <button
          onClick={onClose}
          className="w-full py-2 mt-2 bg-gray-200 rounded font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
