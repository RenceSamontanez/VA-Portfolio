"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiShare2,
  FiLayers,
  FiCpu,
  FiCode,
  FiTerminal,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface VisualSample {
  type: "diagram" | "preview" | "code";
  title: string;
  subtitle: string;
  diagramSteps?: { label: string; sub: string }[];
  codeSnippet?: string;
}

interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  techStack: string[];
  deliverables: string[];
  sample: VisualSample;
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "web-dev",
    number: "01",
    title: "WEB DEVELOPMENT",
    shortDesc: "Full-stack applications built to be maintained for years, not just demoed once.",
    fullDesc:
      "Engineered with modern Next.js App Router architecture, zero-friction hydration, server actions, and type-safe backend integrations designed for maximum scalability.",
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    deliverables: [
      "Custom Server-Side Rendered Applications",
      "Type-safe REST & GraphQL APIs",
      "Database Schema & ORM Infrastructure",
      "Edge-Deployed Infrastructure on Vercel/AWS",
    ],
    sample: {
      type: "diagram",
      title: "APPLICATION ARCHITECTURE PIPELINE",
      subtitle: "High-concurrency data flow & edge caching model",
      diagramSteps: [
        { label: "Client Request", sub: "Edge Runtime / CDN" },
        { label: "Server Action", sub: "Type-Safe Validation" },
        { label: "Prisma ORM", sub: "PostgreSQL Pooling" },
        { label: "Hydrated UI", sub: "Sub-100ms LCP" },
      ],
    },
  },
  {
    id: "ui-ux",
    number: "02",
    title: "UI/UX IMPLEMENTATION",
    shortDesc: "Transforming design mockups into high-fps interactive digital experiences.",
    fullDesc:
      "Fluid scroll-driven interfaces, 3D WebGL scenes, micro-interactions, and accessibility-compliant design systems that captivate users without compromising performance.",
    techStack: ["GSAP", "TailwindCSS", "Framer Motion", "Three.js", "Figma"],
    deliverables: [
      "GSAP ScrollTrigger Interactive Timelines",
      "Design System Component Libraries",
      "Responsive & Mobile-First Layouts",
      "60FPS Canvas Animations & WebGL Shaders",
    ],
    sample: {
      type: "diagram",
      title: "CREATIVE ANIMATION RUNTIME",
      subtitle: "Hardware-accelerated render pipeline",
      diagramSteps: [
        { label: "Figma Tokens", sub: "Tailwind Classes" },
        { label: "GSAP Context", sub: "DOM Ref Batching" },
        { label: "GPU Composite", sub: "Transform Offloading" },
        { label: "Smooth 60FPS", sub: "Zero Layout Shifts" },
      ],
    },
  },
  {
    id: "ai-integrations",
    number: "03",
    title: "AI INTEGRATIONS",
    shortDesc: "Embedding modern LLMs and real-time streaming tools directly into web workflows.",
    fullDesc:
      "Custom RAG (Retrieval-Augmented Generation) systems, vector database embeddings, function calling agents, and streaming UI pipelines tailored for domain-specific automation.",
    techStack: ["OpenAI API", "Vercel AI SDK", "LangChain", "Pinecone", "Python"],
    deliverables: [
      "Real-Time Streaming UI Interfaces",
      "Custom RAG Systems on Private Knowledge Bases",
      "Vector Embeddings & Semantic Search Tools",
      "Autonomous AI Function-Calling Agents",
    ],
    sample: {
      type: "diagram",
      title: "RAG & VECTOR SEARCH WORKFLOW",
      subtitle: "Contextual prompt injection & streaming response",
      diagramSteps: [
        { label: "User Prompt", sub: "Context Capture" },
        { label: "Pinecone DB", sub: "Vector Embeddings" },
        { label: "OpenAI LLM", sub: "Context Injection" },
        { label: "Stream UI", sub: "Token Chunking" },
      ],
    },
  },
  {
    id: "business-automation",
    number: "04",
    title: "BUSINESS AUTOMATION",
    shortDesc: "Automated daily content pipelines, multi-platform posting, and webhook workflows.",
    fullDesc:
      "Eliminate repetitive tasks with custom automated pipelines—from scheduling and processing daily social media content to syncing multi-platform API webhooks in the background.",
    techStack: ["Node.js", "Webhooks", "Redis", "Cron Jobs", "Python", "REST APIs"],
    deliverables: [
      "Daily Automated Social Media Posting Engines",
      "Webhook Engine & Data Normalization",
      "Scheduled Task Workers & Queue Processing",
      "Multi-Service Analytics Aggregation",
    ],
    sample: {
      type: "diagram",
      title: "DAILY CONTENT AUTO-PUBLISH PIPELINE",
      subtitle: "Autonomous daily social media scheduling & dispatch",
      diagramSteps: [
        { label: "Cron Schedule", sub: "Daily Trigger at 09:00" },
        { label: "Asset Generator", sub: "AI Text/Image Assembly" },
        { label: "Queue Worker", sub: "Redis / BullMQ Processing" },
        { label: "API Dispatch", sub: "X, LinkedIn & YouTube" },
      ],
    },
  },
  {
    id: "backend-systems",
    number: "05",
    title: "BACKEND SYSTEMS",
    shortDesc: "Low-latency microservices, telemetry backends, and game infrastructure.",
    fullDesc:
      "Reliable backend services designed to process high-throughput events, WebSockets connection pools, real-time analytics streaming, and custom game server integrations.",
    techStack: ["Node.js", "C++", "Lua", "WebSockets", "Redis", "Express"],
    deliverables: [
      "Real-time WebSocket Push Services",
      "Telemetry & Event Logging Engines",
      "Game Server State Management Portals",
      "Microservice Distributed Architectures",
    ],
    sample: {
      type: "diagram",
      title: "REAL-TIME TELEMETRY SYSTEM",
      subtitle: "High-throughput event streaming architecture",
      diagramSteps: [
        { label: "Client Telemetry", sub: "WebSocket Gateway" },
        { label: "Redis Pub/Sub", sub: "In-Memory Queue" },
        { label: "Worker Process", sub: "Aggregation & Audit" },
        { label: "Dashboard", sub: "Sub-Second Updates" },
      ],
    },
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const activeService = SERVICES_DATA[selectedIndex];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      ScrollTrigger.refresh();

      gsap.fromTo(
        ".services-section-header",
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
        ".services-list-container",
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

  // Animate right-side content when active item changes
  const handleSelectService = (index: number) => {
    if (index === selectedIndex) return;

    if (detailRef.current) {
      gsap.to(detailRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => {
          setSelectedIndex(index);
          gsap.to(detailRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0a0a0a] text-[#f5f5f7] font-mono py-24 px-6 sm:px-12 border-t border-white/10 overflow-hidden"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Top Header */}
        <div className="services-section-header space-y-2 border-b border-white/10 pb-6">
          <span className="text-xs text-[#818cf8] font-bold tracking-widest uppercase">
            WHAT I CAN BUILD FOR YOU
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            SERVICES
          </h2>
        </div>

        {/* Split Section: Left List, Right Dynamic Detail View */}
        <div className="services-list-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Numbered Service List */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-white/10 border-y border-white/10">
            {SERVICES_DATA.map((service, idx) => {
              const isSelected = selectedIndex === idx;

              return (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(idx)}
                  className={`group w-full py-5 px-3 flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-white/5 border-l-2 border-[#818cf8] pl-5 text-white"
                      : "text-[#71717a] hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span
                      className={`text-xs font-mono transition-colors ${
                        isSelected ? "text-[#818cf8]" : "text-[#52525b] group-hover:text-[#a1a1aa]"
                      }`}
                    >
                      {service.number}
                    </span>
                    <span
                      className={`text-base sm:text-lg font-bold tracking-wider transition-colors ${
                        isSelected ? "text-white" : "text-[#818cf8]/70 group-hover:text-white"
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>

                  <FiArrowUpRight
                    className={`w-4 h-4 transition-all duration-200 ${
                      isSelected
                        ? "text-[#818cf8] opacity-100 translate-x-0 translate-y-0"
                        : "opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Side: Detailed Breakdown & Workflow Sample */}
          <div className="lg:col-span-7" ref={detailRef}>
            <div className="bg-[#0f0f11] border border-white/10 rounded-xl p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden">
              {/* Top Meta Header */}
              <div className="space-y-4 border-b border-white/10 pb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#818cf8] font-mono tracking-wider">
                    SERVICE {activeService.number} // OVERVIEW
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#818cf8] animate-pulse" />
                    <span className="text-[10px] text-[#a1a1aa] uppercase tracking-wider">
                      AVAILABLE FOR HIRE
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeService.title}
                </h3>

                <p className="text-sm font-sans text-[#e4e4e7] font-light leading-relaxed">
                  {activeService.shortDesc}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeService.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[#a1a1aa] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Extended Explanation */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase text-[#a1a1aa] tracking-widest font-bold">
                  Description
                </h4>
                <p className="text-xs sm:text-sm font-sans text-[#a1a1aa] leading-relaxed font-light">
                  {activeService.fullDesc}
                </p>
              </div>

              {/* Sample Work Workflow Diagram */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <FiShare2 className="w-4 h-4 text-[#818cf8]" />
                  <h4 className="text-xs uppercase text-[#a1a1aa] tracking-widest font-bold">
                    EXAMPLE WORKFLOW DIAGRAM
                  </h4>
                </div>

                <div className="bg-[#050505] border border-white/10 rounded-lg p-5 space-y-4">
                  <div className="border-b border-white/5 pb-2">
                    <p className="text-xs font-bold text-white tracking-wider">
                      {activeService.sample.title}
                    </p>
                    <p className="text-[11px] font-sans text-[#71717a]">
                      {activeService.sample.subtitle}
                    </p>
                  </div>

                  {/* Dynamic Workflow Node Map */}
                  {activeService.sample.diagramSteps && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative">
                      {activeService.sample.diagramSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-white/[0.03] border border-white/10 rounded p-3 flex flex-col justify-between space-y-2 relative"
                        >
                          <span className="text-[9px] text-[#818cf8] font-bold">
                            STEP 0{sIdx + 1}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-white">{step.label}</p>
                            <p className="text-[10px] font-sans text-[#71717a]">
                              {step.sub}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Key Deliverables Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase text-[#a1a1aa] tracking-widest font-bold">
                  WHAT YOU RECEIVE
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center space-x-2.5 text-xs font-sans text-[#d4d4d8] bg-white/[0.02] p-2.5 rounded border border-white/5"
                    >
                      <FiCheckCircle className="w-3.5 h-3.5 text-[#818cf8] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}