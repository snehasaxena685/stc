export default function HeroCarousel() {
  return (
    <section className="bg-gradient-to-r from-[#063f17] to-[#0b6c2e] text-white py-24 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            CSIR - CFTRI Short Term Training Portal
          </h1>

          <p className="mt-5 text-lg text-green-100">
            Practical food science training programs designed for students,
            professionals & startups—2025–2026.
          </p>

          <div className="mt-8 flex gap-4">
            <a href="/courses"
               className="bg-white text-green-900 px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-100">
              Explore Courses
            </a>
            <a href="/register"
               className="border border-green-200 bg-green-300/20 px-6 py-3 rounded-lg font-semibold hover:bg-green-200 hover:text-green-900">
              Register Now
            </a>
          </div>
        </div>

        <div className="h-64 bg-white/5 border border-green-300 rounded-xl flex items-center justify-center text-green-200">
          Banner Image Here
        </div>

      </div>

    </section>
  );
}
