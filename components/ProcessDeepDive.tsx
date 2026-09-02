"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  CheckCircle2,
  Workflow,
  HelpCircle,
  Zap,
  ShoppingBag,
  Database,
  Layout,
  Cpu,
  Boxes,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProcessDeepDive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"discover" | "plan" | "build" | "test" | "deploy">("discover");

  // Dynamic GSAP Animations for Scroll Transformations
  useGSAP(
    () => {
      // 1. Vertical Progress Bar Filler
      gsap.to(progressBarRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // 2. 3D Tilt & Fade In for Section Headers
      const headers = gsap.utils.toArray<HTMLElement>(".scroll-header");
      headers.forEach((header) => {
        gsap.fromTo(
          header,
          { opacity: 0, y: 50, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 3. Parallax Elevate on Case Study Cards (now first section)
      const caseCards = gsap.utils.toArray<HTMLElement>(".case-study-card");
      caseCards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 4. Solution Transformation Cards Scrubbing
      const solutionCards = gsap.utils.toArray<HTMLElement>(".solution-card");
      gsap.fromTo(
        solutionCards,
        { opacity: 0, y: 60, rotateY: 10 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".solution-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const decisions = {
    discover: [
      "Who experiences this problem daily in their workflow?",
      "Where does the current manual process break down or stall?",
      "What vital business information is getting lost or misplaced?",
      "Which repetitive tasks are prone to human error?",
      "What critical non-negotiable requirements must exist on Day 1?",
    ],
    plan: [
      "What steps should be automated vs. kept human-in-the-loop?",
      "What relational data schemas need to exist in the database?",
      "Who should have specific read/write access permissions?",
      "How should separate client modules communicate via APIs?",
      "What technical debt can we proactively prevent ahead of time?",
    ],
    build: [
      "Is this component modular, accessible, and reusable across the app?",
      "How are optimistic state updates and async errors handled gracefully?",
      "Can this architecture scale when user volume increases tenfold?",
      "Are database queries optimized to avoid costly N+1 performance issues?",
      "Is JWT authentication enforced securely on all protected API routes?",
    ],
    test: [
      "What happens when the user performs unexpected or invalid actions?",
      "How does the UI react during high-latency network drops?",
      "Does the application reject malicious edge-case payloads safely?",
      "Can the core workflow be completed seamlessly end-to-end?",
      "Are public API endpoints locked down against security leaks?",
    ],
    deploy: [
      "Are production environment variables and API keys isolated securely?",
      "Is production build caching and CDN asset delivery optimized?",
      "How smoothly can future code deployments be pushed without downtime?",
      "Are real-time server telemetry and error logging active?",
      "What happens after launch when real users onboard?",
    ],
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#030303] text-[#e0e0e0] font-sans px-4 sm:px-8 lg:px-16 py-24 overflow-hidden border-t border-amber-500/10"
    >
      {/* Dynamic Ember/Gold Aurora Background Canvas */}
      <EmberAuroraCanvas />

      {/* Vertical Glowing Scroll Progress Line */}
      <div className="absolute left-4 sm:left-10 lg:left-16 top-0 bottom-0 w-[2px] bg-white/5 pointer-events-none z-10">
        <div
          ref={progressBarRef}
          className="w-full h-full bg-gradient-to-b from-amber-500 via-amber-400 to-amber-600 origin-top shadow-[0_0_15px_#f59e0b]"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      <div className="relative z-20 max-w-6xl mx-auto space-y-36 pl-6 sm:pl-10">
        {/* SECTION 1: ARCHITECTURAL CASE STUDY (moved up) */}
        <section className="space-y-16">
          <div className="scroll-header space-y-4 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold tracking-widest uppercase">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>01 · ARCHITECTURAL CASE STUDY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Real-World Execution Scenario: <br />
              <span className="text-amber-400">Furniture Workshop Management</span>
            </h2>
            <p className="text-sm text-neutral-400 font-light max-w-xl mx-auto">
              How a custom software architecture solved chaotic order tracking and overselling for a high-volume custom furniture business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Card: The Raw Problem */}
            <div className="case-study-card p-8 bg-neutral-950/80 backdrop-blur-md border border-red-500/30 rounded-2xl space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between font-mono text-xs text-red-400 font-bold tracking-widest">
                <span>STAGE 01 & 02</span>
                <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30">
                  RAW PROBLEM
                </span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-sans">
                  The Client&apos;s Initial Setup
                </h3>
                <p className="text-xs font-mono text-neutral-300 italic bg-neutral-900/90 p-4 rounded-lg border border-neutral-800">
                  &quot;Customers contact us on social messaging apps. We write custom dimensions in paper logbooks, but staff constantly forget to update remaining wood stock, causing fulfillment delays and missed deliveries.&quot;
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Identified Bottlenecks:
                </span>
                <ul className="space-y-2 text-xs text-neutral-300 font-sans">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span>Orders scattered across unorganized chat threads.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span>Manual stock checks led to accidental overselling.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span>No real-time visibility into production line statuses.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Card: The Engineered Solution */}
            <div className="case-study-card p-8 bg-neutral-950/80 backdrop-blur-md border border-amber-500/40 rounded-2xl space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between font-mono text-xs text-amber-400 font-bold tracking-widest">
                <span>STAGE 03 TO 05</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                  ENGINEERED SYSTEM
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-sans">
                  Centralized System Architecture
                </h3>
                <div className="p-4 bg-neutral-900/90 rounded-lg border border-neutral-800 font-mono text-[11px] text-amber-300 space-y-1">
                  <p className="text-white font-bold">CLIENT APP → REST API → MYSQL</p>
                  <p>├── Custom Dimensions Builder</p>
                  <p>├── Automated Inventory Lock Engine</p>
                  <p>└── Live Carpenter Kanban Portal</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Measured Outcomes:
                </span>
                <ul className="space-y-2 text-xs text-neutral-300 font-sans">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Zero stock discrepancies via atomic DB transactions.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Order fulfillment times reduced by 40%.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Automated customer status updates via Webhooks.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT I ACTUALLY SOLVE */}
        <section className="space-y-12">
          <div className="scroll-header space-y-4 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold tracking-widest uppercase">
              <Workflow className="w-3.5 h-3.5 text-amber-400" />
              <span>02 · VALUE PROPOSITION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Connecting Chaos to Precision
            </h2>
          </div>

          <div className="solution-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                from: "Scattered Spreadsheets",
                action: "Data Modeling",
                to: "Centralized Database",
                icon: <Database className="w-4 h-4 text-amber-400" />,
              },
              {
                from: "Manual Order Entry",
                action: "Workflow Engine",
                to: "Automated Pipeline",
                icon: <Cpu className="w-4 h-4 text-amber-400" />,
              },
              {
                from: "Unclear Status Updates",
                action: "Real-time Telemetry",
                to: "Live Status Dashboard",
                icon: <Layout className="w-4 h-4 text-amber-400" />,
              },
              {
                from: "Brittle Custom Code",
                action: "Modular Architecture",
                to: "Maintainable Stack",
                icon: <Boxes className="w-4 h-4 text-amber-400" />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="solution-card p-6 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-xl space-y-4 hover:border-amber-500/50 transition-all duration-300"
              >
                <div className="p-2 w-fit rounded-md bg-amber-500/10 border border-amber-500/20">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-neutral-500 uppercase block">
                    FROM: {item.from}
                  </span>
                  <div className="text-xs font-mono text-amber-400 flex items-center space-x-1 py-1">
                    <span>→ {item.action}</span>
                  </div>
                  <span className="text-sm font-sans font-bold text-white block">
                    {item.to}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: THE DECISION LAYER */}
        <section className="space-y-12">
          <div className="scroll-header space-y-4 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold tracking-widest uppercase">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>03 · THE DECISION LAYER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Questions I Ask Before Writing Code
            </h2>
            <p className="text-sm text-neutral-400 font-light">
              Select a project phase to inspect the engineering criteria applied at each stage.
            </p>
          </div>

          {/* Phase Selector */}
          <div className="flex flex-wrap justify-center gap-2 font-mono text-xs">
            {(["discover", "plan", "build", "test", "deploy"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg uppercase font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                    : "bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Question List Card */}
          <div className="p-8 bg-neutral-950/90 backdrop-blur-md border border-amber-500/30 rounded-2xl max-w-3xl mx-auto space-y-4 shadow-2xl">
            <span className="text-xs font-mono text-amber-400 tracking-widest uppercase font-bold block mb-4 border-b border-neutral-800 pb-2">
              [{activeTab.toUpperCase()} PHASE CHECKLIST]
            </span>
            {decisions[activeTab].map((q, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-sm text-neutral-200">
                <HelpCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="font-sans font-light leading-relaxed">{q}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: PHILOSOPHY & FINAL RESULT */}
        <section className="scroll-header p-8 sm:p-14 bg-gradient-to-b from-neutral-950/90 to-black/90 border border-amber-500/40 rounded-3xl text-center space-y-8 relative overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.1)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-xl mx-auto relative z-10">
            <span className="text-xs font-mono text-amber-400 tracking-[0.25em] uppercase font-bold">
              04 · OPERATING PRINCIPLE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              System Architecture First. <br />
              Code Second.
            </h2>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Software achieves maximum longevity when technical choices serve clear business logic rather than trendiness.
            </p>
          </div>

          <div className="pt-6 border-t border-neutral-800 flex flex-col items-center space-y-3 relative z-10">
            <div className="flex items-center space-x-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 font-mono text-xs">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping" />
              <span>SYSTEM READY FOR PRODUCTION</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Interactive Animated Ember / Gold Aurora Canvas Background
function EmberAuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle / Strand structure
    const strandCount = 18;
    let step = 0;

    const render = () => {
      step += 0.005;
      ctx.clearRect(0, 0, width, height);

      // Render glowing luminous amber waves
      for (let i = 0; i < strandCount; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1.5;

        const alpha = Math.sin(step + i * 0.3) * 0.15 + 0.25;
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, `rgba(245, 158, 11, 0)`);
        gradient.addColorStop(0.5, `rgba(251, 191, 36, ${alpha})`);
        gradient.addColorStop(1, `rgba(180, 83, 9, 0)`);

        ctx.strokeStyle = gradient;

        for (let x = 0; x < width; x += 20) {
          const y =
            height * 0.45 +
            Math.sin(x * 0.002 + step + i * 0.4) * 120 +
            Math.cos(x * 0.001 + step * 0.8) * 80 +
            i * 15;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
    />
  );
}