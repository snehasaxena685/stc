import React, { useEffect } from "react";

export default function Hero({ openRegister }) {
  useEffect(() => {
    // Reveal animations
    setTimeout(() => {
      document.querySelectorAll(".fade").forEach((el) =>
        el.classList.add("show")
      );
      document.querySelectorAll(".slide-left").forEach((el) =>
        el.classList.add("show")
      );
    }, 200);
  }, []);

  return (
    <section id="home" className="container mx-auto px-4 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* LEFT IMAGE */}
        <div className="slide-left">
          <img
            src="/images/Mansion_pic.jpg"
            alt="CFTRI Building"
            className="w-full h-auto rounded-xl shadow-xl bg-white p-2"
          />
        </div>

        {/* RIGHT TEXT */}
        <div className="fade">
          <h1 className="text-4xl font-bold text-[var(--g1)]">
            Short Term Courses
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            CFTRI-certified training programmes, hands-on labs, and
            industry-oriented skill development.
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href="#courses"
              className="px-5 py-2 bg-[var(--g2)] text-white rounded shadow hover:bg-[var(--g1)] transition"
            >
              View Courses
            </a>

            <button
              onClick={openRegister}
              className="px-5 py-2 border border-[var(--g1)] text-[var(--g1)] rounded hover:bg-gray-100"
            >
              Register
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
