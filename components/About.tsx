"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiCode,
  FiFigma,
  FiCpu,
  FiMessageSquare,
  FiTool,
  FiCheck,
} from "react-icons/fi";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

gsap.registerPlugin(useGSAP);

const STAT_ITEMS = [
  { value: "10+", label: "HAPPY CLIENTS" },
  { value: "15+", label: "PROJECTS COMPLETED" },
  { value: "5+ YRS", label: "FREELANCING EXP." },
  { value: "LIPA CITY", label: "LOCATION (BATANGAS, PH)" },
  { value: "BS IT", label: "EDUCATION (4TH YEAR PAUSED)" },
];

const SKILLS_CARDS = [
  {
    icon: <FiCode className="w-5 h-5 text-violet" />,
    title: "Web Development",
    desc: "Building responsive, high-performance web systems using Next.js, React, and robust APIs.",
  },
  {
    icon: <FiFigma className="w-5 h-5 text-violet" />,
    title: "UI/UX Design",
    desc: "Designing clean, modern, and accessible user interfaces optimized for conversion and engagement.",
  },
  {
    icon: <FiCpu className="w-5 h-5 text-violet" />,
    title: "AI & Automation",
    desc: "Architecting smart workflows with OpenAI APIs, n8n, and custom backend automation logic.",
  },
  {
    icon: <FiMessageSquare className="w-5 h-5 text-violet" />,
    title: "Communication Proficiency",
    desc: "Clear, transparent client relations, active listening, and technical documentation.",
  },
  {
    icon: <FiTool className="w-5 h-5 text-violet" />,
    title: "Problem Solving",
    desc: "Deconstructing complex system bottlenecks into efficient, scalable software solutions.",
  },
];

const JOURNEY_STEPS = [
  {
    year: "2018 - 2020",
    role: "MC Café",
    detail: "Staff → Manager",
    description:
      "My first professional experience, where I learned responsibility, customer service, communication, and how to handle real-world problems.",
  },
  {
    year: "2020 - 2024",
    role: "Freelancer",
    detail: "Digital Services & Development",
    description:
      "Started freelancing and working with different digital services, gradually moving from simple client work toward building software and digital systems.",
  },
  {
    year: "2024",
    role: "SoloDEV",
    detail: "First Software Venture",
    description:
      "Started SoloDEV as my first serious software project during university, exploring full-stack development, product design, and building systems from the ground up.",
  },
  {
    year: "2024 - 2025",
    role: "SoloDEV Ragnarok",
    detail: "Systems, AI & Beru",
    description:
      "Remodeled SoloDEV into a larger system and introduced Beru, an AI assistant designed to make the platform more intelligent and interactive.",
  },
  {
    year: "2025",
    role: "AI Applications",
    detail: "TaskFlow & Image Wisp",
    description:
      "Expanded into AI-powered applications, including TaskFlow for AI-assisted productivity and Image Wisp for intelligent image understanding using Gemini.",
  },
  {
    year: "2025",
    role: "LP Furniture Shop",
    detail: "Award-Winning Capstone",
    description:
      "Built an integrated furniture ordering and management platform featuring AI-generated design suggestions. The project received an award for being Most Innovative.",
  },
  {
    year: "2025",
    role: "Certifications",
    detail: "Google Analytics & PM",
    description:
      "Strengthened my technical foundation with professional certifications in data analytics and project management.",
  },
  {
    year: "2025 - 2026",
    role: "SoloX Music",
    detail: "Mobile Product Design",
    description:
      "Built SoloX Music, a mobile music experience focused on customization, an ad-free environment, and rethinking how users interact with their music.",
  },
  {
    year: "2026",
    role: "AI Automation",
    detail: "Solving Real Problems",
    description:
      "Shifted my focus toward AI automation, communication systems, and workflow engineering — learning how technology can solve repetitive real-world business problems.",
  },
  {
    year: "NOW",
    role: "Building What's Next",
    detail: "AI • Automation • Software",
    description:
      "Continuing to build, experiment, and look for meaningful problems where technology can create smarter and more innovative solutions.",
  },
];

const SOCIAL_LINKS = [
  { name: "Facebook", icon: <FaFacebook />, url: "https://www.facebook.com/rence.samontanez.7/" },
  { name: "Twitter", icon: <FaTwitter />, url: "https://x.com/SamontanezRence" },
  { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/rensuru" },
  { name: "Telegram", icon: <FaTelegram />, url: "https://t.me/SoloXRence" },
  { name: "WhatsApp", icon: <FaWhatsapp />, url: "https://wa.me/639451031206?text=Hi%21%20I%20want%20to%20inquire" },
  { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/fushigurotojing/" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const journeyContainerRef = useRef<HTMLDivElement>(null);
  const travelerDotRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);

  // Chevron click handler for skills
  const scrollSkills = (direction: "left" | "right") => {
    if (!skillsContainerRef.current) return;
    const scrollAmount = direction === "left" ? -320 : 320;
    skillsContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // GSAP animation for traveler dot along the timeline with a hopping arc
  const animateDotToStep = (index: number) => {
    setActiveStep(index);
    if (!journeyContainerRef.current || !travelerDotRef.current) return;

    const stepElements = journeyContainerRef.current.querySelectorAll(".journey-step-node");
    const targetNode = stepElements[index] as HTMLElement;

    if (targetNode) {
      const containerLeft = journeyContainerRef.current.getBoundingClientRect().left;
      const nodeLeft = targetNode.getBoundingClientRect().left;
      const scrollLeft = journeyContainerRef.current.scrollLeft;

      const relativeX = nodeLeft - containerLeft + scrollLeft + targetNode.offsetWidth / 2 - 12;

      gsap.to(travelerDotRef.current, {
        x: relativeX,
        duration: 0.45,
        ease: "power2.out",
      });

      gsap.timeline()
        .to(travelerDotRef.current, { y: -8, duration: 0.2, ease: "power2.out" })
        .to(travelerDotRef.current, { y: 0, duration: 0.25, ease: "bounce.out" });
    }
  };

  // 1. Mouse Wheel Horizontal Scroll Listener
  useEffect(() => {
    const attachHoverScroll = (element: HTMLElement | null) => {
      if (!element) return;

      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          element.scrollBy({
            left: e.deltaY > 0 ? 150 : -150,
            behavior: "smooth",
          });
        }
      };

      element.addEventListener("wheel", handleWheel, { passive: false });
      return () => element.removeEventListener("wheel", handleWheel);
    };

    const cleanupSkills = attachHoverScroll(skillsContainerRef.current);
    const cleanupJourney = attachHoverScroll(journeyContainerRef.current);

    return () => {
      if (cleanupSkills) cleanupSkills();
      if (cleanupJourney) cleanupJourney();
    };
  }, []);

  // 2. Auto-scroll logic for SKILLS section
  useEffect(() => {
    const el = skillsContainerRef.current;
    if (!el) return;

    let isHovered = false;
    const handleMouseEnter = () => (isHovered = true);
    const handleMouseLeave = () => (isHovered = false);

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    const interval = setInterval(() => {
      if (isHovered) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 280, behavior: "smooth" });
      }
    }, 3500);

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // 3. Auto-scroll logic for JOURNEY timeline section
  useEffect(() => {
    const el = journeyContainerRef.current;
    if (!el) return;

    let isHovered = false;
    const handleMouseEnter = () => (isHovered = true);
    const handleMouseLeave = () => (isHovered = false);

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    const interval = setInterval(() => {
      if (isHovered) return;
      setActiveStep((prevStep) => {
        const nextStep = (prevStep + 1) % JOURNEY_STEPS.length;
        animateDotToStep(nextStep);

        const stepElements = el.querySelectorAll(".journey-step-node");
        const nextNode = stepElements[nextStep] as HTMLElement;
        if (nextNode) {
          const scrollTarget = nextNode.offsetLeft - el.clientWidth / 2 + nextNode.offsetWidth / 2;
          el.scrollTo({ left: Math.max(0, scrollTarget), behavior: "smooth" });
        }
        return nextStep;
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useGSAP(
    () => {
      animateDotToStep(0);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-void text-bone py-16 px-4 sm:px-8 lg:px-14 border-b border-hairline font-mono select-none"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-xs text-ash tracking-[0.25em] mb-10">
        <span>02 · ABOUT ME</span>
        <span>STATUS: OPEN FOR OPPORTUNITIES</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Portrait & Stats */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div className="relative w-full aspect-[4/5] bg-obsidian border border-hairline rounded-lg overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent z-10 opacity-80" />
            <div className="absolute bottom-4 left-4 z-20 font-space text-lg text-bone italic font-light">
              Rence Samontañez
            </div>
            <img
              src="/images/Profile/RENSUKOT.jpg"
         alt="Portrait of Rence Samontañez"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
      
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 p-4 bg-obsidian border border-hairline rounded-lg text-xs">
            {STAT_ITEMS.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-violet font-space font-semibold text-sm sm:text-base">
                  {item.value}
                </div>
                <div className="text-[9px] text-ash tracking-wider uppercase leading-tight">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-4">
            <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-medium text-bone leading-snug">
              Building Solutions. <br />
              Creating <span className="text-violet italic">Impact.</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-ash/90 leading-relaxed max-w-2xl font-light">
              Hi, I’m Rence — a developer, designer, and problem solver. I help businesses and entrepreneurs bring their ideas to life through modern websites, automation, and AI-powered solutions that drive real results.
            </p>
          </div>

          {/* WHAT I DO BEST */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-ash tracking-widest uppercase">
                WHAT I DO BEST
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => scrollSkills("left")}
                  className="p-2 border border-hairline bg-obsidian hover:border-violet text-bone transition-colors rounded-full"
                  aria-label="Previous Skill"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollSkills("right")}
                  className="p-2 border border-hairline bg-obsidian hover:border-violet text-bone transition-colors rounded-full"
                  aria-label="Next Skill"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={skillsContainerRef}
              className="flex space-x-4 overflow-x-auto no-scrollbar scroll-smooth py-2 cursor-grab active:cursor-grabbing"
            >
              {SKILLS_CARDS.map((card, idx) => (
                <div
                  key={idx}
                  className="shrink-0 w-64 sm:w-72 p-5 bg-obsidian border border-hairline hover:border-violet/50 transition-colors rounded-lg flex flex-col justify-between space-y-3"
                >
                  <div className="p-2 bg-void border border-hairline rounded-md w-fit">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-bone mb-1 font-space">
                      {card.title}
                    </h3>
                    <p className="text-xs text-ash/80 font-sans leading-relaxed font-light">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MY JOURNEY SO FAR */}
          <div className="space-y-4 pt-4 border-t border-hairline">
            <div className="flex items-center justify-between">
              <span className="text-xs text-ash tracking-widest uppercase block">
                MY JOURNEY SO FAR
              </span>
              <span className="text-[10px] text-ash/60">HOVER / SCROLL TO EXPLORE</span>
            </div>

            <div
              ref={journeyContainerRef}
              className="relative w-full overflow-x-auto no-scrollbar py-8 cursor-grab active:cursor-grabbing"
            >
              {/* Animated Hopping Ring Indicator */}
              <div
                ref={travelerDotRef}
                className="absolute top-[29px] left-0 w-6 h-6 rounded-full border-2 border-violet bg-void/80 shadow-[0_0_12px_#a855f7] z-20 pointer-events-none flex items-center justify-center"
              >
                <div className="w-2 h-2 rounded-full bg-violet" />
              </div>

              {/* Inner Wrapper containing full length line + nodes */}
              <div className="relative flex space-x-6 min-w-max px-4">
                <div className="absolute top-[12px] left-0 right-0 h-[1px] bg-hairline z-0" />

                {JOURNEY_STEPS.map((step, idx) => {
                  const isCompleted = idx <= activeStep;
                  const isActive = idx === activeStep;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => animateDotToStep(idx)}
                      onClick={() => animateDotToStep(idx)}
                      className="journey-step-node w-56 shrink-0 flex flex-col items-center cursor-pointer group space-y-3 relative z-10"
                    >
                      {/* Node Indicator with Checkmark */}
                      <div
                        className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center text-[10px] ${
                          isActive
                            ? "border-violet bg-violet text-void scale-110"
                            : isCompleted
                            ? "border-violet/70 bg-obsidian text-violet"
                            : "border-ash/40 bg-obsidian text-transparent group-hover:border-bone"
                        }`}
                      >
                        {isCompleted && !isActive && <FiCheck className="w-3 h-3 stroke-[3]" />}
                        {isActive && <div className="w-2 h-2 rounded-full bg-void" />}
                      </div>

                      {/* Timeline Header Info */}
                      <div className="text-center space-y-1">
                        <div className="text-[10px] text-violet font-semibold tracking-wider">
                          {step.year}
                        </div>
                        <div className="text-xs text-bone font-medium font-space line-clamp-1">
                          {step.role}
                        </div>
                        <div className="text-[10px] text-ash/70 font-sans line-clamp-1">
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Milestone Card Drawer */}
            <div className="p-4 bg-obsidian border border-hairline rounded-lg space-y-2 transition-all">
              <div className="flex items-center justify-between text-xs">
                <span className="text-violet font-space font-semibold">
                  {JOURNEY_STEPS[activeStep].role} — {JOURNEY_STEPS[activeStep].detail}
                </span>
                <span className="text-[10px] text-ash font-mono">
                  {JOURNEY_STEPS[activeStep].year}
                </span>
              </div>
              <p className="text-xs text-ash/90 font-sans leading-relaxed font-light">
                {JOURNEY_STEPS[activeStep].description}
              </p>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="pt-6 border-t border-hairline flex flex-wrap items-center justify-between gap-6">
            <a
              href="/Samontañez Rence P. Resume.pdf"
              download="Samontañez Rence P. Resume.pdf"
              className="flex items-center space-x-2 text-xs text-bone hover:text-violet transition-colors group"
            >
              <FiDownload className="w-4 h-4 text-violet group-hover:translate-y-0.5 transition-transform" />
              <span className="tracking-widest">DOWNLOAD MY CV</span>
            </a>

            <div className="flex items-center space-x-4">
              <span className="text-[10px] text-ash/60 tracking-widest uppercase">
                FOLLOW ME:
              </span>
              <div className="flex items-center space-x-3 text-ash">
                {SOCIAL_LINKS.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-violet transition-colors text-sm"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}