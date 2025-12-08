import React from "react";

export default function TrainingsScroller({ trainings, onApply }) {
  return (
    <div className="card fade">
      <h2 className="text-xl font-bold text-[var(--g1)]">Upcoming Trainings</h2>

      <div className="scroll-box mt-4 bg-white border rounded-lg shadow-inner max-h-[300px] overflow-y-auto">
        {trainings.length === 0 && (
          <p className="text-center text-gray-500 py-4">No trainings available</p>
        )}

        {trainings.map((course) => (
          <div key={course.id} className="p-3 border-b">
            <h3 className="font-semibold text-[var(--g1)]">{course.title}</h3>

            <p className="text-sm text-[var(--muted)]">
              <b>Code:</b> {course.code} &nbsp; | &nbsp;
              <b>Last Date:</b> {course.lastDate}
            </p>

            <button
              className="mt-2 px-3 py-1 bg-[var(--g2)] text-white text-sm rounded hover:bg-[var(--g1)] transition"
              onClick={() => onApply(course)}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
