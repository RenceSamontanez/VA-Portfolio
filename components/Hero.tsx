"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { FiPlay, FiVolume2, FiVolumeX } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadingLineRef = useRef<HTMLDivElement>(null);
  const fullNameRef = useRef<HTMLHeadingElement>(null);
  const soloxNameRef = useRef<HTMLDivElement>(null);
  const soloxNavContainerRef = useRef<HTMLDivElement>(null);
  const centerBrandContainerRef = useRef<HTMLDivElement>(null);
  const tagLineRef = useRef<HTMLParagraphElement>(null);
  const portraitSectionRef = useRef<HTMLDivElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const uiElementsRef = useRef<HTMLDivElement>(null);

  // Helper function to send commands to YouTube iFrame API
  const postYTCommand = (func: string, args: any[] = []) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
      );
    }
  };

  // 1. Reset scroll position to top on page refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  useGSAP(
    () => {
      // 2. Initial Loading Sequence
      const introTl = gsap.timeline();

      introTl
        .fromTo(
          loadingLineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.inOut" }
        )
        .to(loadingLineRef.current, {
          scaleY: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        })
        .fromTo(
          fullNameRef.current,
          { opacity: 0, y: 15, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.1"
        )
        .to(
          uiElementsRef.current,
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );

      // 3. Scroll Animation Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4500",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      const soloxEl = soloxNameRef.current;
      const navTargetEl = soloxNavContainerRef.current;
      const centerTargetEl = centerBrandContainerRef.current;

      if (!soloxEl || !navTargetEl || !centerTargetEl) return;

      scrollTl
        .to(fullNameRef.current, { opacity: 0, scale: 0.8, duration: 1, ease: "power2.inOut" }, "step1")
        .to(soloxEl, { opacity: 1, scale: 1, duration: 1, ease: "power2.inOut" }, "step1")

        // Morph SoloX to Top Left
        .to(
          soloxEl,
          {
            onStart: () => {
              const state = Flip.getState(soloxEl);
              navTargetEl.appendChild(soloxEl);
              Flip.from(state, { duration: 1.5, ease: "power2.inOut", scale: true });
            },
            onReverseComplete: () => {
              const state = Flip.getState(soloxEl);
              centerTargetEl.appendChild(soloxEl);
              Flip.from(state, { duration: 1.5, ease: "power2.inOut", scale: true });
            },
            duration: 1.5,
          },
          "step1+=0.5"
        )

        .to(tagLineRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
        .to(tagLineRef.current, { opacity: 0, y: -20, duration: 1 })
        .fromTo(
          portraitSectionRef.current,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 2.5, ease: "power2.out" }
        )
        .to(portraitSectionRef.current, { opacity: 0, scale: 0.95, duration: 1.5 })
        
        // Showreel Video Fade-In
        .to(
          videoOverlayRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 2.5,
            ease: "power2.inOut",
            onStart: () => postYTCommand("playVideo"),
          },
          "-=0.8"
        )

        // Fade Out Video & Decrease Volume on Scroll Away
        .to(
          videoOverlayRef.current,
          {
            scale: 0.3,
            opacity: 0,
            borderRadius: "24px",
            duration: 2,
            ease: "power2.inOut",
            onUpdate: function () {
              const progress = this.progress(); // Ranges from 0 to 1
              const volume = Math.round((1 - progress) * 100);
              postYTCommand("setVolume", [volume]);

              if (progress >= 0.95) {
                postYTCommand("pauseVideo");
              }
            },
            onReverseComplete: () => {
              postYTCommand("playVideo");
              postYTCommand("setVolume", [100]);
            },
          }
        )
        .to(soloxEl, {
          onStart: () => {
            const state = Flip.getState(soloxEl);
            centerTargetEl.appendChild(soloxEl);
            Flip.from(state, { duration: 2, ease: "power3.inOut", scale: true });
          },
          onReverseComplete: () => {
            const state = Flip.getState(soloxEl);
            navTargetEl.appendChild(soloxEl);
            Flip.from(state, { duration: 2, ease: "power3.inOut", scale: true });
          },
          duration: 2,
        });
    },
    { scope: containerRef }
  );

  // Toggle Audio Switch
  const toggleMute = () => {
    if (isMuted) {
      postYTCommand("unMute");
      postYTCommand("setVolume", [100]);
      setIsMuted(false);
    } else {
      postYTCommand("mute");
      setIsMuted(true);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-void text-bone overflow-hidden flex flex-col justify-between p-6 sm:p-10 font-mono select-none"
    >
      {/* UI Elements Layer */}
      <div
        ref={uiElementsRef}
        className="opacity-0 w-full h-full absolute inset-0 pointer-events-none p-6 sm:p-10 flex flex-col justify-between z-30"
      >
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs text-ash tracking-widest">01 · HOME</span>
            <div ref={soloxNavContainerRef} className="relative min-h-[40px] flex items-center" />
          </div>

          <span className="text-xs text-ash">LIPA CITY, PH</span>
        </div>

        <div className="flex justify-between items-end w-full pointer-events-auto">
          <div className="max-w-xs space-y-1 text-xs text-ash/80 font-sans hidden sm:block">
            <p>Full-Stack Developer, Problem Solver, and AI Integration Specialist.</p>
          </div>
          <div className="flex items-center space-x-6 text-xs text-bone ml-auto sm:ml-0">
            <button className="flex items-center space-x-2 hover:text-blue-300 transition-colors">
              <FiPlay className="w-3.5 h-3.5 text-blue-300" />
              <span className="tracking-widest">PLAY SHOWREEL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Center Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 px-4">
        <div
          ref={loadingLineRef}
          className="absolute w-40 sm:w-56 h-[1px] bg-blue-300 pointer-events-none"
        />

        <div
          ref={centerBrandContainerRef}
          className="relative flex items-center justify-center min-h-[60px]"
        >
          <h1
            ref={fullNameRef}
            className="font-space text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-bone text-center whitespace-nowrap opacity-0"
          >
            RENCE PACIFICO SAMONTAÑEZ
          </h1>

          <div
            ref={soloxNameRef}
            className="absolute opacity-0 font-space text-3xl sm:text-5xl font-extrabold tracking-wider whitespace-nowrap bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(147,197,253,0.3)] pointer-events-auto"
          >
            SoloX
          </div>
        </div>

        <p
          ref={tagLineRef}
          className="opacity-0 translate-y-4 font-sans text-xs sm:text-sm text-blue-200/80 tracking-widest mt-6 uppercase text-center max-w-md font-light"
        >
          SCROLL TO EXPERIENCE & ENJOY THE PORTFOLIO JOURNEY
        </p>
      </div>

      {/* Editorial Portrait Canvas */}
      <div
        ref={portraitSectionRef}
        className="absolute inset-0 z-10 opacity-0 pointer-events-none flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/80 z-10" />
        <img
          src="https://i.pinimg.com/1200x/51/b5/b2/51b5b2bfa3c86f9c82d6503ee62fc096.jpg"
          alt="Rence Pacifico Samontañez"
          className="w-full h-full object-cover object-center grayscale contrast-125 opacity-40"
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 sm:p-16 pointer-events-none">
          <div className="max-w-md mt-20">
            <h2 className="font-space text-3xl sm:text-6xl font-black text-white tracking-tight uppercase leading-none">
              BUILDING BRANDS THAT MOVE
            </h2>
          </div>

          <div className="max-w-xs text-[11px] sm:text-xs text-ash font-sans space-y-1 my-auto">
            <p>CREATING DIGITAL EXPERIENCES THAT FEEL AS INTENTIONAL AS THEY LOOK.</p>
            <p className="text-blue-200/60">WORKING ACROSS STRATEGY, IDENTITY, AND AI SYSTEMS.</p>
          </div>

          <div className="self-end text-right max-w-lg mb-12">
            <h2 className="font-space text-3xl sm:text-6xl font-black text-white/90 tracking-tight uppercase leading-none">
              TURNING COMPLEXITY INTO CLARITY
            </h2>
          </div>
        </div>
      </div>

      {/* Full-Screen Showreel Video Overlay */}
      <div
        ref={videoOverlayRef}
        className="absolute inset-0 bg-black z-40 opacity-0 pointer-events-none flex items-center justify-center overflow-hidden transition-all"
      >
        <div className="w-full h-[130%] relative flex items-center justify-center overflow-hidden pointer-events-none">
          <iframe
            ref={iframeRef}
            className="w-full h-full object-cover scale-135 pointer-events-none"
            src="https://www.youtube.com/embed/qBRVM2vEPNg?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=qBRVM2vEPNg&controls=0&start=2&playsinline=1&cc_load_policy=0&cc_lang_pref=off"
            title="Portfolio Showreel"
            allow="autoplay; encrypted-media"
          />
        </div>

        {/* Fully Interactive Control Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-8 left-8 bg-void/90 backdrop-blur-md px-4 py-2 border border-hairline rounded-md text-xs text-bone z-50 font-mono pointer-events-auto cursor-pointer hover:border-blue-300 transition-all flex items-center space-x-2"
        >
          {isMuted ? (
            <>
              <FiVolumeX className="w-3.5 h-3.5 text-ash" />
              <span>SHOWREEL · UNMUTE AUDIO</span>
            </>
          ) : (
            <>
              <FiVolume2 className="w-3.5 h-3.5 text-blue-300" />
              <span>SHOWREEL · MUTE AUDIO</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}