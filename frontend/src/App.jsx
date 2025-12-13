  import React, { useEffect, useState } from "react";

/* ============================================================
   GLOBAL CSS – injected once into <head>
   (Existing CSS preserved; added profile card & edit modal styles)
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




/* ================= CAMPUS SLIDESHOW ================= */
.slideshow-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.9s ease;
}


.slide.active {
  opacity: 1;
  z-index: 1;
}   
.slide img {
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
  display: block;
}
.slideshow-container {
  position: relative;
  width: 100%;
  height: 360px;   /* 🔥 fixes jump & gap */
  overflow: hidden;
}
@media (max-width: 640px) {
  .slideshow-container {
    height: 220px;
  }
}

/* Fade animation */
@keyframes slideFade {
  from { opacity: 0.4; }
  to { opacity: 1; }
}

/* Prev & Next buttons */
.slide-prev,
.slide-next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  padding: 10px 12px;
  margin-top: -22px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  background: rgba(0,0,0,0.35);
  border-radius: 999px;
  user-select: none;
  transition: background 0.3s;
   backdrop-filter: blur(6px);
}

.slide-next {
  right: 12px;
}

.slide-prev {
  left: 12px;
}

.slide-prev:hover,
.slide-next:hover {
  background: rgba(0,0,0,0.75);
}

/* Caption */
.slide-caption {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 14px;
  color: #fff;
  background: linear-gradient(
    transparent,
    rgba(0,0,0,0.55)
  );
  padding: 8px 12px;
}

/* Dots */
.slide-dots {
  position: absolute;
  bottom: 14px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 3;
}
.slideshow-container::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.05) 0%,
    rgba(0,0,0,0.25) 55%,
    rgba(0,0,0,0.55) 100%
  );
  pointer-events: none;
}

.slide-dot {
  cursor: pointer;
 height: 8px;
  width: 8px;
   margin: 0 5px;
  background-color: rgba(255,255,255,0.6);
  box-shadow: 0 0 0 2px rgba(0,0,0,0.25);
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.4s ease;
}

.slide-dot.active,
.slide-dot:hover {
  background-color: #0a5132;
}
.slide-dot.active {
  background-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34,197,94,0.45);
}
/* Mobile */
@media (max-width: 640px) {
  .slide img {
    height: 220px;
  }
}





img {
  max-width: 100%;
  height: auto;
}

* {
  -webkit-tap-highlight-color: transparent;
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


/* ================= SPLASH SCREEN ================= */
.splash-screen {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #064e3b, #0c8f54);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  animation: splashFadeOut 0.8s ease forwards;
  animation-delay: 2.6s;
}

.splash-inner {
  text-align: center;
  color: #ecfdf5;
  animation: splashReveal 1.4s cubic-bezier(.2,.9,.3,1);
}
/* LOGO IMAGE */
.splash-logo {
 width:500px;
  object-fit: contain;
  
}
.splash-title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.06em;
}

.splash-sub {
  font-size: 12px;
  opacity: 0.85;
  margin-top: 6px;
}

@keyframes splashZoom {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes logoPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.06); }
  100% { transform: scale(1); }
}

@keyframes splashFadeOut {
  to {
    opacity: 0;
    transform: scale(1.05);
    visibility: hidden;
  }
}
@keyframes splashReveal {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
}
@keyframes logoFloat {
  0%   { transform: translateY(0) scale(1); }
  50%  { transform: translateY(-10px) scale(1.03); }
  100% { transform: translateY(0) scale(1); }
}


/* --------- SOFT ZOOM SPLASH FOR MODALS --------- */
@keyframes softZoomFade {
  0% {
    opacity: 0;
    transform: scale(0.92) translateY(8px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes overlayFade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* ============ TOASTS ============ */
.toast-container {
  position: fixed;
  top: 16px;
  right: 18px;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  min-width: 260px;
  max-width: 320px;
  background: #ffffff;
  border-radius: 12px;
  padding: 9px 12px;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.3;
  animation: toastSlideIn 0.35s ease-out;
  border-left: 4px solid #10b981;
  color: #022c22;
}

.toast-icon {
  font-size: 16px;
  margin-top: 1px;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 2px;
}

.toast-message {
  font-size: 12px;
}

.toast-success {
  border-left-color: #10b981;
}

.toast-error {
  border-left-color: #ef4444;
}

.toast-error .toast-title {
  color: #b91c1c;
}

.toast-success .toast-title {
  color: #065f46;
}

@keyframes toastSlideIn {
  from {
    opacity: 0;
    transform: translateX(40px) translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

/* TYPO UTILS */
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
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #ffffff;
  padding: 6px;
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
  
  font-size: 20px;
  color: #00da5bff;
  text-shadow: 0 0 8px #00da5bff;
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
  padding: 22px 18px 14px;
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
 margin-top: -4px;
  border-radius: 26px;
  background: radial-gradient(circle at top left,#f7f9ef 0,#edf3dd 40%,#f6fbeb 100%);
  box-shadow: 0 20px 50px rgba(9, 51, 29, 0.26);
  padding: 22px 20px 22px;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1.1fr);
  gap: 20px;
  align-items: start;   /* ⭐ ensures both columns top-align */

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
  padding: 0;
  height: 240px; /* 4 cards visible */
  overflow: hidden;
  position: relative;
  box-shadow: 0 16px 34px rgba(0,0,0,0.08);
}

.ticker-wrapper {
  display: flex;
  flex-direction: column;
  animation: tickerScroll 12s linear infinite;
}

.ticker-wrapper:hover {
  animation-play-state: paused; /* Pause on hover */
}

@keyframes tickerScroll {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
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
/* ===== ABOUT CONFERENCE SECTION ===== */
.about-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 36px;
  align-items: center;
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.about-image-wrap {
  display: flex;
  justify-content: center;
}

.about-image {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 22px 50px rgba(5,40,25,0.28);
  background: #fff;
  padding: 6px;
}

.about-heading {
  font-size: 28px;
  font-weight: 800;
  color: #052016;
  margin-bottom: 10px;
}

.about-heading span {
  color: #f97316; /* orange accent like reference */
  font-style: italic;
  font-weight: 700;
}

.about-divider {
  width: 46px;
  height: 3px;
  background: #f97316;
  border-radius: 999px;
  margin: 10px 0 16px;
}

.about-text {
  font-size: 14px;
  line-height: 1.75;
  color: #4b5563;
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
/* ===== ENHANCED ABOUT SECTION ===== */
.about-wrap {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 36px;
  align-items: stretch;
}

@media (max-width: 900px) {
  .about-wrap {
    grid-template-columns: 1fr;
  }
}

/* LEFT IMAGE PANEL */
.about-visual {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 22px 55px rgba(5, 40, 25, 0.28);
}
.about-visual {
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.about-visual::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 22px;
  background: radial-gradient(circle at center, rgba(34,197,94,0.35), transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.about-visual:hover {
  transform: scale(1.04);
  box-shadow: 0 30px 70px rgba(6, 78, 59, 0.45);
}

.about-visual:hover::after {
  opacity: 1;
}

.about-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* overlay badge */
.about-badge {
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: rgba(6,78,59,0.92);
  color: #ecfdf5;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

/* RIGHT CONTENT */
.about-content {
  background: #ffffff;
  border-radius: 22px;
  padding: 22px 22px 24px;
  box-shadow: 0 18px 45px rgba(15, 50, 30, 0.10);
}

/* STATS */
.about-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 12px;
  margin: 14px 0 18px;
}

@media (max-width: 640px) {
  .about-stats {
    grid-template-columns: 1fr;
  }
}

.about-stat {
  background: linear-gradient(135deg,#f0fdf4,#e7f9ef);
  border-radius: 14px;
  padding: 12px;
  text-align: center;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.about-stat:hover {
  transform: translateY(-6px) scale(1.05);
  box-shadow: 0 18px 40px rgba(6, 78, 59, 0.28);
}


.about-stat strong {
  font-size: 18px;
  color: #064e3b;
  display: block;
}

.about-stat span {
  font-size: 11px;
  color: #4b5563;
}

/* OBJECTIVES CARDS */
.objectives-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 12px;
  margin-top: 12px;
}

@media (max-width: 640px) {
  .objectives-grid {
    grid-template-columns: 1fr;
  }
}

.objective-card {
  background: #f7fbf2;
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  position: relative;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.objective-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 14px;
  box-shadow: 0 0 0 0 rgba(34,197,94,0.0);
  transition: box-shadow 0.35s ease;
}

.objective-card:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 16px 36px rgba(6,50,36,0.18);
}

.objective-card:hover::after {
  box-shadow: 0 0 0 2px rgba(34,197,94,0.45);
}

.objectives-grid .objective-card:nth-child(1) { transition-delay: 0s; }
.objectives-grid .objective-card:nth-child(2) { transition-delay: 0.05s; }
.objectives-grid .objective-card:nth-child(3) { transition-delay: 0.1s; }
.objectives-grid .objective-card:nth-child(4) { transition-delay: 0.15s; }

.objective-icon {
  font-size: 18px;
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

/* CAMPUS IMAGE SECTION */
.campus-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px 18px 12px; /* 🔥 reduced bottom space */
}

.campus-frame {
  border-radius: 26px;
  overflow: hidden;
  box-shadow: 0 22px 55px rgba(5, 40, 25, 0.32);
  background: linear-gradient(180deg, #e9f5ee 0, #d7efe4 40%, #f5fff9 100%);
}
.campus-img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  display: block;
  filter: contrast(1.03) saturate(1.03) brightness(1.02);
}

/* COURSES GRID */
.course-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
@media (max-width: 1024px) {
  .course-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .course-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* COURSE CARD WRAPPER */
.course-card-shell {
  position: relative;
  will-change: transform;
}

/* COURSE CARD */
.course-card {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 14px 35px rgba(15, 50, 30, 0.12);
  cursor: pointer;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  transform-origin: center;
}

.course-card:hover {
  transform: translateY(-6px) scale(1.04);
  box-shadow: 0 22px 55px rgba(5, 40, 25, 0.32);
}

.course-media {
  position: relative;
  overflow: hidden;
}

.course-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.course-card:hover .course-img {
  transform: scale(1.05);
}

.course-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -90px;
  background: linear-gradient(180deg, rgba(6,78,59,0.02) 0%, rgba(6,78,59,0.96) 30%, rgba(6,78,59,0.98) 100%);
  color: #ecfdf5;
  padding: 10px 12px 9px;
  font-size: 12px;
  line-height: 1.4;
  transition: bottom 0.35s ease;
}

.course-card:hover .course-overlay {
  bottom: 0;
}

.course-overlay-title {
  font-weight: 600;
  margin-bottom: 3px;
}
.course-overlay-text {
  font-size: 11px;
}

/* COURSE TEXT CONTENT */
.course-content {
  padding: 12px 14px 14px;
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

/* APPLY BUTTON */
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
  background: radial-gradient(circle at top, rgba(0,0,0,0.65), rgba(0,0,0,0.45));
  backdrop-filter: blur(8px);
  z-index: 100;
  animation: overlayFade 0.25s ease-out;
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
  transform-origin: center;
  animation: softZoomFade 0.32s ease-out;
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
  animation: overlayFade 0.25s ease-out;
}
.apply-box {
  width: 90%;
  max-width: 380px;
  background: #ffffff;
  border-radius: 20px;
  padding: 18px 18px 20px;
  box-shadow: 0 26px 55px rgba(0, 0, 0, 0.55);
  animation: softZoomFade 0.3s ease-out;
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


/* ================== PROFILE CARD (NEW) ================== */
.profile-shell {
  display: flex;
  align-items: flex-start;   /* already good */
  justify-content: flex-start;  
  padding-top: 0;             /* ⭐ remove unwanted push down */
  margin-top: -10px;          /* ⭐ pull entire right column up */
}

/* make the right column content sticky to viewport while leaving responsive behavior */
.profile-sticky {
  position: sticky;
  top: 40px;
  width: 100%;
  max-width: 320px;
  align-self: start;
}

/* profile card */
.profile-card {
  background: linear-gradient(180deg, #ffffff 0%, #f7fff8 100%);
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 20px 48px rgba(6, 44, 32, 0.12);
  border: 1px solid rgba(6,78,59,0.06);
  text-align: center;
  transform-origin: center;
  animation: cardSlideIn 0.5s cubic-bezier(.2,.9,.3,1);
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}

/* slight hover lift */
.profile-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 28px 70px rgba(6, 50, 36, 0.18);
}

/* avatar */
.profile-avatar {
  width: 92px;
  height: 92px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(6,78,59,0.06), rgba(6,78,59,0.02));
  border: 4px solid rgba(6,78,59,0.06);
  overflow: hidden;
  margin: 2px 0 10px;
  position: relative;
  box-shadow: 0 12px 30px rgba(6,70,46,0.06);
  animation: avatarFloat 3.6s ease-in-out infinite;
}

/* avatar image */
.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform-origin: center;
  transition: transform 0.6s ease, filter 0.4s ease;
}

/* subtle hover zoom */
.profile-card:hover .profile-avatar img {
  transform: scale(1.06);
  filter: saturate(1.06);
}

/* default placeholder silhouette */
.avatar-placeholder {
  font-size: 34px;
  color: #0b5d36;
  opacity: 0.88;
}

/* name and info */
.profile-name {
  font-size: 16px;
  font-weight: 700;
  color: #07301a;
  margin-bottom: 6px;
}
.profile-email {
  font-size: 13px;
  color: #4b5563;
  margin-bottom: 10px;
}
.profile-meta {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 12px;
}

/* badges and small action row */
.profile-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 10px;
}
.profile-btn {
  padding: 8px 12px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}
.profile-edit {
  background: linear-gradient(110deg, var(--g1), var(--g2));
  color: white;
  box-shadow: 0 8px 18px rgba(4, 57, 32, 0.16);
}
.profile-upload {
  background: #f8fafb;
  color: #064e3b;
  border: 1px solid #e6f6ea;
}

/* small green status dot */
.profile-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  justify-content: center;
}
.profile-status-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #34d399;
  box-shadow: 0 6px 18px rgba(52, 211, 153, 0.12);
}

/* hidden file input (we provide custom button) */
.upload-input {
  display: none;
}

/* profile card entrance animation */
@keyframes cardSlideIn {
  0% { opacity: 0; transform: translateY(18px) scale(.995); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

/* gentle float animation for avatar */
@keyframes avatarFloat {
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
}

/* profile edit modal */
.profile-edit-bg {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top, rgba(0,0,0,0.55), rgba(0,0,0,0.35));
  z-index: 260;
  animation: overlayFade 0.22s ease-out;
}
.profile-edit-box {
  width: 96%;
  max-width: 520px;
  border-radius: 14px;
  background: #ffffff;
  padding: 18px;
  box-shadow: 0 26px 64px rgba(9, 45, 33, 0.32);
  animation: softZoomFade 0.28s ease-out;
}

/* small helper */
.small-muted { font-size: 12px; color: #6b7280; }

/* responsive tweaks */
@media (max-width: 960px) {
  .profile-sticky { position: static; max-width: 100%; margin-top: 8px; }
  .upcoming-strip { gap: 12px; }
}

/* tiny animated underline on name */
.profile-name::after {
  content: "";
  display: block;
  width: 40%;
  height: 3px;
  margin: 8px auto 0;
  border-radius: 999px;
  background: linear-gradient(90deg, #b3ffd0, #0b5d36);
  opacity: 0.14;
  transform-origin: left;
  animation: pulseUnderline 1.8s ease-in-out infinite;
}
@keyframes pulseUnderline {
  0% { opacity: 0.06; transform: scaleX(.8); }
  50% { opacity: 0.26; transform: scaleX(1); }
  100% { opacity: 0.06; transform: scaleX(.8); }
}

/* small success hint for image upload */
.upload-success {
  margin-top: 8px;
  font-size: 12px;
  color: #065f46;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

  
  
/* ================= MY APPLICATIONS ================= */
.applications-list {
  display: grid;
  gap: 16px;
  margin-top: 12px;
}

.application-card {
  background: #ffffff;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #e5f4ea;
  box-shadow: 0 12px 28px rgba(6, 50, 36, 0.10);
  transition: 0.25s ease;
}

.application-card:hover {
  box-shadow: 0 20px 45px rgba(6, 50, 36, 0.18);
  transform: translateY(-3px);
}

.app-title {
  font-size: 16px;
  font-weight: 700;
  color: #064e3b;
  margin-bottom: 6px;
}

.app-line {
  font-size: 13px;
  color: #4b5563;
  margin: 3px 0;
}

.btn-pay {
  margin-top: 12px;
  padding: 8px 14px;
  border-radius: 12px;
  background: #0b5d36;
  color: white;
  border: none;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.btn-pay:hover {
  background: #094528;
}

.paid-badge {
  margin-top: 10px;
  padding: 6px 12px;
  border-radius: 12px;
  background: #e2f7d6;
  color: #166534;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
}








/* ================= ENHANCED MICRO-ANIMATIONS ================= */

/* smooth page feel */
html {
  scroll-behavior: smooth;
}

/* NAVBAR DROP */
.navbar-stc {
  animation: navDrop 0.6s ease-out;
}
@keyframes navDrop {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}

/* BUTTON LIFT + RIPPLE */
button {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  position: relative;
  overflow: hidden;
}
button:hover {
  transform: translateY(-2px);
}
button::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(255,255,255,0.4);
  border-radius: 999px;
  transform: scale(0);
}
button:active::after {
  animation: ripple 0.6s ease-out;
}
@keyframes ripple {
  from { transform: scale(0); opacity: 0.5; }
  to { transform: scale(18); opacity: 0; }
}

/* HERO REVEAL */
.hero-shell {
  animation: heroReveal 0.9s cubic-bezier(.2,.9,.3,1);
}
@keyframes heroReveal {
  from { opacity: 0; transform: translateY(24px) scale(0.98); }
  to { opacity: 1; transform: none; }
}

/* CARD DEPTH CONSISTENCY */
.card-stc,
.course-card,
.profile-card,
.application-card,
.participant-panel {
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}
.card-stc:hover,
.application-card:hover,
.participant-panel:hover {
  transform: translateY(-4px);
}

/* COURSE IMAGE PARALLAX */
.course-img {
  transition: transform 0.6s cubic-bezier(.2,.9,.3,1);
}
.course-card:hover .course-img {
  transform: scale(1.08);
}

/* PROFILE AVATAR FLOAT */
.profile-avatar {
  animation: avatarFloat 3.6s ease-in-out infinite;
}
@keyframes avatarFloat {
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
}




@media (max-width: 640px) {
 .splash-logo-wrap {
  width: min(60vw, 180px);
  height: min(60vw, 180px);
}
  .splash-title {
    font-size: 16px;
  }

  .splash-sub {
    font-size: 11px;
  }
}




/* ================= FLOATING CONTACT SIDE PANEL ================= */

.contact-panel {
  position: fixed;
  top: 50%;
  right: -260px;
  transform: translateY(-50%);
  width: 260px;
  background: linear-gradient(180deg, #0a5132, #064e3b);
  color: #eafff4;
  border-radius: 16px 0 0 16px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.35);
  transition: right 0.45s cubic-bezier(.2,.9,.3,1);
  z-index: 200;
}

.contact-panel.open {
  right: 0;
}

/* Toggle button */
.contact-toggle {
  position: absolute;
  left: -44px;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 70px;
  border-radius: 12px 0 0 12px;
  background: #0c8f54;
  color: white;
  font-size: 20px;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 26px rgba(0,0,0,0.3);
}

/* Panel content */
.contact-panel-inner {
  padding: 16px 18px;
}

.contact-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 6px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding-bottom: 6px;
}

.contact-item {
  font-size: 13px;
  margin: 6px 0;
  display: flex;
  gap: 8px;
  align-items: center;
}

.contact-item a {
  color: #d1fae5;
  text-decoration: none;
  font-weight: 600;
}

.contact-item a:hover {
  text-decoration: underline;
}

/* Get in touch buttons */
.contact-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.contact-btn {
  flex: 1;
  padding: 7px 10px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  background: #ffffff;
  color: #064e3b;
}

.contact-btn.whatsapp {
  background: #25D366;
  color: #07301a;
}

/* Mobile */
@media (max-width: 640px) {
  .contact-panel {
    width: 230px;
  }
}






`;

/* ============================================================
   MAIN APP COMPONENT
============================================================ */
export default function App() {  /* TABLE CELL STYLES (for schedule table) */
  const th = {
    padding: "10px",
    fontSize: "13px",
    color: "#064e3b",
    whiteSpace: "nowrap",
  };

  const td = {
    padding: "10px",
    fontSize: "13px",
    color: "#374151",
    verticalAlign: "top",
  };

  // inject CSS once
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = globalCSS;
    document.head.appendChild(style);
  }, []);

  /* TOASTS */
  const [toasts, setToasts] = useState([]);

  const showToast = (msg, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  /* GLOBAL / UI STATES */
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [navOpen, setNavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  /* CAMPUS SLIDESHOW */
const campusSlides = [
  {
    img: "/images/Mansion_pic.jpg",
    caption: "CSIR–CFTRI Main Campus, Mysuru",
  },
  {
    img: "/images/banner1.jpg",
    caption: "CFTRI Research & Training Facilities",
  },
  // {
  //   img: "/images/logo1.jpg",
  //   caption: "OUR NEW LOGO",
  // },
];

const [slideIndex, setSlideIndex] = useState(0);

/* Auto play (optional) */
useEffect(() => {
  const interval = setInterval(() => {
    setSlideIndex((prev) =>
      prev === campusSlides.length - 1 ? 0 : prev + 1
    );
  }, 4000); // 4 seconds

  return () => clearInterval(interval);
}, []);


/* SPLASH SCREEN */
const [showSplash, setShowSplash] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowSplash(false);
  }, 3000); // 3 seconds splash

  return () => clearTimeout(timer);
}, []);


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

  /* Profile edit modal & temporary state */
  const [profileEditOpen, setProfileEditOpen] = useState(false);
  const [tempProfile, setTempProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    avatar: "", // base64 data
  });
  const [avatarFileName, setAvatarFileName] = useState("");
  const [avatarUploadSuccess, setAvatarUploadSuccess] = useState(false);

  /* UPCOMING TRAININGS ANIM FLAG */
  const [trainingsVisible, setTrainingsVisible] = useState(false);

  /* APPLY MODAL */
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  /* APPLY FORM STATE */
  const [applyForm, setApplyForm] = useState({
    fullName: "",
    email: "",
    degree: "",
    country: "",
    state: "",
    organisation: "",
    category: "",
    phone: "",
    notes: "",
  });
/* USER APPLICATIONS */
const [applications, setApplications] = useState(
  JSON.parse(localStorage.getItem("cftri_applications") || "[]")
);

  const updateApplyForm = (field, value) => {
    setApplyForm((prev) => ({ ...prev, [field]: value }));
  };

  /* Load profile, set scroll / animation */
  useEffect(() => {
    const stored = localStorage.getItem("cftri_user_profile");
    if (stored) {
      const p = JSON.parse(stored);
      setUserProfile(p);
      setApplyForm((prev) => ({
        ...prev,
        fullName: p.name || "",
        email: p.email || "",
        phone: p.phone || "",
      }));
    }

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

  /* SAVE PROFILE */
  const saveProfile = (profile) => {
    setUserProfile(profile);
    localStorage.setItem("cftri_user_profile", JSON.stringify(profile));
    showToast("Profile updated successfully.", "success");
  };

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cftri_user_profile");
    setUserProfile(null);
    showToast("Logged out successfully.", "success");
  };

  /* ---------------- LOGIN API ---------------- */
  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      showToast("Please enter email and password.", "error");
      return;
    }

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

      if (!res.ok) {
        showToast(data.msg || "Invalid credentials.", "error");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);

        const profile = {
          _id: data.user?._id,
          name: data.user?.name || loginEmail.split("@")[0],
          email: data.user?.email || loginEmail,
          phone: data.user?.phone || "",
          lastLogin: new Date().toLocaleString(),
          avatar: data.user?.avatar || "", // backend may supply avatar
          address: data.user?.address || "",
          nationality: data.user?.nationality || "",
        };

        saveProfile(profile);
        setAuthOpen(false);
        showToast("Login successful.", "success");
      } else {
        showToast(data.msg || "Login failed.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Login failed. Please check backend.", "error");
    }
  };

  /* -------------- REGISTER API --------------- */
  const handleRegister = async () => {
    if (!fullName || !regEmail || !regPassword) {
      showToast("Please fill Full Name, Email and Password.", "error");
      return;
    }
    if (regPassword !== confirmPassword) {
      showToast("Passwords do not match.", "error");
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

      if (!res.ok) {
        showToast(data.msg || "Registration failed.", "error");
        return;
      }

      showToast(
        data.msg || "Registration successful! Please login to continue.",
        "success"
      );

      setAuthMode("login");
      setFullName("");
      setRegEmail("");
      setRegPassword("");
      setConfirmPassword("");
      setAddress("");
      setPhone("");
      setNationality("");
    } catch (err) {
      console.error(err);
      showToast("Registration failed. Check backend.", "error");
    }
  };

  /* NAV HELPERS */
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

  /* APPLY BUTTON CLICK */
  const handleApplyClick = (course) => {
    if (!userProfile) {
      showToast("Please login or register before applying.", "error");
      openLogin();
      return;
    }
    setSelectedCourse(course);
    setApplyOpen(true);
  };

  const getApplyButtonLabel = () =>
    userProfile ? "Apply for this Training" : "Register / Sign in to Apply";

  /* SUBMIT APPLICATION → BACKEND */
 const submitApplication = async () => {
  const required = [
    "fullName",
    "email",
    "degree",
    "country",
    "state",
    "organisation",
    "category",
    "phone",
  ];

  for (let f of required) {
    if (!applyForm[f] || !applyForm[f].trim()) {
      showToast("Please fill all required fields (*)", "error");
      return;
    }
  }

  try {
    const res = await fetch("http://localhost:5000/api/applications/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userProfile?._id,
        courseTitle: selectedCourse ? selectedCourse.title : "Unknown Course",

        ...applyForm,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(data.msg || "Submission failed", "error");
      return;
    }

    showToast("Application submitted successfully!", "success");
    // Save application locally
const newApp = {
  course: selectedCourse?.title,
  date: new Date().toLocaleDateString(),
  status: "Submitted",
  payment: "Pending",
};

const updatedApps = [...applications, newApp];
setApplications(updatedApps);
localStorage.setItem("cftri_applications", JSON.stringify(updatedApps));

    setApplyOpen(false);

  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    showToast("Cannot reach backend. Check URL.", "error");
  }
};

  /* SCROLL TO TOP */
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  /* UPCOMING TRAININGS */
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
/* ================= FULL TRAINING SCHEDULE (STATIC – 2025) ================= */
const fullSchedule = [
  {
    code: "STCH-01",
    title: "Training Programme on Fruits and Vegetable Products",
    dates: "15-04-2025 to 17-04-2025",
    duration: "3 Days",
    centre: "Hyderabad",
  },
  {
    code: "STCL-02",
    title: "Training Programme on Fruits & Vegetables Processing (Batch 1)",
    dates: "22-04-2025 to 24-04-2025",
    duration: "3 Days",
    centre: "Lucknow",
  },
  {
    code: "STC-06",
    title:
      "Fumigation, Prophylaxis and Pest Management Technique for Stored Food Commodities (Batch 1)",
    dates: "16-05-2025 to 30-05-2025",
    duration: "15 Days",
    centre: "CFTRI",
  },
  {
    code: "STCH-11",
    title: "Training Programme on Millet Products",
    dates: "11-06-2025 to 13-06-2025",
    duration: "3 Days",
    centre: "Hyderabad",
  },
  {
    code: "STC-12",
    title:
      "Integrated Solid Waste & Wastewater Management in the Food Industry",
    dates: "16-06-2025 to 20-06-2025",
    duration: "5 Days",
    centre: "CFTRI",
  },
  {
    code: "STC-21",
    title: "Spices Processing and Value Addition",
    dates: "04-08-2025 to 08-08-2025",
    duration: "5 Days",
    centre: "CFTRI",
  },
  {
    code: "STC-24",
    title: "Baking Science and Technology",
    dates: "18-08-2025 to 22-08-2025",
    duration: "5 Days",
    centre: "CFTRI",
  },
  {
    code: "STC-30",
    title: "Training Programme on Grain Processing and Machinery",
    dates: "10-11-2025 to 14-11-2025",
    duration: "5 Days",
    centre: "CFTRI",
  },
];
{/* ================= FULL SCHEDULE TABLE ================= */}
{/* <div className="card-stc" style={{ marginTop: 20 }}>
  <h3 className="text-lg font-semibold text-green-900 mb-2">
    Full Training Schedule – 2025
  </h3>

  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#e7f9ef", textAlign: "left" }}>
          <th style={th}>Code</th>
          <th style={th}>Course Title</th>
          <th style={th}>Dates</th>
          <th style={th}>Duration</th>
          <th style={th}>Centre</th>
        </tr>
      </thead>

      <tbody>
        {fullSchedule.map((row, i) => (
          <tr key={i} style={{ borderBottom: "1px solid #e5f4ea" }}>
            <td style={td}><strong>{row.code}</strong></td>
            <td style={td}>{row.title}</td>
            <td style={td}>{row.dates}</td>
            <td style={td}>{row.duration}</td>
            <td style={td}>{row.centre}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div> */}

  /* COURSES LIST */
  const courses = [
    {
      title: "Fumigation",
      duration: "1 Week",
      fee: "₹9,500",
      image: "/images/courses/fumigation.webp",
      description:
        "Safe fumigation protocols for stored grains and food commodities.",
    },
    {
      title: "Fruits & Vegetables Products",
      duration: "2 Weeks",
      fee: "₹12,500",
      image: "/images/courses/fruits_veg.jpg",
      description:
        "Processing, dehydration and value-added products from fruits & vegetables.",
    },
    {
      title: "Spice Processing",
      duration: "10 Days",
      fee: "₹10,500",
      image: "/images/courses/spice.JPG",
      description:
        "Cleaning, grading, grinding, blending and essential oil extraction from spices.",
    },
    {
      title: "Millet Processing",
      duration: "1 Week",
      fee: "₹9,000",
      image: "/images/courses/millets.png",
      description:
        "Milling, decortication and development of millet-based health foods.",
    },
    {
      title: "Baking Technology",
      duration: "1 Week",
      fee: "₹9,500",
      image: "/images/courses/baking.jpg",
      description:
        "Training on breads, biscuits, cakes and speciality baked items.",
    },
    {
      title: "Food Safety Analysis",
      duration: "2 Weeks",
      fee: "₹15,000",
      image: "/images/courses/food_safety.jpg",
      description:
        "Chemical, microbiological and instrumental analysis for food safety.",
    },
    {
      title: "Business Opportunities in Food Processing",
      duration: "3 Days",
      fee: "₹5,000",
      image: "/images/courses/business.JPG",
      description:
        "Entrepreneurship opportunities, schemes, funding and market trends.",
    },
    {
      title: "Cell Culture Techniques",
      duration: "1 Week",
      fee: "₹14,000",
      image: "/images/courses/cell_culture.jpg",
      description:
        "Basics of cell culture, aseptic handling and food research applications.",
    },
    {
      title: "Packaging Technology",
      duration: "1 Week",
      fee: "₹9,000",
      image: "/images/courses/packaging.jpg",
      description:
        "Packaging materials, shelf-life improvement and standards.",
    },
    {
      title: "Solid Waste & Waste Water Management",
      duration: "5 Days",
      fee: "₹7,000",
      image: "/images/courses/waste.jpg",
      description:
        "Effluent treatment, by-product utilisation and waste management.",
    },
    {
      title: "Dairy Product Development",
      duration: "1 Week",
      fee: "₹9,000",
      image: "/images/courses/dairy_dev.jpg",
      description:
        "Ice cream, cheese, fermented milk and dairy innovations.",
    },
    {
      title: "Meat Processing",
      duration: "1 Week",
      fee: "₹10,500",
      image: "/images/courses/meat.png",
      description:
        "Processing, preservation and quality control of meat products.",
    },
  ];

  /* ------------------ PROFILE EDIT / UPLOAD HELPERS ------------------ */

  // open edit modal and prefill tempProfile
  const openProfileEdit = () => {
    setTempProfile({
      name: userProfile?.name || "",
      email: userProfile?.email || "",
      phone: userProfile?.phone || "",
      address: userProfile?.address || "",
      nationality: userProfile?.nationality || "",
      avatar: userProfile?.avatar || "",
    });
    setAvatarUploadSuccess(false);
    setProfileEditOpen(true);
  };

  // handle avatar file selection, convert to base64 and store in tempProfile
 const handleAvatarChange = (e) => {
  const f = e.target.files?.[0];
  if (!f) return;

  const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (!allowed.includes(f.type)) {
    showToast("Please upload a PNG / JPG / WEBP image.", "error");
    return;
  }

  setAvatarFileName(f.name);

  const reader = new FileReader();
  reader.onload = (ev) => {
    const b64 = ev.target.result;

    // Update temp modal preview
    setTempProfile((prev) => ({ ...prev, avatar: b64 }));

    // Update actual active profile
    const updated = { ...userProfile, avatar: b64 };
    setUserProfile(updated);
    localStorage.setItem("cftri_user_profile", JSON.stringify(updated));

    setAvatarUploadSuccess(true);
    showToast("Photo updated successfully!", "success");
  };

  reader.onerror = () => showToast("Failed to read file.", "error");

  reader.readAsDataURL(f);
};

  // save edits to localStorage and userProfile
  const saveProfileEdits = () => {
  if (!tempProfile.name || !tempProfile.email) {
    showToast("Please provide name and email.", "error");
    return;
  }

  const updated = {
    ...userProfile,
    name: tempProfile.name,
    email: tempProfile.email,
    phone: tempProfile.phone,
    address: tempProfile.address,
    nationality: tempProfile.nationality,
    avatar: tempProfile.avatar,   // 🔥 important
    lastLogin: new Date().toLocaleString(),
  };

  setUserProfile(updated);
  localStorage.setItem("cftri_user_profile", JSON.stringify(updated));

  showToast("Profile saved successfully.", "success");
  setProfileEditOpen(false);
};

  // quick remove avatar
 const removeAvatar = () => {
  setTempProfile((prev) => ({ ...prev, avatar: "" }));

  const updated = { ...userProfile, avatar: "" };
  setUserProfile(updated);
  localStorage.setItem("cftri_user_profile", JSON.stringify(updated));

  setAvatarFileName("");
  setAvatarUploadSuccess(false);

  showToast("Photo removed.", "success");
};
const markPaymentDone = (index) => {
  const updated = [...applications];
  updated[index].payment = "Completed";
  setApplications(updated);
  localStorage.setItem("cftri_applications", JSON.stringify(updated));
  showToast("Payment completed successfully!", "success");
};

  /* ============================================================
      JSX START
  ============================================================= */
  return (
    <>


    {/* ================= SPLASH SCREEN ================= */}
{showSplash && (
  <div className="splash-screen">
    <div className="splash-inner">
      <div className="splash-logo-wrap">
        <img
          src="/images/logo1.jpg"
          alt="CFTRI Logo"
          className="splash-logo"
        />
      </div>

      <div className="splash-title">CSIR – CFTRI</div>
      <div className="splash-sub">
        Short Term Training Courses Portal
      </div>
    </div>
  </div>
)}


      {/* ================= TOASTS ================= */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast ${t.type === "error" ? "toast-error" : "toast-success"}`}
          >
            <div className="toast-icon">{t.type === "error" ? "⚠" : "✔"}</div>
            <div>
              <div className="toast-title">
                {t.type === "error" ? "Error" : "Success"}
              </div>
              <div className="toast-message">{t.msg}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating glows */}
      <div className="floating-bg"></div>
      <div className="floating-bg2"></div>

      {/* ================= NAVBAR ================= */}
      <header className="navbar-stc">
        <div className="navbar-inner">
          <div className="navbar-left">
            <img src="/images/logo1.jpg" className="navbar-logo" alt="logo" />
            <div className="navbar-titles">
              <div className="navbar-title-top">
                CSIR – Central Food Technological Research Institute, Mysuru
              </div>
              <div className="navbar-title-main">
                Short Term Training Courses Portal
              </div>
            </div>
          </div>

          <button className="navbar-burger" onClick={() => setNavOpen(!navOpen)}>
            ☰
          </button>

          <nav className={`navbar-links ${navOpen ? "open" : ""}`}>
            <span
              className="navbar-link"
              onClick={() =>
                document.getElementById("home-section")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Home
            </span>

            <span
              className="navbar-link"
              onClick={() =>
                document.getElementById("about-section")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              About
            </span>

            <span
              className="navbar-link"
              onClick={() =>
                document.getElementById("courses-section")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Courses
            </span>

            <span
              className="navbar-link"
              onClick={() =>
                document.getElementById("schedule-section")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Schedule
            </span>

            <div className="navbar-right">
              {userProfile ? (
                <div className="navbar-hello name"  >
                  Hello, <strong>{userProfile.name}</strong>
                </div>
              ) : null}

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
<section className="campus-shell fade">
  <div className="campus-frame">
    <div className="slideshow-container">

      {campusSlides.map((s, i) => (
        <div
          key={i}
          className={`slide ${i === slideIndex ? "active" : ""}`}
        >
          <img src={s.img} alt={s.caption} />
          <div className="slide-caption">{s.caption}</div>
        </div>
      ))}

      {/* Prev / Next */}
      <span
        className="slide-prev"
        onClick={() =>
          setSlideIndex(
            slideIndex === 0
              ? campusSlides.length - 1
              : slideIndex - 1
          )
        }
      >
        ❮
      </span>

      <span
        className="slide-next"
        onClick={() =>
          setSlideIndex(
            slideIndex === campusSlides.length - 1
              ? 0
              : slideIndex + 1
          )
        }
      >
        ❯
      </span>

      {/* Dots */}
      <div className="slide-dots">
        {campusSlides.map((_, i) => (
          <span
            key={i}
            className={`slide-dot ${i === slideIndex ? "active" : ""}`}
            onClick={() => setSlideIndex(i)}
          />
        ))}
      </div>

    </div>
  </div>
</section>


      {/* ================= HERO SECTION ================= */}
      
      <main id="home-section">
        <section className="hero-shell fade">
          <div className="hero-grid">
            {/* LEFT HERO */}
            <div>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                CSIR–CFTRI • Short Term Training (STC)
              </div>

              <h1 className="hero-title">
                CFTRI Certified Short Term Training Courses in Food Science &amp;
                Technology
              </h1>

              <p className="hero-subtitle">
                Structured training modules in food processing, safety and
                nutrition for students, faculty, industry and entrepreneurs.
              </p>

              <div className="hero-meta">
                <div>
                  <span className="hero-meta-label">Training Session:</span>{" "}
                  February – July 2025
                </div>
                <div className="hero-meta-line">
                  Mode: Online | Offline | Hybrid
                </div>
              </div>

              <div className="hero-actions">
                <button
                  className="hero-btn-primary"
                  onClick={() =>
                    document.getElementById("courses-section")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  View Courses
                </button>

                <button
                  className="hero-btn-outline"
                  onClick={() =>
                    document.getElementById("about-section")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  About CFTRI
                </button>
              </div>
            </div>

            {/* RIGHT HERO PANEL */}
            <div className="participant-panel">
              <div className="participant-title">Participants & Eligibility</div>

              <div className="participant-tag-row">
                <div className="participant-tag">Students</div>
                <div className="participant-tag">Faculty</div>
                <div className="participant-tag">Industry</div>
                <div className="participant-tag">Entrepreneurs</div>
              </div>

              <div className="participant-text">
                Join high-impact professional training modules with certification,
                hands-on sessions and expert faculty.
              </div>

              {userProfile ? (
                <div className="participant-status">
                  <span className="participant-status-dot"></span>
                  Logged in as <b>{userProfile.name}</b>
                </div>
              ) : (
                <div className="participant-login-hint">
                  Please sign in to apply for trainings.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ================= UPCOMING TRAININGS (WITH PROFILE ON RIGHT) ================= */}
        <section className="section-shell fade" id="schedule-section">
        <div className="upcoming-strip">
          <div>
            <div className="upcoming-pill">Upcoming Trainings</div>

<div className="upcoming-list">
  <div className="ticker-wrapper">
    {[...upcomingTrainings, ...upcomingTrainings].map((t, i) => (
      <div key={i} className="upcoming-card show">
        <div className="upcoming-title">{t.title}</div>
        <div className="upcoming-meta">Starts: {t.dates}</div>
        <div className="upcoming-chip">Mode: {t.mode}</div>
      </div>
    ))}
  </div>
</div><div className="card-stc" style={{ marginTop: 20 }}>
  <h3 className="text-lg font-semibold text-green-900 mb-2">
    Full Training Schedule – 2025
  </h3>

  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#e7f9ef", textAlign: "left" }}>
          <th style={th}>Code</th>
          <th style={th}>Course Title</th>
          <th style={th}>Dates</th>
          <th style={th}>Duration</th>
          <th style={th}>Centre</th>
        </tr>
      </thead>

      <tbody>
        {fullSchedule.map((row, i) => (
          <tr key={i} style={{ borderBottom: "1px solid #e5f4ea" }}>
            <td style={td}><strong>{row.code}</strong></td>
            <td style={td}>{row.title}</td>
            <td style={td}>{row.dates}</td>
            <td style={td}>{row.duration}</td>
            <td style={td}>{row.centre}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
{/* ================= MY APPLICATIONS SECTION ================= */}


          </div>

          {/* RIGHT: Schedule button + Profile Card (Option A) */}
          <div className="profile-shell">
            <div className="profile-sticky">
              {/* Schedule CTA (keeps original) */}
              <div style={{
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 10,
  marginTop: -6   // ⭐ pulls button upward
}}>

                <button
                  className="btn-schedule"
                  onClick={() =>
                    document.getElementById("courses-section")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  View Full Schedule →
                </button>
              </div>

              {/* Profile card inserted here */}
              <div className="profile-card">
                {userProfile ? (
                  <>
                    <div className="profile-avatar" title="Profile photo">
                      {userProfile.avatar ? (
                        <img src={userProfile.avatar} alt="avatar" />
                      ) : (
                        <div className="avatar-placeholder">👤</div>
                      )}
                    </div>

                    <div className="profile-name">{userProfile.name}</div>
                    <div className="profile-email">{userProfile.email}</div>

                    <div className="profile-meta">
                      {userProfile.phone ? <div>📞 {userProfile.phone}</div> : null}
                      <div style={{ marginTop: 6 }}>
                        <span className="small-muted">Last login:</span>{" "}
                        <span className="small-muted" style={{ fontWeight: 700 }}>
                          {userProfile.lastLogin || "—"}
                        </span>
                      </div>
                    </div>

                    <div className="profile-status">
                      <div className="profile-status-dot" />
                      <div className="small-muted">Active Participant</div>
                    </div>

                    <div className="profile-actions">
                      <button className="profile-btn profile-edit" onClick={openProfileEdit}>
                        Edit Profile
                      </button>

                      <label style={{ margin: 0 }}>
                        <input
                          className="upload-input"
                          id="inline-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                        <button
                          type="button"
                          className="profile-btn profile-upload"
                          onClick={() => document.getElementById("inline-upload")?.click()}
                        >
                          Upload Photo
                        </button>
                      </label>
                    </div>

                    {avatarFileName && (
                      <div className="upload-success">
                        ✔ {avatarFileName} ready. Save from Edit.
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div style={{ padding: "18px 8px" }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#064e3b" }}>
                        Welcome!
                      </div>
                      <p className="small-muted" style={{ marginTop: 8 }}>
                        Sign in or create an account to apply for trainings and manage your applications.
                      </p>

                      <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "center" }}>
                        <button className="profile-btn profile-edit" onClick={openLogin}>
                          Sign In
                        </button>
                        <button className="profile-btn profile-upload" onClick={openRegister}>
                          Register
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
      </section>
<section id="about-section" className="section-shell fade">
 
  <h2 className="section-heading">About CSIR–CFTRI</h2>

  <div className="about-wrap">

    {/* LEFT IMAGE */}
    <div className="about-visual">
      <img
        src="/images/cftri-about-us1.jpg"
        alt="CSIR–CFTRI Campus"
      />
      <div className="about-badge">Established • 1950</div>
    </div>

    {/* RIGHT CONTENT */}
    <div className="about-content">

      <p className="text-sm text-gray-700" style={{ lineHeight: "1.8" }}>
        CSIR–Central Food Technological Research Institute (CFTRI), Mysore, a
        constituent laboratory of the Council of Scientific and Industrial
        Research (CSIR), under the Department of Science & Technology,
        Government of India, is a globally acclaimed R&amp;D organization in
        the area of food science and technology with innovative and sustainable
        solutions for national development. The institute came into existence
        in the year 1950.
      </p>

      {/* STATS */}
      <div className="about-stats">
        <div className="about-stat">
          <strong>1950</strong>
          <span>Year Established</span>
        </div>
        <div className="about-stat">
          <strong>Govt. of India</strong>
          <span>CSIR Laboratory</span>
        </div>
        <div className="about-stat">
          <strong>Global</strong>
          <span>R&amp;D Recognition</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-green-900 mb-2">
        Mission of CSIR Integrated Skill Initiative
      </h3>

      <p className="text-sm text-gray-700" style={{ lineHeight: "1.8" }}>
        Generate quality human resources with enhanced employability and
        entrepreneurial skills through diversified skill-oriented training
        programs for the food processing sector.
      </p>

      <h3 className="text-lg font-semibold text-green-900 mt-3 mb-2">
        Objectives
      </h3>

      <div className="objectives-grid">
        <div className="objective-card">
          <div className="objective-icon"></div>
          <div className="text-sm">
            Create a certified talent pool for national manpower needs
          </div>
        </div>

        <div className="objective-card">
          <div className="objective-icon"></div>
          <div className="text-sm">
            Utilize CSIR knowledgebase and infrastructure for skill mission
          </div>
        </div>

        <div className="objective-card">
          <div className="objective-icon"></div>
          <div className="text-sm">
            Implement special up-skilling and training programs
          </div>
        </div>

        <div className="objective-card">
          <div className="objective-icon"></div>
          <div className="text-sm">
            Align with NSDC and Sector Skill Councils
          </div>
        </div>
      </div>

    </div>
  </div>
</section>





      {/* ================= COURSES GRID ================= */}
      <section id="courses-section" className="section-shell fade">
        <h2 className="section-heading">Available Courses</h2>
        <p className="section-subtitle">
          Explore CFTRI’s certified short-term training programs.
        </p>

        <div className="course-grid">
          {courses.map((c, i) => (
            <div key={i} className="course-card-shell">
              <div className="course-card">
                <div className="course-media">
                  <img src={c.image} alt={c.title} className="course-img" />
                  <div className="course-overlay">
                    <div className="course-overlay-title">{c.title}</div>
                    <div className="course-overlay-text">{c.description}</div>
                  </div>
                </div>

                <div className="course-content">
                  <div className="course-title">{c.title}</div>
                  <div className="course-meta">
                    Duration: {c.duration} • Fee: {c.fee}
                  </div>

                  <button
                    className="btn-apply"
                    onClick={() => handleApplyClick(c)}
                  >
                    {getApplyButtonLabel()}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= APPLY MODAL ================= */}
      {applyOpen && (
        <div className="apply-bg">
          <div className="apply-box">
            <h3 className="text-lg font-semibold text-green-900">
              Apply for {selectedCourse?.title}
            </h3>

            <p className="text-sm text-gray-700 mt-2">
              Please fill the details below to submit your application.
            </p>

            {/* FORM */}
            <div className="mt-3">
              <div className="mb-2">
                <div className="label-sm">Full Name *</div>
                <input
                  className="input-field"
                  value={applyForm.fullName}
                  onChange={(e) => updateApplyForm("fullName", e.target.value)}
                />
              </div>

              <div className="mb-2">
                <div className="label-sm">Email *</div>
                <input
                  className="input-field"
                  value={applyForm.email}
                  onChange={(e) => updateApplyForm("email", e.target.value)}
                />
              </div>

              <div className="mb-2">
                <div className="label-sm">Degree / Qualification *</div>
                <input
                  className="input-field"
                  placeholder="B.Tech Food Tech / MSc Microbiology"
                  value={applyForm.degree}
                  onChange={(e) => updateApplyForm("degree", e.target.value)}
                />
              </div>

              <div className="grid-two">
                <div className="mb-2">
                  <div className="label-sm">Country *</div>
                  <input
                    className="input-field"
                    value={applyForm.country}
                    onChange={(e) => updateApplyForm("country", e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <div className="label-sm">State *</div>
                  <input
                    className="input-field"
                    value={applyForm.state}
                    onChange={(e) => updateApplyForm("state", e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="label-sm">Organisation / Institution *</div>
                <input
                  className="input-field"
                  value={applyForm.organisation}
                  onChange={(e) => updateApplyForm("organisation", e.target.value)}
                />
              </div>

              <div className="mb-2">
                <div className="label-sm">Category *</div>
                <select
                  className="input-field"
                  value={applyForm.category}
                  onChange={(e) => updateApplyForm("category", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Industry Professional">Industry Professional</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                </select>
              </div>

              <div className="mb-2">
                <div className="label-sm">Phone *</div>
                <input
                  className="input-field"
                  value={applyForm.phone}
                  onChange={(e) => updateApplyForm("phone", e.target.value)}
                />
              </div>

              <div className="mb-2">
                <div className="label-sm">Comments (Optional)</div>
                <textarea
                  className="input-field"
                  rows="3"
                  value={applyForm.notes}
                  onChange={(e) => updateApplyForm("notes", e.target.value)}
                  placeholder="Any additional information..."
                ></textarea>
              </div>
            </div>

            <button className="btn-apply mt-2" onClick={submitApplication}>
              Submit Application
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

      {/* ================= AUTH MODAL ================= */}
      {authOpen && (
        <div className="auth-bg">
          <div className="auth-box">
            <div className="auth-left">
              <div>
                <div className="auth-tag">CSIR–CFTRI STC</div>
                <div className="auth-heading">
                  {authMode === "login" ? "Participant Login" : "Create an Account"}
                </div>
                <p className="auth-left-sub">
                  Access CFTRI's official training portal and manage applications.
                </p>
              </div>
            </div>

            <div className="auth-right">
              <button className="auth-close" onClick={() => setAuthOpen(false)}>
                ×
              </button>

              {/* LOGIN */}
              {authMode === "login" && (
                <>
                  <h3 className="text-lg font-semibold mb-3">Login</h3>

                  <div className="mb-3">
                    <div className="label-sm">Email *</div>
                    <input
                      className="input-field"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="mb-3">
                    <div className="label-sm">Password *</div>
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
                    New user?{" "}
                    <span className="auth-link" onClick={() => setAuthMode("register")}>
                      Register here
                    </span>
                  </div>
                </>
              )}

              {/* REGISTER */}
              {authMode === "register" && (
                <>
                  <h3 className="text-lg font-semibold mb-3">Create Account</h3>

                  <div className="grid-two mb-2">
                    <div>
                      <div className="label-sm">Full Name *</div>
                      <input
                        className="input-field"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="label-sm">Email *</div>
                      <input
                        className="input-field"
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid-two mb-2">
                    <div>
                      <div className="label-sm">Address *</div>
                      <input
                        className="input-field"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="label-sm">Phone *</div>
                      <input
                        className="input-field"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="label-sm">Nationality *</div>
                    <input
                      className="input-field"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                    />
                  </div>

                  <div className="grid-two mb-2">
                    <div>
                      <div className="label-sm">Password *</div>
                      <input
                        className="input-field"
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="label-sm">Confirm Password *</div>
                      <input
                        className="input-field"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button className="btn-apply mt-2" onClick={handleRegister}>
                    Register
                  </button>

                  <div className="auth-switch">
                    Already registered?{" "}
                    <span className="auth-link" onClick={() => setAuthMode("login")}>
                      Sign in here
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= PROFILE EDIT MODAL (NEW) ================= */}
      {profileEditOpen && (
        <div className="profile-edit-bg">
          <div className="profile-edit-box">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0 }}>Edit Profile</h3>
              <button onClick={() => setProfileEditOpen(false)} style={{ border: "none", background: "#f3f4f6", borderRadius: 8, padding: 6, cursor: "pointer" }}>
                ✕
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12, marginTop: 14 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 96, height: 96, margin: "0 auto", borderRadius: 999, overflow: "hidden", border: "4px solid rgba(6,78,59,0.06)", boxShadow: "0 10px 30px rgba(6,70,46,0.06)" }}>
                  {tempProfile.avatar ? (
                    <img src={tempProfile.avatar} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, color: "#064e3b" }}>👤</div>
                  )}
                </div>

                <div style={{ marginTop: 10 }}>
                  <label style={{ cursor: "pointer" }}>
                    <input className="upload-input" type="file" accept="image/*" onChange={handleAvatarChange} />
                    <button className="profile-btn profile-upload">Choose Photo</button>
                  </label>

                  {tempProfile.avatar && (
                    <button style={{ marginLeft: 8 }} className="profile-btn profile-edit" onClick={removeAvatar}>Remove</button>
                  )}
                </div>

                {avatarUploadSuccess && <div style={{ marginTop: 8 }} className="small-muted">Preview ready — save to keep.</div>}
              </div>

              <div>
                <div style={{ display: "grid", gap: 8 }}>
                  <div>
                    <div className="label-sm">Name *</div>
                    <input className="input-field" value={tempProfile.name} onChange={(e) => setTempProfile((p)=>({...p, name: e.target.value}))} />
                  </div>

                  <div>
                    <div className="label-sm">Email *</div>
                    <input className="input-field" value={tempProfile.email} onChange={(e) => setTempProfile((p)=>({...p, email: e.target.value}))} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <div className="label-sm">Phone</div>
                      <input className="input-field" value={tempProfile.phone} onChange={(e) => setTempProfile((p)=>({...p, phone: e.target.value}))} />
                    </div>
                    <div>
                      <div className="label-sm">Nationality</div>
                      <input className="input-field" value={tempProfile.nationality} onChange={(e) => setTempProfile((p)=>({...p, nationality: e.target.value}))} />
                    </div>
                  </div>

                  <div>
                    <div className="label-sm">Address</div>
                    <input className="input-field" value={tempProfile.address} onChange={(e) => setTempProfile((p)=>({...p, address: e.target.value}))} />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="btn-apply" onClick={saveProfileEdits}>Save Profile</button>
              <button style={{ background: "#f3f4f6", border: "1px solid #e6e6e6", padding: "8px 12px", borderRadius: 8 }} onClick={() => setProfileEditOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="footer-main">
        © {new Date().getFullYear()} CSIR–CFTRI · STC Portal
        <br />
        Developed by ITS&CS, CSIR–CFTRI
      </footer>
{/* ================= FLOATING CONTACT PANEL ================= */}
<div className={`contact-panel ${contactOpen ? "open" : ""}`}>
  <button
    className="contact-toggle"
    onClick={() => setContactOpen(!contactOpen)}
    title="Contact Us"
  >
     📞✉ 
  </button>

  <div className="contact-panel-inner">
    <div className="contact-title">Contact Us</div>

    <div className="contact-item">
      📞 <a href="tel:08212514310">0821-2514310</a>
    </div>

    <div className="contact-item">
      ✉ <a href="mailto:stc@cftri.res.in">stc@cftri.res.in</a>
    </div>

    <div className="contact-title" style={{ marginTop: 10 }}>
      Get in Touch
    </div>

    <div className="contact-actions">
      {/* <a
        className="contact-btn whatsapp"
        href="https://wa.me/918212514310"
        target="_blank"
        rel="noreferrer"
      >
       WHATSUPP
      </a>

      <a
        className="contact-btn"
        href="mailto:stc@cftri.res.in"
      >
        CONTACT US.....
      </a> */}
    </div>
  </div>
</div>

      {/* ================= SCROLL TOP ================= */}
      {showTopBtn && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </>
  );
}  // <-- FINAL CLOSING BRACE (VERY IMPORTANT)
