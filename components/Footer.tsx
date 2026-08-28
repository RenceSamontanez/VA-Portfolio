"use client";

import React from "react";
import { FiArrowUp, FiHeart, FiCode, FiLayers } from "react-icons/fi";
import { FaGoogle, FaReact, FaGithub } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiGsap } from "react-icons/si";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "WORK", href: "#work" },
    { name: "PROCESS", href: "#process" },
    { name: "SERVICES", href: "#services" },
    { name: "THOUGHTS", href: "#thoughts" },
    { name: "TESTIMONIALS", href: "#testimonials" },
    { name: "CONTACT", href: "#contact" },
  ];

  const credits = [
    { name: "Next.js 14", icon: SiNextdotjs, role: "React Framework" },
    { name: "React", icon: FaReact, role: "UI Library" },
    { name: "TypeScript", icon: SiTypescript, role: "Language" },
    { name: "Tailwind CSS", icon: SiTailwindcss, role: "Styling" },
    { name: "GSAP", icon: SiGsap, role: "Animations" },
    { name: "NextAuth.js", icon: FaGoogle, role: "Google Auth" },
  ];

  return (
    <footer className="w-full bg-[#030304] text-[#f5f5f7] font-mono border-t border-white/10 pt-20 pb-12 px-6 sm:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* TOP ROW: Large Outro Branding & Back-To-Top Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center space-x-2 text-[#818cf8] text-xs uppercase tracking-widest font-bold">
              <span className="inline-block w-2 h-2 rounded-full bg-[#818cf8] animate-pulse" />
              <span>END OF PAGE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight font-mono">
              DESIGNED TO INSPIRE. BUILT TO PERFORM.
            </h2>
            <p className="text-xs text-[#a1a1aa] font-sans leading-relaxed">
              Thank you for exploring my work. Whether you have a project in mind or just want to connect, feel free to reach out anytime.
            </p>
          </div>

          {/* Return to Top Button */}
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center space-x-3 px-6 py-4 bg-white/5 border border-white/10 hover:border-[#818cf8] hover:bg-[#818cf8]/10 rounded-xl text-xs uppercase tracking-widest text-white transition-all cursor-pointer self-start md:self-end"
          >
            <span>BACK TO TOP</span>
            <FiArrowUp className="w-4 h-4 text-[#818cf8] group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* MIDDLE ROW: Footer Navbar & Technology Credits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/10 pb-16">
          
          {/* Footer Navigation Bar */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-2 text-xs text-[#818cf8] uppercase tracking-widest font-bold">
              <FiLayers className="w-4 h-4" />
              <span>QUICK NAVIGATION</span>
            </div>
            <nav className="grid grid-cols-2 gap-y-3 gap-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs text-[#a1a1aa] hover:text-white hover:translate-x-1 transition-all duration-200 tracking-wider inline-flex items-center space-x-1"
                >
                  <span className="text-[#818cf8]/60 text-[10px]">//</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Acknowledggments & Built With Credits */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center space-x-2 text-xs text-[#818cf8] uppercase tracking-widest font-bold">
              <FiCode className="w-4 h-4" />
              <span>STACK ACKNOWLEDGMENTS & CREDITS</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {credits.map((item) => (
                <div
                  key={item.name}
                  className="bg-white/[0.02] border border-white/5 hover:border-white/15 p-3 rounded-lg flex items-center space-x-3 transition-colors"
                >
                  <item.icon className="w-4 h-4 text-[#818cf8] shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold text-white block truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-[#71717a] block truncate">
                      {item.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Copyright & Disclaimers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#71717a]">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED.</span>
            <span>•</span>
            <span className="inline-flex items-center space-x-1">
              <span>CRAFTED WITH</span>
              <FiHeart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            </span>
          </div>

          <div className="flex items-center space-x-6 font-sans text-[11px]">
            <span className="text-[#a1a1aa]">
              Google OAuth & Resend API used for authentication & emails.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}