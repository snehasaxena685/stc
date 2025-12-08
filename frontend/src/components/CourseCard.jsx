import React from "react";

export default function CourseCard({ course, onApply }) {
  return (
    <div className="card hover:-translate-y-1 transition-all duration-300 fade">

      {/* Image */}
      <img
        src={course.image || "/images/course_placeholder.jpg"}
        className="w-full h-40 object-cover rounded-lg"
        alt={course.title}
      />

      {/* Title */}
      <h3 className="text-lg font-semibold text-[var(--g1)] mt-3">
        {course.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-1">
        {course.description || "..."}
      </p>

      {/* Buttons */}
      <div className="flex gap-2 mt-3">
        <a
          href={`/course/${course.id}`}
          className="px-3 py-1 bg-[var(--g2)] text-white rounded text-sm hover:bg-[var(--g1)] transition"
        >
          View
        </a>

        <button
          className="px-3 py-1 border border-[var(--g1)] rounded text-sm hover:bg-gray-100"
          onClick={() => onApply(course)}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
