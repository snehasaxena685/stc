import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroCarousel from "./components/HeroCarousel";

export default function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // ------------------------------
  // STATES FOR LOGIN & REGISTER
  // ------------------------------
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ------------------------------
  // LOGIN API CALL
  // ------------------------------
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      alert(data.msg || "Login error");

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  // ------------------------------
  // REGISTER API CALL (FIXED)
  // ------------------------------
  const handleRegister = async () => {
    if (regPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName, // ✅ FIXED
          email: regEmail,
          password: regPassword,
        }),
      });

      const data = await res.json();
      alert(data.msg || "Registration failed");

      if (res.ok) {
        // Clear fields on success
        setFullName("");
        setRegEmail("");
        setRegPassword("");
        setConfirmPassword("");
      }

    } catch (err) {
      alert("Registration failed");
    }
  };

  // ------------------------------
  // SCROLL & ANIMATION LISTENERS
  // ------------------------------
  useEffect(() => {
    const onScroll = () => {
      setShowTopBtn(window.scrollY > 300);

      document.querySelectorAll(".reveal").forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) el.classList.add("active");
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

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
          <div className="card p-5 animated-card">
            <h4 className="font-semibold text-green-900">Hands-on Training</h4>
            <p className="text-gray-600 text-sm mt-1">Practical sessions in CFTRI labs.</p>
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

      {/* UPCOMING */}
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
            <h4 className="text-lg font-bold text-green-900">Food Processing & Preservation</h4>
            <p className="text-sm mt-2">Duration: 2 Weeks</p>
            <p className="text-sm">Fee: ₹12,500</p>
            <button className="btn-green mt-4 w-full py-2">Apply</button>
          </div>

          <div className="card p-5 animated-card">
            <h4 className="text-lg font-bold text-green-900">Chocolate Technology</h4>
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

          {/* LOGIN */}
          <div className="card p-6 animated-card">
            <h4 className="text-xl font-bold mb-3 text-green-900">Login</h4>

            <input
              className="input-box mb-3"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />

            <input
              className="input-box mb-3"
              placeholder="Password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            <button className="btn-green w-full py-2" onClick={handleLogin}>
              Login
            </button>
          </div>

          {/* REGISTER */}
          <div className="card p-6 animated-card">
            <h4 className="text-xl font-bold mb-3 text-green-900">Register</h4>

            <input
              className="input-box mb-3"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              className="input-box mb-3"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />

            <input
              className="input-box mb-3"
              placeholder="Password"
              type="password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />

            <input
              className="input-box mb-4"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="btn-green w-full py-2" onClick={handleRegister}>
              Register
            </button>
          </div>

        </div>
      </section>

      <Footer />

      {/* SCROLL TOP BTN */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-5 bg-green-700 text-white shadow-xl w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:bg-green-800 transition-all z-[999]"
        >
          ↑
        </button>
      )}
    </>
  );
}
