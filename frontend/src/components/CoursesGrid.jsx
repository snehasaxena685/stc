import React from "react";
import CourseCard from "./CourseCard";

export default function CoursesGrid({ courses, onApply }) {
  return (
    <section id="courses" className="container mx-auto px-4 mt-14 fade">
      <h2 className="text-2xl font-bold text-[var(--g1)] mb-4">
        Courses Offered
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.length === 0 && (
          <p className="text-gray-500 col-span-full">No courses available</p>
        )}

        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onApply={onApply} />
        ))}
      </div>
    </section>
  );
}
