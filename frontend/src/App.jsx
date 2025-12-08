import React, { useEffect, useState } from "react";

/* ============================================================
   GLOBAL CSS – injected once into <head>
   Theme: Indian Govt Green + Olive (soft, professional)
============================================================ */
const globalCSS = `
:root {
  --g1: #0a5132;    /* deep govt green */
  --g2: #0c8f54;    /* bright govt green */
  --hero1: #0a6a3a; /* hero top */
  --hero2: #064b2b; /* hero bottom */
  --olive-soft: #f5f6eb;
  --olive-card: #f4f7ea;
  --muted: #6b7280;
  --card-shadow: 0 18px 45px rgba(5, 40, 25, 0.25);
}

/* BASIC RESET */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial,
    sans-serif;
  background: radial-gradient(circle at top left, #eefdf5 0, #dff9eb 35%, #f6fff9 80%);
  background-attachment: fixed;
  color: #052016;
}

/* FLOATING GLOWS */
.floating-bg {
  position: fixed;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, rgba(12, 143, 84, 0.24), transparent 70%);
  top: -140px;
  left: -120px;
  z-index: -2;
  filter: blur(40px);
}
.floating-bg2 {
  position: fixed;
  width: 440px;
  height: 440px;
  background: radial-gradient(circle, rgba(10, 81, 50, 0.22), transparent 70%);
  bottom: -160px;
  right: -120px;
  z-index: -2;
  filter: blur(42px);
}

/* FADE-IN ANIMATION */
.fade {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade.show {
  opacity: 1;
  transform: none;
}

/* TYPO UTILS (simple) */
.text-lg { font-size: 1.05rem; }
.text-base { font-size: 0.95rem; }
.text-sm { font-size: 0.85rem; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.text-green-900 { color: #064e3b; }
.text-gray-700 { color: #374151; }
.text-gray-600 { color: #4b5563; }
.text-gray-500 { color: #6b7280; }
.mb-3 { margin-bottom: 12px; }
.mb-2 { margin-bottom: 8px; }
.mt-2 { margin-top: 8px; }

/* SIMPLE GRID HELPERS */
.grid-two {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
@media (max-width: 640px) {
  .grid-two {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* LAYOUT SHELL */
.section-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 18px 36px;
}

/* NAVBAR */
.navbar-stc {
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(90deg, var(--g1), var(--g2));
  box-shadow: 0 14px 30px rgba(3, 28, 15, 0.45);
}
.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.navbar-logo {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: #ffffff;
  padding: 5px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  object-fit: contain;
}
.navbar-titles {
  display: flex;
  flex-direction: column;
}
.navbar-title-top {
  font-size: 11px;
  letter-spacing: 0.04em;
  color: #e3ffef;
  text-transform: uppercase;
}
.navbar-title-main {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-top: 2px;
}
.navbar-links {
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 13px;
  color: #e6fffb;
}
.navbar-link {
  cursor: pointer;
  position: relative;
  white-space: nowrap;
}
.navbar-link:hover {
  color: #ffffff;
}
.navbar-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 0;
  height: 2px;
  border-radius: 999px;
  background: #ffffff;
  transition: width 0.25s ease;
}
.navbar-link:hover::after {
  width: 100%;
}

/* NAVBAR RIGHT (HELLO + BUTTON) */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.navbar-hello {
  font-size: 12px;
  color: #e0ffe9;
}
.navbar-cta {
  background: #ffffff;
  color: #0b5132;
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.28);
}
.navbar-cta:hover {
  background: #f7fff9;
}

/* MOBILE NAV */
.navbar-burger {
  display: none;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  padding: 4px 8px;
  cursor: pointer;
  color: white;
  font-size: 18px;
}
@media (max-width: 800px) {
  .navbar-inner {
    flex-wrap: wrap;
    gap: 8px;
  }
  .navbar-links {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 6px;
  }
  .navbar-right {
    margin-left: auto;
  }
}
@media (max-width: 640px) {
  .navbar-links {
    display: none;
  }
  .navbar-links.open {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: rgba(3, 46, 27, 0.96);
    padding: 10px 14px;
    margin-top: 8px;
    border-radius: 14px;
  }
  .navbar-burger {
    display: block;
  }
}

/* HERO SECTION */
.hero-shell {
  max-width: 1200px;
  margin: 18px auto 0;
  padding: 22px 18px 26px;
  border-radius: 0 0 30px 30px;
  background: linear-gradient(135deg, var(--hero1), var(--hero2));
  color: #fefdfb;
  box-shadow: 0 24px 52px rgba(3, 20, 11, 0.65);
}
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: 28px;
}
@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .hero-shell {
    border-radius: 0 0 24px 24px;
  }
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(7, 41, 25, 0.85);
  font-size: 11px;
  margin-bottom: 10px;
}
.hero-badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #4cffb0;
}
.hero-title {
  font-size: 30px;
  font-weight: 800;
  line-height: 1.25;
}
@media (max-width: 640px) {
  .hero-title {
    font-size: 24px;
  }
}
.hero-subtitle {
  font-size: 13px;
  color: #d3fbe8;
  margin-top: 8px;
}
.hero-meta {
  margin-top: 14px;
  font-size: 12px;
  color: #f8fbe7;
}
.hero-meta-label {
  font-weight: 600;
  color: #ffec8c;
}
.hero-meta-line {
  margin-top: 4px;
}
.hero-actions {
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.hero-btn-primary {
  border: none;
  border-radius: 999px;
  padding: 10px 20px;
  background: linear-gradient(125deg, #ffd75a, #f6b517);
  color: #07301a;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.45);
}
.hero-btn-primary:hover {
  filter: brightness(1.05);
}
.hero-btn-outline {
  border-radius: 999px;
  padding: 9px 18px;
  border: 1px solid #bbf7d0;
  color: #e9fff5;
  background: transparent;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}
.hero-btn-outline:hover {
  background: rgba(7, 37, 21, 0.6);
}

/* PARTICIPANT HERO PANEL */
.participant-panel {
  background: radial-gradient(circle at top left, #0b5b3a 0, #043525 55%, #02211a 100%);
  border-radius: 22px;
  padding: 16px 18px 18px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.7);
}
.participant-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
}
.participant-tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}
.participant-tag {
  font-size: 10px;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(6, 146, 87, 0.9);
  color: #e0ffef;
}
.participant-text {
  font-size: 12px;
  color: #e5fff4;
  margin-bottom: 8px;
}
.participant-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  background: rgba(5, 107, 60, 0.96);
  border-radius: 999px;
  padding: 3px 9px;
  color: #d1ffe6;
}
.participant-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #58ffae;
  box-shadow: 0 0 0 4px rgba(88, 255, 174, 0.2);
}
.participant-login-hint {
  font-size: 11px;
  color: #a7f3ce;
  margin-top: 10px;
}

/* UPCOMING TRAININGS STRIP */
.upcoming-strip {
  margin-top: 16px;
  border-radius: 26px;
  background: radial-gradient(circle at top left,#f7f9ef 0,#edf3dd 40%,#f6fbeb 100%);
  box-shadow: 0 20px 50px rgba(9, 51, 29, 0.26);
  padding: 22px 20px 22px;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1.1fr);
  gap: 20px;
}
@media (max-width: 960px) {
  .upcoming-strip {
    grid-template-columns: minmax(0, 1fr);
  }
}
.upcoming-pill {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--g1);
  color: #fdfdf5;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
}
.upcoming-list {
  background: #ffffff;
  border-radius: 18px;
  padding: 6px 8px 8px;
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.08);
}
.upcoming-card {
  position: relative;
  background: #f7fbf2;
  border-radius: 14px;
  margin: 6px 4px;
  padding: 9px 12px;
  border: 1px solid #dbe7cf;
  display: flex;
  flex-direction: column;
  gap: 2px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.25s ease, background 0.25s ease;
}
.upcoming-card.show {
  opacity: 1;
  transform: translateY(0);
}
.upcoming-card:hover {
  background: #f0f7e6;
  box-shadow: 0 14px 26px rgba(11, 64, 31, 0.14);
}
.upcoming-title {
  font-size: 14px;
  font-weight: 600;
  color: #064e3b;
}
.upcoming-meta {
  font-size: 11px;
  color: #4b5563;
}
.upcoming-chip {
  margin-top: 2px;
  font-size: 10px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 7px;
  border-radius: 999px;
  background: #e2f7d6;
  color: #166534;
}
.btn-schedule {
  margin-top: 16px;
  border-radius: 999px;
  border: none;
  padding: 9px 18px;
  background: #0b5d36;
  color: #e8fff4;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.25);
}
.btn-schedule:hover {
  background: #073b24;
}

/* PARTICIPANT WELCOME CARD */
.participant-block {
  background: #ffffff;
  border-radius: 22px;
  padding: 16px 18px 18px;
  box-shadow: 0 16px 45px rgba(8, 63, 35, 0.24);
}
.participant-block-title {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  color: #047857;
  letter-spacing: 0.1em;
}
.participant-block-name {
  font-size: 18px;
  font-weight: 700;
  color: #064e3b;
  margin-top: 4px;
}
.participant-block-text {
  font-size: 12px;
  color: #4b5563;
  margin-top: 6px;
}
.participant-block-btn {
  margin-top: 14px;
  border-radius: 999px;
  border: none;
  padding: 9px 16px;
  background: linear-gradient(110deg, var(--g1), var(--g2));
  color: white;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}

/* ABOUT SECTION */
.section-heading {
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  color: #064e3b;
  margin-bottom: 12px;
}
.section-subtitle {
  text-align: center;
  font-size: 13px;
  color: #374151;
  max-width: 720px;
  margin: 0 auto 18px;
}

/* GENERIC CARD */
.card-stc {
  background: #ffffff;
  border-radius: 18px;
  padding: 16px 16px 18px;
  box-shadow: 0 14px 35px rgba(15, 50, 30, 0.08);
}

/* FEATURE GRID (3 COL) */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
@media (max-width: 900px) {
  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .feature-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* COURSES GRID */
.course-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
@media (max-width: 900px) {
  .course-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .course-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
.course-title {
  font-size: 15px;
  font-weight: 700;
  color: #064e3b;
}
.course-meta {
  font-size: 12px;
  color: #4b5563;
  margin-top: 4px;
}
.btn-apply {
  margin-top: 10px;
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 9px 10px;
  background: linear-gradient(120deg, var(--g2), var(--g1));
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.btn-apply:hover {
  filter: brightness(1.06);
}

/* AUTH MODAL */
.auth-bg {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  z-index: 100;
}
.auth-box {
  width: 95%;
  max-width: 840px;
  background: #ffffff;
  border-radius: 22px;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.1fr);
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.7);
}
@media (max-width: 860px) {
  .auth-box {
    grid-template-columns: minmax(0, 1fr);
  }
}
.auth-left {
  background: radial-gradient(circle at top left, var(--g2) 0, var(--g1) 50%, #033124 100%);
  color: white;
  padding: 24px 22px 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.auth-tag {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  opacity: 0.9;
}
.auth-heading {
  font-size: 20px;
  font-weight: 800;
  margin-top: 6px;
}
.auth-left-sub {
  font-size: 13px;
  margin-top: 8px;
  color: #e3ffef;
}
.auth-mini {
  font-size: 11px;
  color: #bbf7d0;
  margin-top: 12px;
}
.auth-right {
  padding: 20px 22px 22px;
  position: relative;
}
.auth-close {
  position: absolute;
  right: 14px;
  top: 14px;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: none;
  background: #edf2f7;
  cursor: pointer;
  font-size: 16px;
}
.input-field {
  width: 100%;
  border-radius: 12px;
  border: 1px solid #d1fae5;
  padding: 8px 10px;
  font-size: 13px;
  outline: none;
}
.input-field:focus {
  border-color: var(--g2);
  box-shadow: 0 0 0 1px #a7f3d0;
}
.label-sm {
  font-size: 12px;
  color: #374151;
  margin-bottom: 4px;
}
.auth-switch {
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
}
.auth-link {
  color: #0f766e;
  cursor: pointer;
  font-weight: 600;
}

/* APPLY MODAL */
.apply-bg {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  z-index: 80;
}
.apply-box {
  width: 90%;
  max-width: 380px;
  background: #ffffff;
  border-radius: 20px;
  padding: 18px 18px 20px;
  box-shadow: 0 26px 55px rgba(0, 0, 0, 0.55);
}

/* FOOTER */
.footer-main {
  margin-top: 30px;
  background: #064e3b;
  color: #e5fff3;
  padding: 14px 10px 16px;
  text-align: center;
  font-size: 12px;
}

/* SCROLL TOP */
.scroll-top-btn {
  position: fixed;
  right: 18px;
  bottom: 20px;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: #0a5132;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.6);
  z-index: 90;
}
.scroll-top-btn:hover {
  background: #053220;
}

/* SIMPLE UTILITY FOR CENTER */
.text-center { text-align: center; }
`;

/* ============================================================
   MAIN APP COMPONENT
============================================================ */
export default function App() {
  /* Inject CSS once */
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = globalCSS;
    document.head.appendChild(style);
  }, []);

  /* GLOBAL / UI STATES */
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"
  const [navOpen, setNavOpen] = useState(false);

  /* LOGIN / REGISTER STATES */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");

  /* USER PROFILE */
  const [userProfile, setUserProfile] = useState(null);

  /* UPCOMING TRAININGS ANIM FLAG */
  const [trainingsVisible, setTrainingsVisible] = useState(false);

  /* APPLY MODAL */
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  /* Load profile, set scroll / animation */
  useEffect(() => {
    const stored = localStorage.getItem("cftri_user_profile");
    if (stored) {
      setUserProfile(JSON.parse(stored));
    }

    // start upcoming trainings smooth rise
    setTimeout(() => setTrainingsVisible(true), 300);

    const onScroll = () => {
      setShowTopBtn(window.scrollY > 260);

      document.querySelectorAll(".fade").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
          el.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const saveProfile = (profile) => {
    setUserProfile(profile);
    localStorage.setItem("cftri_user_profile", JSON.stringify(profile));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cftri_user_profile");
    setUserProfile(null);
  };

  /* ---------------- LOGIN API ---------------- */
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
      alert(data.msg || "Login attempt completed.");

      if (data.token) {
        localStorage.setItem("token", data.token);

        const profile = {
          name: data.user?.name || loginEmail.split("@")[0],
          email: data.user?.email || loginEmail,
          lastLogin: new Date().toLocaleString(),
        };

        saveProfile(profile);
        setAuthOpen(false);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check console / backend.");
    }
  };

  /* -------------- REGISTER API --------------- */
  const handleRegister = async () => {
    if (!fullName || !regEmail || !regPassword) {
      alert("Please fill Full Name, Email and Password.");
      return;
    }
    if (regPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: regEmail,
          password: regPassword,
          address,
          phone,
          nationality,
        }),
      });

      const data = await res.json();
      alert(data.msg || "Registration completed.");

      if (res.ok) {
        setAuthMode("login");
        setFullName("");
        setRegEmail("");
        setRegPassword("");
        setConfirmPassword("");
        setAddress("");
        setPhone("");
        setNationality("");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed. Check console / backend.");
    }
  };

  /* NAV MODAL OPENERS */
  const openLogin = () => {
    setAuthMode("login");
    setAuthOpen(true);
    setNavOpen(false);
  };
  const openRegister = () => {
    setAuthMode("register");
    setAuthOpen(true);
    setNavOpen(false);
  };

  /* APPLY MODAL HANDLERS */
  const openApplyModal = (course) => {
    setSelectedCourse(course);
    setApplyOpen(true);
  };

  const confirmApply = () => {
    alert("Application submitted for: " + (selectedCourse?.title || ""));
    setApplyOpen(false);
  };

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  /* DATA: UPCOMING TRAININGS + COURSES */
  const upcomingTrainings = [
    {
      title: "Dairy Technology & Quality",
      dates: "Feb 2025",
      mode: "Hybrid",
      code: "STC-01",
    },
    {
      title: "Bakery & Confectionery",
      dates: "Mar 2025",
      mode: "On-Campus",
      code: "STC-02",
    },
    {
      title: "Food Safety & Standards",
      dates: "Apr 2025",
      mode: "Online",
      code: "STC-03",
    },
    {
      title: "Cereal Processing & Fortification",
      dates: "Jun 2025",
      mode: "On-Campus",
      code: "STC-04",
    },
  ];

  const courses = [
    {
      title: "Food Processing & Preservation",
      duration: "2 Weeks",
      fee: "₹12,500",
    },
    {
      title: "Chocolate Technology",
      duration: "1 Week",
      fee: "₹8,000",
    },
    {
      title: "Bakery & Confectionery Technology",
      duration: "10 Days",
      fee: "₹10,000",
    },
    {
      title: "Food Safety & Quality Management",
      duration: "1 Week",
      fee: "₹9,500",
    },
    {
      title: "Dairy Technology & Quality",
      duration: "1 Week",
      fee: "₹9,000",
    },
    {
      title: "Entrepreneurship in Processed Foods",
      duration: "3 Days",
      fee: "₹5,000",
    },
  ];

  /* ============================================================
     JSX
  ============================================================= */
  return (
    <>
      {/* Floating soft glows */}
      <div className="floating-bg" />
      <div className="floating-bg2" />

      {/* ==================== NAVBAR ==================== */}
      <header className="navbar-stc">
        <div className="navbar-inner">
          <div className="navbar-left">
            <img
              src="/images/logo1.jpeg"
              alt="CFTRI Logo"
              className="navbar-logo"
            />
            <div className="navbar-titles">
              <div className="navbar-title-top">
                CSIR – Central Food Technological Research Institute, Mysuru
              </div>
              <div className="navbar-title-main">
                Short Term Training Courses Portal
              </div>
            </div>
          </div>

          <button
            className="navbar-burger"
            onClick={() => setNavOpen((v) => !v)}
          >
            ☰
          </button>

          <nav className={`navbar-links ${navOpen ? "open" : ""}`}>
            <span
              className="navbar-link"
              onClick={() =>
                document
                  .getElementById("home-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Home
            </span>
            <span
              className="navbar-link"
              onClick={() =>
                document
                  .getElementById("about-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              About
            </span>
            <span
              className="navbar-link"
              onClick={() =>
                document
                  .getElementById("courses-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Courses
            </span>
            <span
              className="navbar-link"
              onClick={() =>
                document
                  .getElementById("schedule-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Schedule
            </span>

            <div className="navbar-right">
              {userProfile && (
                <div className="navbar-hello">
                  Hello, <strong>{userProfile.name}</strong>
                </div>
              )}

              {!userProfile ? (
                <button className="navbar-cta" onClick={openLogin}>
                  Sign In / Register
                </button>
              ) : (
                <button className="navbar-cta" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <main id="home-section">
        <section className="hero-shell fade">
          <div className="hero-grid">
            {/* LEFT HERO CONTENT */}
            <div>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                CSIR–CFTRI • Short Term Training (STC)
              </div>

              <h1 className="hero-title">
                CFTRI Certified Short Term Training Courses in Food Science &
                Technology
              </h1>

              <p className="hero-subtitle">
                Structured, time-bound training modules in food processing,
                safety and nutrition for students, faculty, industry and
                entrepreneurs.
              </p>

              <div className="hero-meta">
                <div>
                  <span className="hero-meta-label">Training Session:</span>
                  <span> 2025–2026 (Short Term)</span>
                </div>
                <div className="hero-meta-line">
                  <span className="hero-meta-label">Mode:</span>
                  <span> On-Campus · Online · Hybrid</span>
                </div>
              </div>

              <div className="hero-actions">
                <button
                  className="hero-btn-primary"
                  onClick={() =>
                    document
                      .getElementById("schedule-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Upcoming Trainings
                </button>

                <button
                  className="hero-btn-outline"
                  onClick={userProfile ? openApplyModal : openLogin}
                >
                  {userProfile
                    ? "Apply for a Training"
                    : "Login / Register as Participant"}
                </button>
              </div>
            </div>

            {/* RIGHT PARTICIPANT PANEL */}
            <div className="participant-panel">
              <div className="participant-title">
                Participant Access – Short Term Training (STC)
              </div>

              <div className="participant-tag-row">
                <span className="participant-tag">Govt Recognised</span>
                <span className="participant-tag">Limited Seats</span>
                <span className="participant-tag">Hands-on Practicals</span>
              </div>

              <p className="participant-text">
                Use this portal to apply for CFTRI Short Term Training courses,
                track your application status and download call letters and
                certificates (where applicable).
              </p>

              <div className="participant-status">
                <span className="participant-status-dot" />
                Portal active for Short Term Training participants
              </div>

              <p className="participant-login-hint">
                {userProfile
                  ? `Logged in as ${userProfile.email}. Last login: ${userProfile.lastLogin}.`
                  : "Please login or register as a participant before submitting training applications."}
              </p>
            </div>
          </div>
        </section>

        {/* ==================== UPCOMING TRAININGS + PARTICIPANT CARD ==================== */}
        <section className="section-shell">
          <div className="upcoming-strip" id="schedule-section">
            {/* LEFT – UPCOMING LIST */}
            <div>
              <div className="upcoming-pill">Upcoming Short Term Trainings</div>

              <div className="upcoming-list">
                {upcomingTrainings.map((t, index) => (
                  <div
                    key={t.code}
                    className={`upcoming-card ${
                      trainingsVisible ? "show" : ""
                    }`}
                    style={{
                      transitionDelay: trainingsVisible
                        ? `${index * 120}ms`
                        : "0ms",
                    }}
                  >
                    <div className="upcoming-title">{t.title}</div>
                    <div className="upcoming-meta">
                      <strong>Code:</strong> {t.code}
                    </div>
                    <div className="upcoming-meta">
                      <strong>Dates:</strong> {t.dates} · {t.mode}
                    </div>
                    <span className="upcoming-chip">
                      <span>📌</span> Short Term Training (STC)
                    </span>
                  </div>
                ))}
              </div>

              <button className="btn-schedule">
                Download Training Schedule 2025–2026
              </button>
            </div>

            {/* RIGHT – PARTICIPANT WELCOME CARD */}
            <div className="participant-block fade">
              <div className="participant-block-title">Participant Space</div>
              <div className="participant-block-name">
                {userProfile ? `Welcome, ${userProfile.name}` : "Welcome, Guest"}
              </div>
              <p className="participant-block-text">
                {userProfile
                  ? `You can now apply for scheduled Short Term Training courses, view your
                submitted applications and receive official communication from CSIR–CFTRI.`
                  : "Create a participant account to submit applications for CFTRI Short Term Training courses and receive all communication by email."}
              </p>

              {!userProfile && (
                <button
                  className="participant-block-btn"
                  onClick={openRegister}
                >
                  Register as New Participant
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ==================== ABOUT STC ==================== */}
        <section className="section-shell fade" id="about-section">
          <h2 className="section-heading">
            About Short Term Training at CSIR–CFTRI
          </h2>
          <p className="section-subtitle">
            CSIR–CFTRI conducts structured Short Term Training programmes
            focusing on food processing, preservation, quality and safety. These
            courses are suitable for students, faculty, industry professionals
            and start-up entrepreneurs.
          </p>

          <div className="feature-grid">
            <div className="card-stc">
              <div className="text-green-900 font-semibold">
                Hands-on Lab Exposure
              </div>
              <p className="text-sm text-gray-700 mt-2">
                Training in CFTRI pilot plants, analytical laboratories and
                processing units with practical demonstrations and experiments.
              </p>
            </div>

            <div className="card-stc">
              <div className="text-green-900 font-semibold">
                Govt Recognised Certification
              </div>
              <p className="text-sm text-gray-700 mt-2">
                Participants receive certificates issued by CSIR–CFTRI, which
                enhance academic and professional credentials.
              </p>
            </div>

            <div className="card-stc">
              <div className="text-green-900 font-semibold">
                Multi-level Participation
              </div>
              <p className="text-sm text-gray-700 mt-2">
                Programmes are open to undergraduate & postgraduate students,
                faculty from universities and colleges, and industry delegates.
              </p>
            </div>
          </div>
        </section>

        {/* ==================== CAMPUS IMAGE ==================== */}
        <section className="section-shell fade">
          <img
            src="/images/Mansion_pic.jpg"
            alt="CSIR–CFTRI Campus"
            style={{
              width: "100%",
              borderRadius: 24,
              boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
              display: "block",
            }}
          />
        </section>

        {/* ==================== COURSES GRID ==================== */}
        <section className="section-shell fade" id="courses-section">
          <h2 className="section-heading">Short Term Training Courses</h2>
          <p className="section-subtitle">
            Illustrative list of Short Term Training courses typically offered
            by CSIR–CFTRI. Refer to the official schedule for final dates, fees
            and modules.
          </p>

          <div className="course-grid">
            {courses.map((c) => (
              <div key={c.title} className="card-stc">
                <div className="course-title">{c.title}</div>
                <div className="course-meta">
                  <strong>Duration:</strong> {c.duration}
                </div>
                <div className="course-meta">
                  <strong>Indicative Fee:</strong> {c.fee}
                </div>
                <button
                  className="btn-apply"
                  onClick={() => openApplyModal(c)}
                >
                  Apply for this Training
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ==================== AUTH MODAL ==================== */}
      {authOpen && (
        <div className="auth-bg">
          <div className="auth-box">
            {/* LEFT PANEL */}
            <div className="auth-left">
              <div>
                <div className="auth-tag">CSIR–CFTRI • STC Portal</div>
                <div className="auth-heading">
                  {authMode === "login"
                    ? "Participant Login"
                    : "New Participant Registration"}
                </div>
                <p className="auth-left-sub">
                  Access and manage your Short Term Training applications,
                  download call letters and certificates (where applicable).
                </p>
              </div>
              <div className="auth-mini">
                Secure login • Govt recognised programmes • Online / On-campus
                delivery
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="auth-right">
              <button
                className="auth-close"
                onClick={() => setAuthOpen(false)}
              >
                ×
              </button>

              {/* LOGIN FORM */}
              {authMode === "login" && (
                <>
                  <h3 className="text-lg font-semibold mb-3">Login</h3>

                  <div className="mb-3">
                    <div className="label-sm">Registered Email</div>
                    <input
                      className="input-field"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="mb-3">
                    <div className="label-sm">Password</div>
                    <input
                      className="input-field"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>

                  <button className="btn-apply mt-2" onClick={handleLogin}>
                    Login
                  </button>

                  <div className="auth-switch">
                    New participant?{" "}
                    <span
                      className="auth-link"
                      onClick={() => setAuthMode("register")}
                    >
                      Register here
                    </span>
                  </div>
                </>
              )}

              {/* REGISTER FORM */}
              {authMode === "register" && (
                <>
                  <h3 className="text-lg font-semibold mb-3">
                    Register as Participant
                  </h3>

                  <div className="grid-two mb-2">
                    <div>
                      <div className="label-sm">Full Name</div>
                      <input
                        className="input-field"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <div className="label-sm">Email</div>
                      <input
                        className="input-field"
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid-two mb-2">
                    <div>
                      <div className="label-sm">Address</div>
                      <input
                        className="input-field"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="City / Institution / Address"
                      />
                    </div>

                    <div>
                      <div className="label-sm">Phone</div>
                      <input
                        className="input-field"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile"
                      />
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="label-sm">Nationality</div>
                    <input
                      className="input-field"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      placeholder="Indian / Other"
                    />
                  </div>

                  <div className="grid-two mb-2">
                    <div>
                      <div className="label-sm">Password</div>
                      <input
                        className="input-field"
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Create password"
                      />
                    </div>

                    <div>
                      <div className="label-sm">Confirm Password</div>
                      <input
                        className="input-field"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                      />
                    </div>
                  </div>

                  <button className="btn-apply mt-2" onClick={handleRegister}>
                    Register
                  </button>

                  <div className="auth-switch">
                    Already registered?{" "}
                    <span
                      className="auth-link"
                      onClick={() => setAuthMode("login")}
                    >
                      Login here
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== APPLY MODAL ==================== */}
      {applyOpen && (
        <div className="apply-bg">
          <div className="apply-box">
            <h3 className="text-base font-semibold text-green-900">
              Apply for {selectedCourse?.title}
            </h3>

            <p className="text-sm text-gray-700 mt-2">
              This records your interest for the selected Short Term Training
              course. Final confirmation and payment details will be shared
              through official communication from CSIR–CFTRI.
            </p>

            <button className="btn-apply mt-2" onClick={confirmApply}>
              Confirm Application
            </button>

            <button
              onClick={() => setApplyOpen(false)}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "9px",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
                background: "#f8fafb",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ==================== FOOTER ==================== */}
      <footer className="footer-main">
        © {new Date().getFullYear()} CSIR–CFTRI · Short Term Training Courses
        Portal
        <br />
        Developed & Maintained by ITS&CS, CSIR–CFTRI
      </footer>

      {/* ==================== SCROLL TO TOP ==================== */}
      {showTopBtn && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </>
  );
}
