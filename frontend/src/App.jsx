import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroCarousel from "./components/HeroCarousel";

export default function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Show arrow when scrolling
  useEffect(() => {
    const onScroll = () => {
      setShowTopBtn(window.scrollY > 300);

      // Animate sections on scroll
      document.querySelectorAll(".reveal").forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section id="home" className="pb-2 reveal">
        <HeroCarousel height="340px" />
      </section>

      {/* WHY CFTRI */}
      <section id="about" className="page-container py-6 reveal">
        <h3 className="page-title text-center mb-4">Why Choose CFTRI?</h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

          {/* FLOAT ANIMATED CARD */}
          <div className="card p-5 animated-card">
            <h4 className="font-semibold text-green-900">Hands-on Training</h4>
            <p className="text-gray-600 text-sm mt-1">
              Practical sessions in CFTRI labs.
            </p>
          </div>

          <div className="card p-5 animated-card">
            <h4 className="font-semibold text-green-900">Govt Certification</h4>
            <p className="text-gray-600 text-sm mt-1">Recognized nationwide.</p>
          </div>

          <div className="card p-5 animated-card">
            <h4 className="font-semibold text-green-900">International Friendly</h4>
            <p className="text-gray-600 text-sm mt-1">Open for global applicants.</p>
          </div>

        </div>
      </section>

      {/* UPCOMING COURSES */}
      <section id="upcoming" className="page-container py-6 reveal">
        <h3 className="page-title text-center mb-4">Upcoming Courses</h3>

        <div className="card max-w-xl mx-auto p-5 text-center animated-card">
          <p className="text-gray-600">No upcoming courses</p>
        </div>
      </section>

      {/* AVAILABLE COURSES */}
      <section id="courses" className="page-container py-6 reveal">
        <h3 className="page-title text-center mb-4">Available Courses</h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

          <div className="card p-5 animated-card">
            <h4 className="text-lg font-bold text-green-900">
              Food Processing & Preservation
            </h4>
            <p className="text-sm mt-2">Duration: 2 Weeks</p>
            <p className="text-sm">Fee: ₹12,500</p>
            <button className="btn-green mt-4 w-full py-2">Apply</button>
          </div>

          <div className="card p-5 animated-card">
            <h4 className="text-lg font-bold text-green-900">
              Chocolate Technology
            </h4>
            <p className="text-sm mt-2">Duration: 1 Week</p>
            <p className="text-sm">Fee: ₹8,000</p>
            <button className="btn-green mt-4 w-full py-2">Apply</button>
          </div>

        </div>
      </section>

      {/* LOGIN + REGISTER */}
      <section id="auth" className="page-container py-6 reveal">
        <h3 className="page-title text-center mb-4">Login & Register</h3>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="card p-6 animated-card">
            <h4 className="text-xl font-bold text-green-900 mb-3">Login</h4>
            <input className="input-box mb-3" placeholder="Email" />
            <input className="input-box mb-3" placeholder="Password" type="password" />
            <button className="btn-green w-full py-2">Login</button>
          </div>

          <div className="card p-6 animated-card">
            <h4 className="text-xl font-bold text-green-900 mb-3">Register</h4>
            <input className="input-box mb-3" placeholder="Full Name" />
            <input className="input-box mb-3" placeholder="Email" />
            <input className="input-box mb-3" placeholder="Password" type="password" />
            <input className="input-box mb-4" placeholder="Confirm Password" type="password" />
            <button className="btn-green w-full py-2">Register</button>
          </div>

        </div>
      </section>

      <Footer />

      {/* ⭐ RIGHT-SIDE CONTACT WIDGET WITH ANIMATION */}
      <div className="fixed right-3 top-1/3 flex flex-col gap-3 z-[999] animate-slide-in">

        <a href="https://wa.me/919999999999" target="_blank"
           className="contact-btn bg-green-600 hover:bg-green-700">
          <i className="fa-brands fa-whatsapp text-2xl"></i>
        </a>

        <a href="mailto:info@cftri.res.in"
           className="contact-btn bg-blue-600 hover:bg-blue-700">
          <i className="fa-solid fa-envelope text-xl"></i>
        </a>

        <a href="tel:+918212234567"
           className="contact-btn bg-orange-500 hover:bg-orange-600">
          <i className="fa-solid fa-phone text-xl"></i>
        </a>

        <a href="#faq"
           className="contact-btn bg-indigo-600 hover:bg-indigo-700">
          <i className="fa-solid fa-circle-question text-xl"></i>
        </a>

        <a href="#feedback"
           className="contact-btn bg-yellow-500 hover:bg-yellow-600">
          <i className="fa-solid fa-comment-dots text-xl"></i>
        </a>

      </div>

      {/* SCROLL TO TOP BUTTON */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-5 bg-green-700 text-white shadow-xl 
                     w-12 h-12 rounded-full flex items-center justify-center 
                     text-2xl hover:bg-green-800 transition-all z-[999]"
        >
          ↑
        </button>
      )}
    </>
  );
}
