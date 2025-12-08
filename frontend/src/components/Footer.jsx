import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[var(--g1)] text-white text-center py-6 mt-20">
      © {new Date().getFullYear()} CSIR-CFTRI · Short Term Courses Portal
    </footer>
  );
}
