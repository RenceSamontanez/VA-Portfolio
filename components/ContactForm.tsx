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
  FiSend,
  FiCheckCircle,
  FiAlertTriangle,
  FiX,
  FiArrowRight,
  FiDownload,
  FiExternalLink,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    icon: FaFacebook,
    url: "https://www.facebook.com/rence.samontanez.7/",
    handle: "@rence.samontanez.7",
    desc: "Connect on Facebook for updates",
  },
  {
    name: "Twitter / X",
    icon: FaTwitter,
    url: "https://x.com/SamontanezRence",
    handle: "@SamontanezRence",
    desc: "Tech thoughts & engineering tweets",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/rensuru",
    handle: "in/rensuru",
    desc: "Professional career & network",
  },
  {
    name: "Telegram",
    icon: FaTelegram,
    url: "https://t.me/SoloXRence",
    handle: "@SoloXRence",
    desc: "Instant direct messaging",
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    url: "https://wa.me/639451031206?text=Hi%21%20I%20want%20to%20inquire",
    handle: "+63 945 103 1206",
    desc: "Direct inquiry chat line",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/fushigurotojing/",
    handle: "@fushigurotojing",
    desc: "Behind the scenes & visual log",
  },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });
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
    if (!formData.agree) {
      setErrorMessage("Please agree to the communications terms to proceed.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `[Phone: ${formData.phone || "N/A"}]\n\n${formData.message}`,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "", agree: false });
      } else {
        setErrorMessage(data.error || "Failed to send message.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again later.");
      setStatus("error");
    }
  };

  // Duplicate items for infinite seamless vertical loop (matching Testimonials)
  const infiniteSocials = [...SOCIAL_LINKS, ...SOCIAL_LINKS, ...SOCIAL_LINKS];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full bg-[#030303] text-white py-24 px-6 sm:px-12 lg:px-20 overflow-hidden font-sans border-t border-white/10"
    >
      {/* SoloX Blue Ambient Radial Lighting Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* TOP BRAND BAR & HEADER */}
        <div className="contact-header space-y-8">
          {/* Top Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            {/* SoloX Top Left Branding */}
            <div className="flex items-center space-x-3">
              <span className="font-space font-extrabold text-3xl sm:text-4xl tracking-wider bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(147,197,253,0.3)]">
                SoloX
              </span>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline-block">
                / CONTACT & CHANNELS
              </span>
            </div>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-sky-400 hover:bg-sky-400/10 text-white rounded-xl transition-all duration-300 font-mono text-xs uppercase tracking-wider group"
            >
              <FiDownload className="w-3.5 h-3.5 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              <span className="hidden sm:inline">DOWNLOAD CV</span>
            </a>
          </div>

          {/* Centered Heading Layout matching Reference */}
          <div className="text-center space-y-3 max-w-2xl mx-auto pt-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>CONNECT WITH US</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Let&apos;s Start a Conversation
            </h2>
          </div>
        </div>

        {/* CONTENT LAYOUT: FORM & INFINITE SOCIALS */}
        <div className="contact-content grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT COLUMN: CONTACT FORM CARD */}
          <div className="lg:col-span-7 bg-neutral-950/80 backdrop-blur-xl border border-white/10 p-6 sm:p-10 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
            
            {/* SUCCESS ALERT */}
            {status === "success" && (
              <div className="p-5 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-300 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
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
                  Thank you! Your inquiry has reached my inbox. I will review your message and reply back shortly.
                </p>
              </div>
            )}

            {/* ERROR ALERT */}
            {status === "error" && (
              <div className="p-5 bg-red-950/80 border border-red-500/40 rounded-2xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-300 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
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
              <div className="space-y-6 animate-pulse py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-12 bg-white/5 border border-white/10 rounded-xl" />
                  <div className="h-12 bg-white/5 border border-white/10 rounded-xl" />
                </div>
                <div className="h-12 bg-white/5 border border-white/10 rounded-xl" />
                <div className="h-32 bg-white/5 border border-white/10 rounded-xl" />
                <div className="h-12 bg-blue-600/30 rounded-xl flex items-center justify-center space-x-2 text-blue-300">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  <span className="text-xs font-mono font-bold tracking-widest uppercase">
                    DISPATCHING MESSAGE...
                  </span>
                </div>
              </div>
            ) : (
              /* ACTIVE FORM */
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                {/* Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-300 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-900/90 border border-white/10 rounded-xl p-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-300 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-900/90 border border-white/10 rounded-xl p-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-300 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-900/90 border border-white/10 rounded-xl p-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-300 block">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you today? Please provide as much detail as possible."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-neutral-900/90 border border-white/10 rounded-xl p-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  />
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="flex items-start space-x-3 pt-1">
                  <input
                    type="checkbox"
                    id="privacy-terms"
                    checked={formData.agree}
                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded bg-neutral-900 border-white/20 text-blue-500 focus:ring-blue-400 cursor-pointer"
                  />
                  <label htmlFor="privacy-terms" className="text-zinc-400 text-[11px] leading-relaxed cursor-pointer select-none">
                    I agree to the privacy policy and terms of service for this communication.
                  </label>
                </div>

                {/* SoloX Styled CTA Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold uppercase tracking-wider font-mono rounded-xl transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)]"
                >
                  <span>Send Message</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: INFINITE ROTATING SOCIAL TICKER */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
                DIRECT CHANNELS & SOCIAL ECOSYSTEM
              </span>
              <span className="text-[10px] font-mono text-sky-400 flex items-center space-x-1">
                <HiSparkles className="w-3 h-3" />
                <span>You can also reach out here</span>
              </span>
            </div>

            {/* Vertical Ticker Container (Matching Testimonials Height & Mask) */}
            <div className="relative h-[500px] overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/40 p-2 group">
              {/* Top & Bottom Gradient Masks */}
              <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-20 pointer-events-none" />

              {/* Seamless Infinite Marquee Track */}
              <div className="space-y-3.5 animate-vertical-infinite-scroll group-hover:[animation-play-state:paused]">
                {infiniteSocials.map((social, idx) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={`${social.name}-${idx}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/item flex items-center justify-between p-4 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-sky-500/50 hover:bg-neutral-800/80 transition-all duration-300 shadow-lg"
                    >
                      <div className="flex items-center space-x-4 overflow-hidden">
                        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sky-400 group-hover/item:text-white group-hover/item:bg-blue-600 transition-all flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="space-y-0.5 overflow-hidden">
                          <span className="text-xs font-bold text-white group-hover/item:text-sky-300 transition-colors block uppercase tracking-wider">
                            {social.name}
                          </span>
                          <span className="text-[11px] font-sans text-zinc-400 truncate block">
                            {social.handle}
                          </span>
                        </div>
                      </div>

                      <FiExternalLink className="w-4 h-4 text-zinc-500 group-hover/item:text-sky-400 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all flex-shrink-0 ml-3" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Infinite Vertical Scroll CSS Keyframes */}
      <style jsx global>{`
        @keyframes vertical-infinite-scroll {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-vertical-infinite-scroll {
          animation: vertical-infinite-scroll 22s linear infinite;
        }
      `}</style>
    </section>
  );
}