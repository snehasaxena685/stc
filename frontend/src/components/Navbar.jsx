import { useState } from "react";
import { Link } from "react-scroll";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full shadow-md z-50 bg-white sticky top-0">

      {/* 🔹 TOP MULTILINGUAL GOVT HEADER */}
      <div className="w-full bg-gradient-to-r from-[#d6ecff] to-[#bfe3ff] px-4 py-3 border-b border-blue-300">
        <div className="max-w-7xl mx-auto flex items-center gap-4">

          {/* Logo */}
          <img
            src="/cftri-logo.png"
            className="w-14 h-14 object-contain"
            alt="CFTRI Logo"
          />

          <div className="leading-tight">

            {/* Hindi/Kannada */}
            <p className="text-[13px] font-semibold text-[#004d40]">
              सीएफटीआरआई – केंद्रीय खाद्य प्रौद्योगिकी अनुसंधान संस्थान
            </p>

            {/* English */}
            <p className="text-sm font-extrabold text-[#003527] uppercase mt-1">
              CSIR – CENTRAL FOOD TECHNOLOGICAL RESEARCH INSTITUTE
            </p>

            <p className="text-xs text-gray-700">
              Ministry of Science & Technology, Govt. of India, Mysuru – 570020
            </p>
          </div>

        </div>
      </div>

      {/* 🔹 MAIN GREEN NAVBAR */}
      <nav className="bg-[#125c2c] text-white">
        <div className="max-w-7xl mx-auto px-4">

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex justify-center gap-10 py-3 text-[15px] font-medium tracking-wide">

            <NavItem label="Home" to="home" />
            <NavItem label="Courses" to="courses" />
            <NavItem label="Login" to="auth" />
            <NavItem label="Register" to="auth" />

          </ul>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex justify-between items-center py-3">
            <span className="text-lg font-semibold">Menu</span>
            <button 
              onClick={() => setOpen(!open)} 
              className="text-3xl focus:outline-none"
              aria-label="Toggle Menu"
            >
              ☰
            </button>
          </div>

          {/* MOBILE MENU */}
          {open && (
            <div className="md:hidden bg-[#0d4b22] px-6 py-4 space-y-4 text-white">
              <MobileLink label="Home" to="home" close={() => setOpen(false)} />
              <MobileLink label="Courses" to="courses" close={() => setOpen(false)} />
              <MobileLink label="Login" to="auth" close={() => setOpen(false)} />
              <MobileLink label="Register" to="auth" close={() => setOpen(false)} />
            </div>
          )}

        </div>
      </nav>

    </header>
  );
}

function NavItem({ label, to }) {
  return (
    <li className="hover:text-yellow-300 transition cursor-pointer">
      <Link to={to} smooth duration={400} offset={-70}>
        {label}
      </Link>
    </li>
  );
}

function MobileLink({ label, to, close }) {
  return (
    <div 
      className="hover:text-yellow-300 cursor-pointer"
      onClick={close}
    >
      <Link to={to} smooth duration={400} offset={-70}>
        {label}
      </Link>
    </div>
  );
}
