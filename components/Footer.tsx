"use client";

import React from "react";
import { FiArrowRight, FiHeart } from "react-icons/fi";

export default function Footer() {
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="w-full bg-[#030304] text-white font-sans border-t border-white/10 pt-20 pb-12 px-6 sm:px-12 lg:px-20 relative overflow-hidden">
      {/* SoloX Blue Ambient Radial Glow (Right Side) */}
      <div className="absolute bottom-0 right-0 w-[700px] h-[350px] bg-gradient-to-l from-blue-600/30 via-sky-500/15 to-transparent blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* TOP SECTION: Headline, Email & Navigation */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          {/* Left Side: Headline & Reach Out Email */}
          <div className="space-y-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              Want to collaborate with me or just curious to know more?
            </h2>

            <div className="space-y-3">
              <span className="text-xs font-mono text-zinc-400 block tracking-widest uppercase">
                Reach out at:
              </span>
              <a
                href="mailto:rencesamontanez@gmail.com"
                className="inline-flex items-center space-x-3 text-2xl sm:text-3xl font-semibold text-white hover:text-sky-400 transition-colors group"
              >
                <span>rencesamontanez@gmail.com</span>
                <FiArrowRight className="w-7 h-7 text-sky-400 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Right Side: Horizontal Navigation Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION: Giant SoloX Branding Banner with Blue Glow */}
        <div className="relative pt-10 overflow-hidden rounded-2xl">
          {/* Blue Gradient Mask Overlay on the Right side */}
          <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-blue-600/50 via-sky-500/25 to-transparent blur-3xl pointer-events-none" />

          {/* Massive SoloX Text */}
          <div className="relative z-10">
            <h1 className="text-[18vw] sm:text-[19vw] lg:text-[230px] font-extrabold tracking-tighter leading-none select-none bg-gradient-to-r from-zinc-700 via-zinc-300 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(56,189,248,0.25)]">
              SoloX
            </h1>
          </div>
        </div>

        {/* SUB-FOOTER: Copyright & Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono border-t border-white/10 pt-8">
          <span>© {new Date().getFullYear()} SoloX. All rights reserved.</span>
          <span className="flex items-center space-x-1.5">
            <span>Crafted with</span>
            <FiHeart className="w-3.5 h-3.5 text-blue-500 fill-blue-500 inline" />
          </span>
        </div>
      </div>
    </footer>
  );
}