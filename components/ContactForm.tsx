"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import {
  FiDownload,
  FiSend,
  FiMail,
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiX,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SOCIAL_LINKS = [
  { name: "Facebook", icon: FaFacebook, url: "https://www.facebook.com/rence.samontanez.7/", handle: "@rence.samontanez.7" },
  { name: "Twitter / X", icon: FaTwitter, url: "https://x.com/SamontanezRence", handle: "@SamontanezRence" },
  { name: "LinkedIn", icon: FaLinkedin, url: "https://www.linkedin.com/in/rensuru", handle: "in/rensuru" },
  { name: "Telegram", icon: FaTelegram, url: "https://t.me/SoloXRence", handle: "@SoloXRence" },
  { name: "WhatsApp", icon: FaWhatsapp, url: "https://wa.me/639451031206?text=Hi%21%20I%20want%20to%20inquire", handle: "+63 945 103 1206" },
  { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/fushigurotojing/", handle: "@fushigurotojing" },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useGSAP(
    () => {
      if (!containerRef.current) return;

      ScrollTrigger.refresh();

      gsap.fromTo(
        ".contact-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".contact-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMessage(data.error || "Failed to send message.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full bg-black text-[#f5f5f7] font-mono py-28 px-6 sm:px-12 border-t border-white/10 overflow-hidden"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Header */}
        <div className="contact-header flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[#818cf8]">
              <FiMail className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-bold">
                07 // GET IN TOUCH
              </span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-bold tracking-tight text-white uppercase font-mono">
              LET&apos;S WORK TOGETHER
            </h2>
          </div>

          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center space-x-3 px-6 py-3.5 bg-white/5 border border-white/20 hover:border-[#818cf8] hover:bg-[#818cf8]/10 text-white rounded-xl transition-all duration-300 font-mono text-xs uppercase tracking-wider group flex-shrink-0"
          >
            <FiDownload className="w-4 h-4 text-[#818cf8] group-hover:translate-y-0.5 transition-transform" />
            <span>DOWNLOAD CURRICULUM VITAE</span>
          </a>
        </div>

        {/* Content Layout */}
        <div className="contact-content grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Email Form Card */}
          <div className="lg:col-span-6 bg-[#0a0a0d] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden">
            
            {/* Header */}
            <div className="space-y-2 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                  SEND A DIRECT MESSAGE
                </h3>
                <span className="text-[10px] text-[#818cf8] px-2.5 py-1 bg-[#818cf8]/10 border border-[#818cf8]/20 rounded-full font-mono flex items-center space-x-1">
                  <FiClock className="w-3 h-3" />
                  <span>1 email / 3 hrs</span>
                </span>
              </div>
              <p className="text-xs font-sans text-[#a1a1aa] leading-relaxed">
                Have a project or inquiry? Send a direct message below.
              </p>
            </div>

            {/* HIGH-VISIBILITY ALERT: SUCCESS */}
            {status === "success" && (
              <div className="p-5 bg-emerald-950/80 border-2 border-emerald-500 rounded-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-300 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <div className="flex items-center justify-between text-emerald-400">
                  <div className="flex items-center space-x-2.5">
                    <FiCheckCircle className="w-5 h-5 flex-shrink-0 animate-bounce" />
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">
                      MESSAGE DISPATCHED SUCCESSFULLY
                    </span>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-emerald-400/60 hover:text-emerald-400 cursor-pointer"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs font-sans text-emerald-200/90 leading-relaxed pl-7">
                  Thank you! Your email has reached my inbox. I will review your message and reply back shortly.
                </p>
              </div>
            )}

            {/* HIGH-VISIBILITY ALERT: ERROR / RATE LIMIT */}
            {status === "error" && (
              <div className="p-5 bg-red-950/80 border-2 border-red-500 rounded-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-300 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                <div className="flex items-center justify-between text-red-400">
                  <div className="flex items-center space-x-2.5">
                    <FiAlertTriangle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">
                      DELIVERY BLOCKED
                    </span>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-red-400/60 hover:text-red-400 cursor-pointer"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs font-sans text-red-200/90 leading-relaxed pl-7">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* SKELETON LOADING OVERLAY */}
            {status === "loading" ? (
              <div className="space-y-5 animate-pulse py-2">
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-white/10 rounded" />
                  <div className="h-11 w-full bg-white/5 border border-white/10 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-white/10 rounded" />
                  <div className="h-11 w-full bg-white/5 border border-white/10 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-white/10 rounded" />
                  <div className="h-28 w-full bg-white/5 border border-white/10 rounded-lg" />
                </div>
                <div className="h-12 w-full bg-[#818cf8]/20 border border-[#818cf8]/40 rounded-lg flex items-center justify-center space-x-2 text-[#818cf8]">
                  <span className="w-2 h-2 rounded-full bg-[#818cf8] animate-ping" />
                  <span className="text-xs font-mono font-bold tracking-widest uppercase">
                    DISPATCHING EMAIL VIA RESEND...
                  </span>
                </div>
              </div>
            ) : (
              /* ACTIVE FORM */
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1aa] block">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-3.5 text-white placeholder-[#52525b] focus:outline-none focus:border-[#818cf8] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1aa] block">
                    YOUR EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-3.5 text-white placeholder-[#52525b] focus:outline-none focus:border-[#818cf8] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1aa] block">
                    MESSAGE
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-3.5 text-white placeholder-[#52525b] focus:outline-none focus:border-[#818cf8] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#818cf8] hover:bg-[#6366f1] text-black font-bold uppercase tracking-widest font-mono rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>SEND MESSAGE</span>
                  <FiSend className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Social Accounts Grid */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] block">
              DIRECT CHANNELS & SOCIAL ECOSYSTEM
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-[#0a0a0c] border border-white/10 hover:border-[#818cf8]/60 hover:bg-[#0f0f15] p-5 rounded-xl transition-all duration-300 flex items-center space-x-4"
                  >
                    <div className="p-3.5 bg-white/5 border border-white/10 rounded-lg text-white group-hover:text-[#818cf8] group-hover:border-[#818cf8]/30 transition-colors flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-0.5 overflow-hidden">
                      <span className="text-xs font-bold text-white group-hover:text-[#818cf8] transition-colors block uppercase">
                        {social.name}
                      </span>
                      <span className="text-[11px] font-sans text-[#71717a] truncate block">
                        {social.handle}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}