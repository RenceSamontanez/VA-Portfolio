"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiHelpCircle,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PainPointResolver {
  id: string;
  tag: string;
  clientFrustration: string;
  whyItHappens: string;
  myApproach: string;
  concreteResult: string;
}

const PAIN_POINTS: PainPointResolver[] = [
  {
    id: "bloat",
    tag: "01 // PERFORMANCE & STABILITY",
    clientFrustration: "“Our previous site looked flashy, but loaded slowly and broke under real traffic.”",
    whyItHappens: "Many agencies prioritize surface-level visual gimmicks without optimizing core assets, bundle sizes, or database query performance.",
    myApproach: "I build with performance-first architecture. Every animation is hardware-accelerated, dependencies are kept lean, and backends are built for low-latency concurrency.",
    concreteResult: "Sub-100ms API response times, 60fps animations, and zero unexpected layout shifts."
  },
  {
    id: "gimmicks",
    tag: "02 // FUNCTIONAL AUTOMATION",
    clientFrustration: "“We paid for AI and automation features, but they felt like useless gimmicks.”",
    whyItHappens: "Developers often force AI APIs into projects as trendy marketing buzzwords rather than designing workflows that actually solve routine manual tasks.",
    myApproach: "I focus strictly on functional background engines—automating daily content posting, webhook normalization, and background data queues that save real human hours.",
    concreteResult: "Zero-friction operations that automatically execute daily routines in the background."
  },
  {
    id: "blackbox",
    tag: "03 // TRANSPARENCY & CODE QUALITY",
    clientFrustration: "“After launch, the codebase was a black box that no future developer could maintain.”",
    whyItHappens: "Rushed delivery leads to messy, undocumented spaghetti code that functions during a brief client demo but collapses when scaled.",
    myApproach: "I adhere to strict type safety, clean architectural boundaries, and thorough documentation so your technical assets remain modular and maintainable for years.",
    concreteResult: "A clean, self-documenting Next.js & TypeScript codebase designed for long-term survival."
  },
  {
    id: "communication",
    tag: "04 // PROJECT EXECUTION",
    clientFrustration: "“We suffered from unexpected delays, sudden scope changes, and poor updates.”",
    whyItHappens: "Communication breaks down when teams lack clear architecture blueprints and hide technical roadblocks until deadline day.",
    myApproach: "I operate with clear workflow diagrams, transparent milestones, and continuous technical updates—ensuring total alignment from day one.",
    concreteResult: "Predictable delivery schedules with zero technical surprises or unexpected re-works."
  }
];

export default function Thoughts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>(PAIN_POINTS[0].id);

  const activePoint = PAIN_POINTS.find((p) => p.id === activeId) || PAIN_POINTS[0];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      ScrollTrigger.refresh();

      gsap.fromTo(
        ".resolver-header",
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
        ".resolver-body",
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

  const handleSelect = (id: string) => {
    if (id === activeId) return;

    if (detailRef.current) {
      gsap.to(detailRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => {
          setActiveId(id);
          gsap.to(detailRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    } else {
      setActiveId(id);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] text-[#f5f5f7] font-mono py-28 px-6 sm:px-12 border-t border-white/10 overflow-hidden"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Header Section */}
        <div className="resolver-header flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[#818cf8]">
              <FiShield className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-bold">
                06 // INTENTION & REALITY
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase font-mono">
              PAIN POINTS RESOLVED
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-sans text-[#a1a1aa] leading-relaxed font-light">
            Select a common industry frustration below to see why it happens and how my engineering approach eliminates it completely.
          </p>
        </div>

        {/* Interactive Matrix Grid */}
        <div className="resolver-body grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Selectable Client Frustrations */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[10px] text-[#71717a] uppercase tracking-widest block mb-2 font-bold">
              COMMON CLIENT EXPERIENCES
            </span>

            {PAIN_POINTS.map((item) => {
              const isSelected = item.id === activeId;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col space-y-2 relative ${
                    isSelected
                      ? "bg-[#0d0d12] border-[#818cf8] shadow-[0_0_20px_rgba(129,140,248,0.15)]"
                      : "bg-[#0a0a0c] border-white/10 hover:border-white/20 hover:bg-[#0f0f12]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono tracking-wider ${
                        isSelected ? "text-[#818cf8]" : "text-[#71717a]"
                      }`}
                    >
                      {item.tag}
                    </span>
                    <FiArrowRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isSelected
                          ? "text-[#818cf8] translate-x-1"
                          : "text-[#52525b] opacity-0"
                      }`}
                    />
                  </div>

                  <p
                    className={`text-xs sm:text-sm font-sans font-light leading-relaxed ${
                      isSelected ? "text-white font-medium" : "text-[#a1a1aa]"
                    }`}
                  >
                    {item.clientFrustration}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Breakdown of the Solution */}
          <div className="lg:col-span-7" ref={detailRef}>
            <div className="bg-[#0a0a0d] border border-white/10 rounded-xl p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden">
              
              {/* Header */}
              <div className="border-b border-white/10 pb-6 space-y-2">
                <span className="text-xs text-[#818cf8] font-mono tracking-wider uppercase">
                  SOLUTION BREAKDOWN // {activePoint.tag}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide font-sans">
                  {activePoint.clientFrustration}
                </h3>
              </div>

              {/* Problem Analysis */}
              <div className="bg-red-500/[0.03] border border-red-500/20 rounded-lg p-5 space-y-2">
                <div className="flex items-center space-x-2 text-red-400">
                  <FiAlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    WHY THIS HAPPENS IN THE INDUSTRY
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-sans text-[#a1a1aa] leading-relaxed font-light">
                  {activePoint.whyItHappens}
                </p>
              </div>

              {/* My Direct Solution */}
              <div className="bg-[#818cf8]/[0.03] border border-[#818cf8]/20 rounded-lg p-5 space-y-2">
                <div className="flex items-center space-x-2 text-[#818cf8]">
                  <FiCheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    MY APPROACH & GUARANTEE
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-sans text-[#e4e4e7] leading-relaxed font-light">
                  {activePoint.myApproach}
                </p>
              </div>

              {/* Concrete Outcome */}
              <div className="bg-emerald-500/[0.03] border border-emerald-500/20 rounded-lg p-4 flex items-center space-x-3">
                <FiHelpCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest block font-bold">
                    THE TANGIBLE DELIVERABLE
                  </span>
                  <p className="text-xs font-mono text-white">
                    {activePoint.concreteResult}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}