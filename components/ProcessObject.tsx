"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import {
  Search,
  Layers,
  Cpu,
  CheckCircle2,
  Rocket,
  FileText,
  GitFork,
  Users,
  ShieldAlert,
  Compass,
  Boxes,
  Database,
  Terminal,
  Activity,
} from "lucide-react";
import ProcessDeepDive from "@/components/ProcessDeepDive";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type StepState = "discover" | "plan" | "build" | "test" | "deploy";

interface DeliverableItem {
  icon: React.ReactNode;
  title: string;
}

interface Step {
  id: StepState;
  num: string;
  label: string;
  title: string;
  description: string;
  approach: string;
  deliverables: DeliverableItem[];
  icon: React.ReactNode;
}

const PROCESS_STEPS: Step[] = [
  {
    id: "discover",
    num: "01",
    label: "DISCOVER",
    title: "01. Understand the Problem Before Building the Solution",
    description:
      "Every project starts with a problem, not a technology. I break the problem down into its users, goals, workflows, constraints, and underlying requirements before deciding how the system should be built.",
    approach:
      "I gather requirements, study the existing workflow, identify pain points, separate essential requirements from assumptions, and map the information and processes that the system needs to handle.",
    deliverables: [
      { icon: <FileText className="w-3.5 h-3.5 text-[#818cf8]" />, title: "Problem Definition" },
      { icon: <GitFork className="w-3.5 h-3.5 text-[#818cf8]" />, title: "Requirement Map" },
      { icon: <Users className="w-3.5 h-3.5 text-[#818cf8]" />, title: "User & Workflow Analysis" },
      { icon: <ShieldAlert className="w-3.5 h-3.5 text-[#818cf8]" />, title: "Technical Constraints" },
    ],
    icon: <Search className="w-4 h-4" />,
  },
  {
    id: "plan",
    num: "02",
    label: "PLAN",
    title: "02. Turn Requirements Into a Usable Architecture",
    description:
      "Once the problem is clear, I map out the system structure. This means designing data models, component hierarchies, and API routes that handle every edge case.",
    approach:
      "I define data models, design database schemas, map component relationships, and draft API routes to create a clear blueprint before writing code.",
    deliverables: [
      { icon: <Boxes className="w-3.5 h-3.5 text-[#818cf8]" />, title: "Data Model Blueprint" },
      { icon: <Database className="w-3.5 h-3.5 text-[#818cf8]" />, title: "Database Schema" },
      { icon: <GitFork className="w-3.5 h-3.5 text-[#818cf8]" />, title: "API Endpoint Specs" },
      { icon: <Compass className="w-3.5 h-3.5 text-[#818cf8]" />, title: "Component Structure" },
    ],
    icon: <Layers className="w-4 h-4" />,
  },
  {
    id: "build",
    num: "03",
    label: "BUILD",
    title: "03. Assemble the System Component by Component",
    description:
      "With a clear architecture in place, I write clean, modular, and maintainable code. Each feature is developed incrementally to match the system definition.",
    approach:
      "I build reusable components, implement backend logic, integrate third-party APIs, and establish state management to assemble a working system.",
    deliverables: [
      { icon: <Terminal className="w-3.5 h-3.5 text-[#818cf8]" />, title: "Modular Frontend UI" },
      { icon: <Database className="w-3.5 h-3.5 text-[#818cf8]" />, title: "Backend API Layer" },
      { icon: <Activity className="w-3.5 h-3.5 text-[#818cf8]" />, title: "State Management" },
      { icon: <Boxes className="w-3.5 h-3.5 text-[#818cf8]" />, title: "Database Integration" },
    ],
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    id: "test",
    num: "04",
    label: "TEST",
    title: "04. Challenge the System Before Users Have To",
    description:
      "I thoroughly audit and test every workflow, uncovering hidden edge cases, performance bottlenecks, and unexpected input failures before launch.",
    approach:
      "I run cross-browser checks, test edge cases, audit database query speed, and verify end-to-end user journeys to guarantee reliable operation.",
    deliverables: [
      { icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#818cf8]" />, title: "End-to-End Audits" },
      { icon: <Activity className="w-3.5 h-3.5 text-[#818cf8]" />, title: "Performance Profiling" },
      { icon: <ShieldAlert className="w-3.5 h-3.5 text-[#818cf8]" />, title: "Edge Case Testing" },
      { icon: <FileText className="w-3.5 h-3.5 text-[#818cf8]" />, title: "Validation Checks" },
    ],
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  {
    id: "deploy",
    num: "05",
    label: "DEPLOY",
    title: "05. Release the System and Prepare It for Scale",
    description:
      "I deploy the application to production with optimized build configs, environment isolation, and active monitoring to ensure long-term stability.",
    approach:
      "I configure production environments, set up automated CI/CD deployment pipelines, optimize static assets, and verify live server readiness.",
    deliverables: [
      { icon: <Rocket className="w-3.5 h-3.5 text-[#818cf8]" />, title: "Production Build" },
      { icon: <Terminal className="w-3.5 h-3.5 text-[#818cf8]" />, title: "CI/CD Pipeline" },
      { icon: <Activity className="w-3.5 h-3.5 text-[#818cf8]" />, title: "Live Telemetry" },
      { icon: <Database className="w-3.5 h-3.5 text-[#818cf8]" />, title: "SSL & Env Security" },
    ],
    icon: <Rocket className="w-4 h-4" />,
  },
];

const BASE_POSITIONS: [number, number, number][] = [
  [-0.6, -0.6, -0.6],
  [0.6, -0.6, -0.6],
  [-0.6, 0.6, -0.6],
  [0.6, 0.6, -0.6],
  [-0.6, -0.6, 0.6],
  [0.6, -0.6, 0.6],
  [-0.6, 0.6, 0.6],
  [0.6, 0.6, 0.6],
];

const SCATTER_POSITIONS: [number, number, number][] = [
  [-2.2, 1.8, -1.5],
  [2.4, -1.9, 1.2],
  [-1.8, -2.1, -2.0],
  [1.9, 2.3, -1.1],
  [-2.5, -1.2, 1.8],
  [2.1, 1.5, 2.2],
  [-1.2, 2.5, 1.4],
  [1.6, -2.4, -1.8],
];

export default function ProcessObject() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      const totalSteps = PROCESS_STEPS.length;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalSteps * 600}`,
        pin: true,
        pinReparent: false,
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate: (self) => {
          const step = Math.min(
            Math.floor(self.progress * totalSteps),
            totalSteps - 1
          );
          setActiveStep(step);
        },
      });
    },
    { scope: containerRef }
  );

  const currentStep = PROCESS_STEPS[activeStep];
  const lineProgressPercent = (activeStep / (PROCESS_STEPS.length - 1)) * 100;

  return (
    <div className="w-full bg-[#030303]">
      <section
        ref={containerRef}
        className="relative w-full min-h-screen lg:h-screen bg-[#030303] text-[#e0e0e0] font-mono flex flex-col justify-between p-5 sm:p-8 lg:p-12 overflow-x-hidden select-none border-t border-white/10 pb-16 lg:pb-12"
      >
        {/* Header Bar */}
        <div className="w-full flex justify-between items-start pt-2 z-20">
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] sm:text-xs text-[#737373] tracking-[0.25em] uppercase font-semibold">
              04 · ARCHITECTURE PROCESS
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              How I Turn Problems<br />
              <span className="text-[#818cf8]">Into Systems</span>
            </h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-col items-end space-y-1 text-xs font-mono z-20 text-[#525252]">
            <span>01 HOME</span>
            <span>02 ABOUT</span>
            <span>03 WORK</span>
            <span className="text-[#818cf8] font-bold tracking-widest border-b border-[#818cf8] pb-0.5">
              04 PROCESS
            </span>
            <span>05 SERVICES</span>
          </div>
        </div>

        {/* Main Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto z-20 w-full py-4 lg:py-0">
          
          {/* Phase Details (Left Column) */}
          <div className="w-full lg:col-span-5 space-y-5">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.2em] uppercase">
              <span className="text-[#6366f1]">FROM FRAGMENTATION TO SYSTEM</span>
              <span className="text-[#737373] tracking-widest hidden sm:inline">
                SCROLL TO BUILD ↓
              </span>
            </div>

            {/* Ultra-Smooth Progress Stepper */}
            <div className="relative w-full my-4 py-2">
              {/* Background Line */}
              <div className="absolute top-[7px] left-[14px] right-[14px] h-[2px] bg-[#1a1a1a] rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-[#6366f1] to-[#818cf8] rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(129,140,248,0.6)]"
                  style={{ width: `${lineProgressPercent}%` }}
                />
              </div>

              {/* Step Buttons */}
              <div className="relative flex justify-between items-center w-full z-10">
                {PROCESS_STEPS.map((step, idx) => {
                  const isPassed = idx <= activeStep;
                  const isCurrent = idx === activeStep;

                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(idx)}
                      className="flex flex-col items-center group cursor-pointer focus:outline-none"
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                          isCurrent
                            ? "bg-[#818cf8] scale-125 ring-4 ring-[#6366f1]/25 shadow-[0_0_12px_#818cf8]"
                            : isPassed
                            ? "bg-[#6366f1]"
                            : "bg-[#262626] border border-white/10"
                        }`}
                      >
                        {isCurrent && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <span
                        className={`text-[9px] sm:text-[10px] mt-2.5 tracking-wider font-mono transition-colors uppercase ${
                          isCurrent
                            ? "text-white font-bold"
                            : "text-[#737373] group-hover:text-[#a3a3a3]"
                        }`}
                      >
                        <span className="sm:inline hidden">{step.label}</span>
                        <span className="sm:hidden inline">{step.num}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Content Card */}
            <div className="space-y-4">
              <h3 className="font-sans text-xl sm:text-2xl text-white font-semibold leading-tight">
                {currentStep.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#a3a3a3] leading-relaxed font-light">
                {currentStep.description}
              </p>

              {/* Approach Strategy */}
              <div className="p-3.5 bg-white/[0.02] border border-white/10 rounded-lg backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-1.5">
                  <div className="p-1 bg-[#6366f1]/20 rounded text-[#818cf8]">
                    {currentStep.icon}
                  </div>
                  <span className="text-[10px] text-[#818cf8] tracking-wider uppercase font-bold">
                    HOW I APPROACH THIS STAGE
                  </span>
                </div>
                <p className="font-sans text-xs text-[#d4d4d4] leading-relaxed">
                  {currentStep.approach}
                </p>
              </div>

              {/* Key Deliverables */}
              <div>
                <span className="text-[10px] text-[#737373] tracking-widest uppercase block mb-2 font-semibold">
                  KEY DELIVERABLES
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStep.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-2.5 p-2.5 bg-[#0a0a0c] border border-white/10 rounded-lg text-xs text-[#d4d4d4]"
                    >
                      {item.icon}
                      <span className="font-sans truncate">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: 3D Canvas (Hidden on Mobile < lg) */}
          <div className="hidden lg:flex lg:col-span-4 h-[400px] lg:h-[450px] w-full relative items-center justify-center">
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <pointLight position={[-10, -10, -5]} intensity={0.8} color="#818cf8" />

              <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <ModularCubeMatrix currentState={currentStep.id} />
              </Float>
            </Canvas>
          </div>

          {/* Right Column: Vertical Navigation (Hidden on Mobile < lg) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col space-y-3 border-l border-white/10 pl-6">
            {PROCESS_STEPS.map((step, idx) => {
              const isCurrent = idx === activeStep;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-2.5 rounded-lg transition-all duration-300 flex items-start space-x-3 group cursor-pointer ${
                    isCurrent
                      ? "bg-white/[0.05] border border-[#818cf8]/40 text-white"
                      : "text-[#737373] hover:text-[#a3a3a3] border border-transparent"
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-md mt-0.5 ${
                      isCurrent
                        ? "bg-[#6366f1] text-white"
                        : "bg-[#171717] text-[#525252] group-hover:text-white"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold tracking-widest text-[#818cf8]">
                        {step.num}
                      </span>
                      <span
                        className={`text-xs font-bold font-sans tracking-wide ${
                          isCurrent ? "text-white" : "text-[#a3a3a3]"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-[#737373] mt-0.5 line-clamp-1 font-light">
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Status Bar */}
        <div className="w-full flex justify-between items-center pt-3 border-t border-[#171717] text-[10px] sm:text-[11px] text-[#737373]">
          <span>PHASE {currentStep.num} / 05</span>
          <span className="uppercase tracking-widest font-semibold text-[#818cf8]">
            TRANSFORMATION STATE · {currentStep.id}
          </span>
        </div>
      </section>

      {/* Narrative & Case Study Deep-Dive */}
      <ProcessDeepDive />
    </div>
  );
}

// 3D Morphing Matrix Sub-component
function ModularCubeMatrix({ currentState }: { currentState: StepState }) {
  const groupRef = useRef<THREE.Group>(null);
  const cubeRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.3;
    groupRef.current.rotation.x += delta * 0.15;

    cubeRefs.current.forEach((cube, index) => {
      if (!cube) return;

      const basePos = BASE_POSITIONS[index];
      const scatterPos = SCATTER_POSITIONS[index];

      const targetPos = new THREE.Vector3(...basePos);
      const targetScale = new THREE.Vector3(0.95, 0.95, 0.95);
      let isWireframe = false;
      let targetOpacity = 0.85;

      switch (currentState) {
        case "discover":
          targetPos.set(...scatterPos);
          targetScale.set(0.7, 0.7, 0.7);
          targetOpacity = 0.5;
          break;

        case "plan":
          targetPos.set(basePos[0] * 1.8, basePos[1] * 1.8, basePos[2] * 1.8);
          targetScale.set(0.85, 0.85, 0.85);
          targetOpacity = 0.75;
          break;

        case "build":
          targetPos.set(basePos[0] * 1.1, basePos[1] * 1.1, basePos[2] * 1.1);
          targetScale.set(0.98, 0.98, 0.98);
          targetOpacity = 0.95;
          break;

        case "test":
          targetPos.set(basePos[0] * 1.3, basePos[1] * 1.3, basePos[2] * 1.3);
          targetScale.set(1.0, 1.0, 1.0);
          isWireframe = true;
          targetOpacity = 0.4;
          break;

        case "deploy":
          targetPos.set(basePos[0] * 0.52, basePos[1] * 0.52, basePos[2] * 0.52);
          targetScale.set(1.04, 1.04, 1.04);
          targetOpacity = 1.0;
          break;
      }

      cube.position.lerp(targetPos, delta * 5);
      cube.scale.lerp(targetScale, delta * 5);

      const material = cube.material as THREE.MeshStandardMaterial;
      if (material) {
        material.wireframe = isWireframe;
        material.opacity = THREE.MathUtils.lerp(
          material.opacity,
          targetOpacity,
          delta * 5
        );
      }
    });
  });

  return (
    <group ref={groupRef}>
      {BASE_POSITIONS.map((_, index) => (
        <mesh
          key={index}
          ref={(el) => {
            cubeRefs.current[index] = el;
          }}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={currentState === "deploy" ? "#818cf8" : "#6366f1"}
            transparent
            opacity={0.8}
            roughness={0.2}
            metalness={0.8}
            emissive="#312e81"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}