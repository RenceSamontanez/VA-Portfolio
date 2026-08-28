"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiMaximize2,
  FiGithub,
  FiExternalLink,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProjectImage {
  url: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  category: string;
  problem: string;
  approach: string;
  role: string;
  tags: string[];
  githubUrl: string;
  images: ProjectImage[];
}

const PROJECTS: Project[] = [
  // ... unchanged PROJECTS data ...
  {
    id: "solodev",
    name: "SOLODEV PLATFORM",
    category: "INTELLIGENT DEV TOOLS",
    problem:
      "Developers struggle with fragmented project tooling, slow handoffs, and manual environment setups, leading to wasted time and friction.",
    approach:
      "Built a modular dev automation suite: in-browser coding, AI-powered assistants (Beru), deployment pipelines, and unified doc/asset management — all connected in a single platform.",
    role: "Founder, Full-Stack Engineer, Product Designer",
    tags: ["Next.js", "Node.js", "OpenAI API", "Prisma", "PostgreSQL", "TailwindCSS"],
    githubUrl: "https://github.com/your-username/solodev-platform",
    images: [
      {
        url: "/images/SoloDev/SoloDev.jpg",
        description:
          "This is the landing page of SoloDev, a self-developing platform designed to help developers stay in flow, streamline workspace setup, and automate code reviews.",
      },
      {
        url: "/images/SoloDev/SoloDev1.jpg",
        description:
          "The interactive team workspace interface allowing real-time collaborative debugging, live terminal sessions, and automated cloud deployments.",
      },
      {
        url: "/images/SoloDev/SoloDev2.jpg",
        description:
          "AI Assistant (Beru) integration module providing instant code optimizations, pull request summaries, and context-aware recommendations.",
      },
    ],
  },
  // ... rest of PROJECTS
  {
    id: "solodev-ragnarok",
    name: "SOLODEV RAGNAROK",
    category: "GAME ARCHITECTURE",
    problem:
      "Legacy Ragnarok servers lacked modern web integration, automated reward distribution, and real-time telemetry.",
    approach:
      "Engineered a full-stack game management portal with automated payment webhooks, real-time player analytics, and automated event syncing.",
    role: "Full-Stack Architect & Game Systems Developer",
    tags: ["Next.js", "C++", "Node.js", "Webhooks", "PostgreSQL"],
    githubUrl: "https://github.com/your-username/solodev-ragnarok",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop",
        description:
          "The central dashboard displaying real-time concurrent server population analytics, economic metrics, and active player telemetry.",
      },
      {
        url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop",
        description:
          "In-game automated shop portal synced with payment webhooks for instant reward delivery without requiring server restarts.",
      },
      {
        url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1600&auto=format&fit=crop",
        description:
          "C++ engine telemetry interface handling automated event scheduling, anti-cheat detection logs, and automated database backups.",
      },
    ],
  },
  {
    id: "task-flow",
    name: "TASK FLOW",
    category: "PRODUCTIVITY APP",
    problem:
      "Teams tracked work across spreadsheets and chat threads, losing visibility on ownership and critical deadlines.",
    approach:
      "A task management engine combining structured Kanban boards with custom automation triggers and real-time usage analytics.",
    role: "Full-stack architecture, automation engine, analytics dashboard.",
    tags: ["Next.js", "PostgreSQL", "TailwindCSS", "Prisma"],
    githubUrl: "https://github.com/your-username/task-flow",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
        description:
          "Kanban workspace overview showing custom swimlanes, task status tags, and priority indicators designed for high-velocity teams.",
      },
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
        description:
          "Sprint analytics overview visualizing team velocity, task completion timelines, and bottleneck metrics.",
      },
      {
        url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop",
        description:
          "Automation rule editor allowing users to configure custom event triggers and webhooks without coding.",
      },
    ],
  },
  {
    id: "lp-furniture",
    name: "LP FURNITURE SHOP",
    category: "E-COMMERCE & 3D",
    problem:
      "Traditional online shoppers struggle to visualize furniture scales and material textures prior to purchasing.",
    approach:
      "Built an e-commerce platform with high-resolution image carousels, responsive checkout flows, and dynamic inventory management.",
    role: "Lead Web Developer & E-Commerce Specialist",
    tags: ["React", "Shopify API", "TailwindCSS", "Stripe"],
    githubUrl: "https://github.com/your-username/lp-furniture-shop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1600&auto=format&fit=crop",
        description:
          "Product catalog storefront displaying dynamic high-resolution material previews and responsive layout scaling.",
      },
      {
        url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop",
        description:
          "Interactive product viewer enabling 360-degree item rotation and real-time texture customizations.",
      },
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop",
        description:
          "Streamlined single-page checkout flow connected with Stripe payment processing and automated inventory updates.",
      },
    ],
  },
  {
    id: "wisp-ai",
    name: "WISP AI",
    category: "ARTIFICIAL INTELLIGENCE",
    problem:
      "Complex LLM workflows require intuitive prompt interfaces that manage context windows without overwhelming users.",
    approach:
      "Designed a light-speed AI assistant interface with context-aware auto-completion and seamless API streaming integrations.",
    role: "AI Integration & UI/UX Engineer",
    tags: ["Next.js", "OpenAI API", "LangChain", "Vercel AI SDK"],
    githubUrl: "https://github.com/your-username/wisp-ai",
    images: [
      {
        url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1600&auto=format&fit=crop",
        description:
          "Streaming chat interface displaying contextual multi-turn conversation threads and model parameter toggles.",
      },
      {
        url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop",
        description:
          "Prompt playground workspace enabling custom system prompt creation, temperature adjustments, and model evaluation.",
      },
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
        description:
          "Token usage dashboard and API latency tracking graph for monitoring real-time backend performance.",
      },
    ],
  },
  {
    id: "solox-music",
    name: "SOLOXMUSIC",
    category: "AUDIO STREAMING",
    problem:
      "Independent creators lack lightweight, low-latency audio sharing environments with custom web players.",
    approach:
      "Developed a custom Web Audio API platform with real-time waveform visualization, playlist management, and persistent playback across page transitions.",
    role: "Frontend Engineer & Audio UI Developer",
    tags: ["React", "Web Audio API", "GSAP", "TailwindCSS"],
    githubUrl: "https://github.com/your-username/soloxmusic",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop",
        description:
          "Persistent web audio player featuring dynamic canvas-rendered waveform visualizations and loss-audio playback controls.",
      },
      {
        url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop",
        description:
          "Artist upload portal allowing creators to configure track metadata, custom album artwork, and waveform preview markers.",
      },
      {
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
        description:
          "Community discovery feed highlighting trending independent track releases, playlists, and live stream sessions.",
      },
    ],
  },
  {
    id: "roblox-dragon-city",
    name: "ROBLOX ENVIRONMENT (DRAGON CITY)",
    category: "3D WORLD & METAVERSE",
    problem:
      "Massive Roblox environments often suffer performance drops due to unoptimized 3D assets and complex geometry.",
    approach:
      "Designed a custom-built 3D Dragon City environment with optimized level-of-detail (LOD) assets and dynamic terrain lighting.",
    role: "3D Environment Artist & Lua Programmer",
    tags: ["Roblox Studio", "Lua", "Blender", "3D Modeling"],
    githubUrl: "https://github.com/your-username/roblox-dragon-city",
    images: [
      {
        url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1600&auto=format&fit=crop",
        description:
          "Overview of the central Dragon City citadel architecture featuring custom lighting shaders and low-poly optimized meshes.",
      },
      {
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop",
        description:
          "Dynamic terrain rendering showpiece featuring custom Lua scripts managing day/night atmospheric transitions.",
      },
      {
        url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop",
        description:
          "In-game quest zone displaying particle effects, LOD asset streaming, and fast player traversal pathways.",
      },
    ],
  },
];

function WorkModal({
  modalData,
  modalImageIndex,
  setModalImageIndex,
  handleModalNext,
  handleModalPrev,
  handleCloseModal,
}: {
  modalData: {
    project: Project;
    initialImageIndex: number;
  } | null;
  modalImageIndex: number;
  setModalImageIndex: React.Dispatch<React.SetStateAction<number>>;
  handleModalNext: () => void;
  handleModalPrev: () => void;
  handleCloseModal: () => void;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !modalData) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={handleCloseModal}
    >
      <div
        className="relative max-w-5xl w-full bg-[#0d0d0d] border border-white/15 rounded-lg overflow-hidden flex flex-col max-h-[90vh] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/50">
          <span className="text-xs text-[#a1a1aa] tracking-widest font-mono uppercase">
            {modalData.project.name} — IMAGE {modalImageIndex + 1} OF{" "}
            {modalData.project.images.length}
          </span>
          <div className="flex items-center space-x-3">
            <a
              href={modalData.project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-xs text-[#a1a1aa] hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1 rounded transition-colors"
            >
              <FiGithub className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <button
              onClick={handleCloseModal}
              className="p-1 text-[#a1a1aa] hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Image Box */}
        <div className="relative w-full flex-1 bg-black min-h-[350px] max-h-[65vh] flex items-center justify-center p-4 group">
          <img
            src={modalData.project.images[modalImageIndex].url}
            alt={`${modalData.project.name} Image ${modalImageIndex + 1}`}
            className="max-w-full max-h-[58vh] object-contain rounded transition-all duration-300"
          />

          <button
            onClick={handleModalPrev}
            aria-label="Previous Photo"
            className="absolute left-4 p-3 bg-black/60 hover:bg-black text-white rounded-full border border-white/20 transition-all cursor-pointer hover:scale-110 active:scale-95 z-20"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleModalNext}
            aria-label="Next Photo"
            className="absolute right-4 p-3 bg-black/60 hover:bg-black text-white rounded-full border border-white/20 transition-all cursor-pointer hover:scale-110 active:scale-95 z-20"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
            {modalData.project.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setModalImageIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  idx === modalImageIndex
                    ? "w-6 bg-indigo-400"
                    : "w-1.5 bg-white/40 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Footer Description */}
        <div className="p-6 border-t border-white/10 bg-[#0d0d0d] space-y-2">
          <span className="text-[10px] text-[#818cf8] tracking-widest uppercase font-bold block font-mono">
            IMAGE DESCRIPTION
          </span>
          <p className="text-xs sm:text-sm font-sans text-[#e4e4e7] font-light leading-relaxed">
            {modalData.project.images[modalImageIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Lightbox State
  const [modalData, setModalData] = useState<{
    project: Project;
    initialImageIndex: number;
  } | null>(null);

  const [modalImageIndex, setModalImageIndex] = useState(0);

  useGSAP(
    () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          pinType: "fixed",
          pinSpacing: true,
          scrub: 0.5,
          start: "top top",
          end: () => `+=${(PROJECTS.length - 1) * window.innerWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * PROJECTS.length),
              PROJECTS.length - 1
            );
            setActiveIndex(index);
          },
        },
      });

      tl.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
      });

      scrollTriggerRef.current = tl.scrollTrigger || null;
    },
    { scope: containerRef }
  );

  const handleOpenModal = (project: Project, imgIndex: number) => {
    setModalData({ project, initialImageIndex: imgIndex });
    setModalImageIndex(imgIndex);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  const handleModalNext = () => {
    if (!modalData) return;
    setModalImageIndex((prev) =>
      prev === modalData.project.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleModalPrev = () => {
    if (!modalData) return;
    setModalImageIndex((prev) =>
      prev === 0 ? modalData.project.images.length - 1 : prev - 1
    );
  };

  const handleTabClick = (idx: number) => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    const progress = idx / (PROJECTS.length - 1);
    const targetScroll = trigger.start + progress * (trigger.end - trigger.start);

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalData) return;
      if (e.key === "Escape") handleCloseModal();
      if (e.key === "ArrowRight") handleModalNext();
      if (e.key === "ArrowLeft") handleModalPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalData]);

  return (
    <>
      <div ref={containerRef} className="w-full">
        <section
          id="work"
          className="relative w-full h-screen bg-black text-[#f5f5f7] font-mono overflow-hidden select-none border-t border-white/10 flex flex-col justify-between"
        >
          {/* Top Header */}
          <div className="w-full flex justify-between items-center px-6 sm:px-12 py-6 z-30 bg-gradient-to-b from-black via-black/80 to-transparent">
            <div className="flex items-center space-x-3">
              <span className="text-xs text-[#a1a1aa] tracking-widest uppercase">
                {PROJECTS[activeIndex].name} — {PROJECTS[activeIndex].category}
              </span>
            </div>

            <div className="flex items-center space-x-6 text-xs font-mono">
              <span className="text-white font-bold tracking-widest">03 WORK</span>
            </div>
          </div>

          {/* Horizontal Track View */}
          <div ref={trackRef} className="flex h-[75vh] w-max items-center z-20">
            {PROJECTS.map((project, projectIdx) => (
              <div
                key={project.id}
                className="w-screen h-full flex-shrink-0 flex flex-col justify-between px-6 sm:px-12"
              >
                <ProjectView
                  project={project}
                  projectIdx={projectIdx}
                  totalProjects={PROJECTS.length}
                  isActive={projectIdx === activeIndex}
                  onImageClick={(imgIdx) => handleOpenModal(project, imgIdx)}
                />
              </div>
            ))}
          </div>

          {/* Bottom Project Tabs */}
          <div className="flex items-center space-x-6 overflow-x-auto py-4 px-6 sm:px-12 z-30 border-t border-white/10 bg-black">
            {PROJECTS.map((project, idx) => (
              <button
                key={project.id}
                type="button"
                onClick={() => handleTabClick(idx)}
                className={`text-xs font-mono uppercase transition-colors whitespace-nowrap cursor-pointer ${
                  activeIndex === idx ? "text-[#818cf8] font-bold" : "text-[#71717a] hover:text-white"
                }`}
              >
                <span className="mr-2">0{idx + 1}</span>
                <span>{project.name}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Modal Render wrapped inside mounted check */}
      <WorkModal
        modalData={modalData}
        modalImageIndex={modalImageIndex}
        setModalImageIndex={setModalImageIndex}
        handleModalNext={handleModalNext}
        handleModalPrev={handleModalPrev}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

function ProjectView({
  project,
  projectIdx,
  totalProjects,
  isActive,
  onImageClick,
}: {
  project: Project;
  projectIdx: number;
  totalProjects: number;
  isActive: boolean;
  onImageClick: (imgIdx: number) => void;
}) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive, project.images.length]);

  const handleNextImage = () => {
    setImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="relative w-full h-[62%] overflow-hidden rounded border border-white/10 bg-black flex items-center justify-center group">
        {project.images.map((imgObj, idx) => (
          <img
            key={imgObj.url}
            src={imgObj.url}
            alt={`${project.name} Slide ${idx + 1}`}
            onClick={() => onImageClick(imageIndex)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out cursor-pointer ${
              idx === imageIndex
                ? "opacity-100 scale-100 group-hover:scale-[1.02]"
                : "opacity-0 scale-105"
            }`}
          />
        ))}

        <div
          onClick={() => onImageClick(imageIndex)}
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer pointer-events-none"
        >
          <div className="bg-black/70 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full border border-white/20 flex items-center space-x-2">
            <FiMaximize2 className="w-3.5 h-3.5" />
            <span>Click to Expand</span>
          </div>
        </div>

        <div className="absolute inset-x-6 bottom-6 flex justify-between items-center z-10 pointer-events-auto">
          <div className="flex items-center space-x-2 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            {project.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setImageIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  idx === imageIndex ? "w-8 bg-white" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="p-2.5 bg-black/70 hover:bg-black text-white rounded backdrop-blur-md border border-white/20 transition-all cursor-pointer active:scale-95 flex items-center space-x-1"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <button
              onClick={handlePrevImage}
              aria-label="Previous Image"
              className="p-2.5 bg-black/70 hover:bg-black text-white rounded backdrop-blur-md border border-white/20 transition-all cursor-pointer active:scale-95"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Next Image"
              className="p-2.5 bg-black/70 hover:bg-black text-white rounded backdrop-blur-md border border-white/20 transition-all cursor-pointer active:scale-95"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 space-y-4">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white uppercase">
              {project.name}
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 border border-white/15 text-[#818cf8] uppercase tracking-wider font-mono">
              {project.category}
            </span>
          </div>

          <span className="text-xs text-[#71717a] font-mono">
            0{projectIdx + 1} / 0{totalProjects}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-1.5">
            <span className="text-xs text-[#a1a1aa] tracking-widest uppercase font-bold">
              PROBLEM
            </span>
            <p className="text-xs sm:text-sm font-sans text-[#e4e4e7] font-light leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs text-[#a1a1aa] tracking-widest uppercase font-bold">
              APPROACH
            </span>
            <p className="text-xs sm:text-sm font-sans text-[#e4e4e7] font-light leading-relaxed">
              {project.approach}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#a1a1aa] tracking-widest uppercase font-bold">
                ROLE
              </span>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-[#818cf8] hover:underline"
              >
                <FiGithub className="w-3.5 h-3.5" />
                <span>View Source</span>
                <FiExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-xs sm:text-sm font-sans text-[#e4e4e7] font-light leading-relaxed">
              {project.role}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[10px] bg-white/5 border border-white/15 rounded text-[#a1a1aa] font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}