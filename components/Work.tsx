"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  problem: string;   // Used for "Project description"
  approach: string;  // Used for "Skills and deliverables" or project features/overview
  role: string;
  tags: string[];
  githubUrl: string;
  images: ProjectImage[];
}

// Updated Projects
const PROJECTS: Project[] = [
  {
    id: "lp-furniture-shop",
    name: "LP Furniture Shop",
    category: "E-COMMERCE WEB SYSTEM",
    problem:
      "LP Furniture shop is a web system that offers furniture 100% made of woods, improving the business process by automating repetitive tasks and innovating AI to enhance design work. It helps future homeowners customize their house experience with luxurious furniture.",
    approach:
      "Skills and deliverables:\n- Laravel\n- React Bootstrap\n- AI Chatbot\n- AI Image Generator\n- AI Content Detection",
    role: "FULL STACK WEB SYSTEM DEVELOPER",
    tags: [
      "Laravel",
      "React Bootstrap",
      "AI Chatbot",
      "AI Image Generator",
      "AI Content Detection",
    ],
    githubUrl: "#", // replace with a real link if available
    images: [
      {
        url: "/images/LP Furniture shop/LP.jpg",
        description: "Showcase banner or main visual for LP Furniture Shop.",
      },
      {
        url: "/images/LP Furniture shop/LP1.jpg",
        description: "Main landing page for LP Furniture Shop with a showcase of bespoke wooden furniture and seamless filtering experience.",
      },
      {
        url: "/images/LP Furniture shop/LP2.jpg",
        description: "Showcasing the AI-powered custom design suggestion tool for enhanced user personalization.",
      },
      {
        url: "/images/LP Furniture shop/LP3.jpg",
        description: "Management dashboard featuring automation of admin, inventory, and business analytics.",
      },
      {
        url: "/images/LP Furniture shop/LP4.jpg",
        description: "Gallery of completed custom furniture and satisfied clients.",
      },
    ],
  },

  {
    id: "admin-management-system",
    name: "Admin Management System",
    category: "BUSINESS ADMINISTRATION SUITE",
    problem:
      "A full system management solution that includes an Inventory System, Customer Identity Verification, Chatbot AI trainer, Installment follow-up Automation, Customized AI Furniture idea handler, Monthly Revenue tracking and more.",
    approach:
      "Skills and deliverables:\n- Laravel\n- Database\n- Google Charts\n- Google Analytics\n- Machine Learning",
    role: "FULL STACK DEVELOPER",
    tags: [
      "Laravel",
      "Database",
      "Google Charts",
      "Google Analytics",
      "Machine Learning",
    ],
    githubUrl: "#", // replace with a real link if available
    images: [
      {
        url: "/images/LP Admin side/Admin.jpg",
        description: "Main admin dashboard showcasing key business operations and navigation.",
      },
      {
        url: "/images/LP Admin side/Admin1.jpg",
        description: "Inventory management panel detailing product tracking and stock levels.",
      },
      {
        url: "/images/LP Admin side/Admin2.jpg",
        description: "Customer identity verification interface with enhanced security workflows.",
      },
      {
        url: "/images/LP Admin side/Admin3.jpg",
        description: "AI chatbot training module for custom furniture inquiries and support.",
      },
      {
        url: "/images/LP Admin side/Admin4.jpg",
        description: "Automated installment follow-up dashboard and client communication tools.",
      },
      {
        url: "/images/LP Admin side/Admin5.jpg",
        description: "Business analytics and revenue tracking with visual charts and reports.",
      },
    ],
  },

  {
    id: "flow-desk",
    name: "Flow Desk",
    category: "ENTERPRISE SAAS",
    problem:
      "FlowDesk is a unified enterprise management SaaS integrating CRM & Sales pipelines, Fulfillment Operations, Multi-warehouse Inventory tracking, and Automated Finance & Billing for high-growth teams.",
    approach:
      "Skills and deliverables:\n- Next.js\n- TypeScript\n- Tailwind CSS\n- SaaS Development\n- Enterprise Systems Engineering",
    role: "Full Stack Developer",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "SaaS Development",
      "Enterprise Systems Engineering",
    ],
    githubUrl: "#", // replace with a real link if available
    images: [
      {
        url: "/images/FlowDesk/FD.jpg",
        description: "Main FlowDesk dashboard overview, integrating CRM, Operations, Inventory, and Financial tools in a unified workspace.",
      },
      {
        url: "/images/FlowDesk/FD1.jpg",
        description: "CRM pipeline view with detailed lead tracking and sales conversion analytics.",
      },
      {
        url: "/images/FlowDesk/FD2.jpg",
        description: "Inventory tracking interface, showing real-time multi-warehouse stock and restock recommendations.",
      },
      {
        url: "/images/FlowDesk/FD3.jpg",
        description: "Automated finance module featuring invoice generation and streamlined billing operations.",
      },
      {
        url: "/images/FlowDesk/FD4.jpg",
        description: "Fulfillment process panel coordinating order, shipment, and delivery tasks for enterprise teams.",
      },
      {
        url: "/images/FlowDesk/FD5.jpg",
        description: "Advanced business analytics with revenue trends, team performance metrics, and key operational KPIs.",
      },
      {
        url: "/images/FlowDesk/FD6.jpg",
        description: "User management and role permissions dashboard for secure team collaboration and SaaS administration.",
      },
    ],
  },

  {
    id: "lumiere-resort",
    name: "Lumiere Resort",
    category: "HOSPITALITY / LUXURY DIGITAL EXPERIENCE",
    problem:
      "Lumière Resort is an ultra-luxury oceanfront web application and digital landing experience for high-end hospitality brands, combining scroll-driven storytelling, cinematic media, and interactive booking tools.",
    approach:
      "Project Overview: The project delivers a fluid, multi-sensory user experience transitioning from cinematic video landing states through interactive service showcases to full accommodation booking workflows.\nSkills and deliverables:\n- Motion Design\n- Next.js\n- React\n- API Integration",
    role: "Full Stack Developer",
    tags: [
      "Motion Design",
      "Next.js",
      "React",
      "API Integration",
    ],
    githubUrl: "#", // replace with a real link if available
    images: [
      {
        url: "/images/Lumiere Resort/LM.jpg",
        description: "Main landing page showcasing cinematic oceanfront video, immersive transitions, and luxury resort branding.",
      },
      {
        url: "/images/Lumiere Resort/LM1.jpg",
        description: "Interactive booking interface with dynamic room and amenity selection.",
      },
      {
        url: "/images/Lumiere Resort/LM2.jpg",
        description: "Service highlights carousel, immersing guests in the luxury experience.",
      },
      {
        url: "/images/Lumiere Resort/LM3.jpg",
        description: "Full-width gallery of accommodation interiors and ocean views.",
      },
      {
        url: "/images/Lumiere Resort/LM4.jpg",
        description: "Integrated hospitality services overview with real-time availability.",
      },
      {
        url: "/images/Lumiere Resort/LM5.jpg",
        description: "Mobile-responsive design ensuring a seamless experience on all devices.",
      },
      {
        url: "/images/Lumiere Resort/LM6.jpg",
        description: "Personalized guest dashboard for itinerary and exclusive offers.",
      },
    ],
  },

  {
    id: "soloxmusic",
    name: "SoloXMusic",
    category: "MUSIC APP",
    problem:
      "SoloXMusic is a music app that replaces conventional Android music applications, delivers a fully customizable user experience, no ads, and supports cloud browsing for music.",
    approach:
      "Skills and deliverables:\n- Google Cloud Platform\n- React Native\n- Tailwind UI\n- JSON\n- Multimedia Development",
    role: "FULLSTACK DEVELOPER ( OWNER )",
    tags: [
      "Google Cloud Platform",
      "React Native",
      "Tailwind UI",
      "JSON",
      "Multimedia Development",
    ],
    githubUrl: "#", // replace with a real link if available
    images: [
      {
        url: "/images/SoloXMusic/SXM.jfif",
        description: "App splash screen and SoloXMusic branding.",
      },
      {
        url: "/images/SoloXMusic/SXM1.jfif",
        description: "Home screen with cloud-based music discovery and custom playlists.",
      },
      {
        url: "/images/SoloXMusic/SXM2.jfif",
        description: "Music playing screen with intuitive interactive audio controls.",
      },
      {
        url: "/images/SoloXMusic/SXM3.jfif",
        description: "Custom theme engine allowing users to personalize their listening environment.",
      },
      {
        url: "/images/SoloXMusic/SXM4.jfif",
        description: "Search and browse interface for exploring new tracks and albums.",
      },
      {
        url: "/images/SoloXMusic/SXM5.jfif",
        description: "User library featuring favorites, playlists, and downloaded songs.",
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

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200"
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
            src={modalData.project.images[modalImageIndex]?.url}
            alt={`${modalData.project.name} Image ${modalImageIndex + 1}`}
            className="max-w-full max-h-[58vh] object-contain rounded transition-all duration-300"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleModalPrev();
            }}
            aria-label="Previous Photo"
            className="absolute left-4 p-3 bg-black/60 hover:bg-black text-white rounded-full border border-white/20 transition-all cursor-pointer hover:scale-110 active:scale-95 z-20"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleModalNext();
            }}
            aria-label="Next Photo"
            className="absolute right-4 p-3 bg-black/60 hover:bg-black text-white rounded-full border border-white/20 transition-all cursor-pointer hover:scale-110 active:scale-95 z-20"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 z-20">
            {modalData.project.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setModalImageIndex(idx);
                }}
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
            {modalData.project.images[modalImageIndex]?.description}
          </p>
        </div>
      </div>
    </div>,
    document.body
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
                {PROJECTS[activeIndex]?.name} — {PROJECTS[activeIndex]?.category}
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

      {/* Modal Render via React Portal */}
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
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer pointer-events-auto z-10"
        >
          <div className="bg-black/70 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full border border-white/20 flex items-center space-x-2">
            <FiMaximize2 className="w-3.5 h-3.5" />
            <span>Click to Expand</span>
          </div>
        </div>

        <div className="absolute inset-x-6 bottom-6 flex justify-between items-center z-20 pointer-events-auto">
          <div className="flex items-center space-x-2 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            {project.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setImageIndex(idx);
                }}
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
              onClick={(e) => e.stopPropagation()}
              aria-label="GitHub Repository"
              className="p-2.5 bg-black/70 hover:bg-black text-white rounded backdrop-blur-md border border-white/20 transition-all cursor-pointer active:scale-95 flex items-center space-x-1"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              aria-label="Previous Image"
              className="p-2.5 bg-black/70 hover:bg-black text-white rounded backdrop-blur-md border border-white/20 transition-all cursor-pointer active:scale-95"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
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
              PROJECT DESCRIPTION
            </span>
            <p className="text-xs sm:text-sm font-sans text-[#e4e4e7] font-light leading-relaxed whitespace-pre-line">
              {project.problem}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs text-[#a1a1aa] tracking-widest uppercase font-bold">
              SKILLS AND DELIVERABLES
            </span>
            <p className="text-xs sm:text-sm font-sans text-[#e4e4e7] font-light leading-relaxed whitespace-pre-line">
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