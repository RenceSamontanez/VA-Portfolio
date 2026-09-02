"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiCheckCircle } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ============================================================================
// DYNAMIC PRICING CONFIGURATION (Change pricing & features here easily)
// ============================================================================
export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  prices: {
    startup: { value: number | string; period: string };
    enterprise: { value: number | string; period: string };
  };
  billingNote: string;
  description: string;
  includedServices: string[]; // Maps to your 5 core services
}

const PRICING_CONFIG: PricingTier[] = [
  {
    id: "essential",
    name: "Essential Stack",
    prices: {
      startup: { value: 2499, period: "per project" },
      enterprise: { value: 4999, period: "per project" },
    },
    billingNote: "Includes 01 Web Dev & 02 UI/UX",
    description: "Ideal for modern websites & high-performance UI/UX interactive systems.",
    includedServices: ["Web Development", "UI/UX Implementation"],
  },
  {
    id: "growth",
    name: "Full-Stack + AI",
    badge: "Most Popular",
    isPopular: true,
    prices: {
      startup: { value: 4899, period: "per project" },
      enterprise: { value: 8999, period: "per project" },
    },
    billingNote: "Includes Services 01, 02, 03 & 04",
    description: "Complete end-to-end web apps with AI integrations and automated workflows.",
    includedServices: [
      "Web Development",
      "UI/UX Implementation",
      "AI Integrations",
      "Business Automation",
    ],
  },
  {
    id: "scale",
    name: "Custom Enterprise",
    prices: {
      startup: { value: "Custom", period: "tailored scope" },
      enterprise: { value: "Custom", period: "dedicated retainers" },
    },
    billingNote: "Includes All 5 Core Services",
    description: "High-throughput backend architectures, microservices, and bespoke AI engines.",
    includedServices: [
      "Web Development",
      "UI/UX Implementation",
      "AI Integrations",
      "Business Automation",
      "Backend Systems",
    ],
  },
];

// Feature matrix covering all 5 core services
const SERVICE_FEATURE_CHECKLIST = [
  {
    title: "Web Development",
    desc: "Next.js App Router, SSR applications, type-safe APIs, and edge deployment.",
  },
  {
    title: "UI/UX Implementation",
    desc: "60FPS GSAP animations, 3D Canvas WebGL, dynamic micro-interactions.",
  },
  {
    title: "AI Integrations",
    desc: "Custom RAG pipelines, OpenAI API, vector search, and streaming LLM UI.",
  },
  {
    title: "Business Automation",
    desc: "Automated social/content scheduling pipelines, Redis queues & webhooks.",
  },
  {
    title: "Backend Systems",
    desc: "Low-latency microservices, WebSocket channels, real-time event telemetry.",
  },
  {
    title: "Dedicated Code Quality",
    desc: "Maintainable TypeScript architecture, clean ORM models, and zero technical debt.",
  },
];

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [planCategory, setPlanCategory] = useState<"startup" | "enterprise">("startup");

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        ".pricing-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".pricing-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pricing-cards-grid",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".feature-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050508] text-[#f5f5f7] font-sans py-28 px-6 sm:px-12 border-t border-white/10 overflow-hidden"
    >
      {/* Dynamic Cosmic Fluid Background Canvas */}
      <CosmicFluidCanvas />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        {/* Header Block */}
        <div className="pricing-header text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-purple-400 font-bold tracking-widest uppercase px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full inline-block">
            FLEXIBLE PLANS
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Simple, predictable pricing
          </h2>
          <p className="text-sm font-mono text-zinc-400">
            Tailored engineering options derived across all 5 key technical services.
          </p>

          {/* Startup / Enterprise Toggle Switch */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex items-center bg-black/60 border border-white/10 p-1 rounded-full backdrop-blur-md">
              <button
                onClick={() => setPlanCategory("startup")}
                className={`px-6 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
                  planCategory === "startup"
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Startup
              </button>
              <button
                onClick={() => setPlanCategory("enterprise")}
                className={`px-6 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
                  planCategory === "enterprise"
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Enterprise
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="pricing-cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_CONFIG.map((tier) => {
            const currentPrice = tier.prices[planCategory];

            return (
              <div
                key={tier.id}
                className={`pricing-card relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl ${
                  tier.isPopular
                    ? "bg-black/80 border-2 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.25)] scale-105 z-20"
                    : "bg-black/50 border border-white/10 hover:border-white/20 z-10"
                }`}
              >
                {/* Popular Badge */}
                {tier.badge && (
                  <span className="absolute -top-3 right-6 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 bg-purple-500 text-white rounded-full shadow-lg">
                    {tier.badge}
                  </span>
                )}

                <div className="space-y-6">
                  {/* Tier Title */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      {tier.name}
                    </h3>
                    <p className="text-xs font-sans text-zinc-400 font-light">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="space-y-1 py-2 border-y border-white/5">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        {typeof currentPrice.value === "number"
                          ? `$${currentPrice.value.toLocaleString()}`
                          : currentPrice.value}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-purple-400">
                      {currentPrice.period}
                    </p>
                    <p className="text-[11px] font-mono text-zinc-500 pt-1">
                      {tier.billingNote}
                    </p>
                  </div>

                  {/* Services Included Checklist */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider font-bold">
                      INCLUDED SERVICES:
                    </span>
                    <ul className="space-y-2">
                      {tier.includedServices.map((svc) => (
                        <li key={svc} className="flex items-center space-x-2 text-xs text-zinc-300">
                          <FiCheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{svc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <button
                    className={`w-full py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                      tier.isPopular
                        ? "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                    }`}
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Feature Matrix Checklist (Matching Reference Grid) */}
        <div className="features-grid border-t border-white/10 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICE_FEATURE_CHECKLIST.map((feat, idx) => (
              <div key={idx} className="feature-item flex items-start space-x-3">
                <FiCheckCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white font-sans">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COSMIC FLUID AURORA CANVAS (Generates fluid gradient waves matching photo)
// ============================================================================
function CosmicFluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let t = 0;

    const render = () => {
      t += 0.003;
      ctx.clearRect(0, 0, width, height);

      // Render flowing liquid curves with cosmic color palette (Cyan, Indigo, Magenta, Fiery Orange)
      const waveCount = 14;

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.lineWidth = 2 + i * 0.5;

        // Dynamic multi-stop gradient for fluid cosmic effect
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, `rgba(56, 189, 248, ${0.08 + (i % 3) * 0.04})`); // Electric Cyan
        grad.addColorStop(0.3, `rgba(168, 85, 247, ${0.12 + (i % 2) * 0.05})`); // Vibrant Purple
        grad.addColorStop(0.7, `rgba(236, 72, 153, ${0.08 + (i % 3) * 0.03})`); // Pink/Magenta
        grad.addColorStop(1, `rgba(249, 115, 22, ${0.05 + (i % 2) * 0.03})`); // Fiery Orange

        ctx.strokeStyle = grad;

        for (let x = 0; x <= width; x += 30) {
          const y =
            height * 0.5 +
            Math.sin(x * 0.0015 + t + i * 0.35) * (140 + i * 10) +
            Math.cos(x * 0.003 - t * 1.2) * 80;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-0"
    />
  );
}