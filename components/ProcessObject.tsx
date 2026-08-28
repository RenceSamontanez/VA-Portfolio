"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type StepState = "discover" | "plan" | "build" | "test" | "deploy";

interface Step {
  id: StepState;
  label: string;
  title: string;
  description: string;
  deliverables: string[];
  executionStrategy: string;
}

const PROCESS_STEPS: Step[] = [
  {
    id: "discover",
    label: "DISCOVER",
    title: "1. Fragment Analysis & Information Mapping",
    description:
      "Deconstruct complex problem spaces into isolated core modules. We isolate raw user requirements, technical constraints, and data models as independent, floating components.",
    executionStrategy:
      "Audit existing legacy systems, gather business logic, and catalog unlinked data models to map architectural boundaries.",
    deliverables: [
      "Requirement Decomposition",
      "Constraint Mapping",
      "Module Catalog",
    ],
  },
  {
    id: "plan",
    label: "PLAN",
    title: "2. Architectural Alignment & Spatial Design",
    description:
      "Establish strict grid boundaries and structural contracts. Each floating module aligns along defined spatial axes to guarantee seamless interconnectivity.",
    executionStrategy:
      "Define API schemas, type contracts, and component interfaces to ensure every subsystem aligns on a unified spatial axis.",
    deliverables: [
      "System Architecture Schema",
      "Interface Specifications",
      "Data-Flow Blueprint",
    ],
  },
  {
    id: "build",
    label: "BUILD",
    title: "3. Interlocking Assembly & Integration",
    description:
      "Assemble components into a unified matrix. Individual modules interlock, creating robust data channels and high-throughput connections.",
    executionStrategy:
      "Implement modular features, write tight integration logic, and establish bidirectional state pipelines across all blocks.",
    deliverables: [
      "Interlocked Codebase",
      "API Integration Layer",
      "State Management Pipeline",
    ],
  },
  {
    id: "test",
    label: "TEST",
    title: "4. Structural Transparency & Stress Auditing",
    description:
      "Transition the assembly into a transparent wireframe state for deep inspection, uncovering hidden race conditions, performance bottlenecks, and edge-case faults.",
    executionStrategy:
      "Execute automated end-to-end testing, memory leak profiling, edge-case analysis, and penetration stress-testing under full opacity.",
    deliverables: [
      "X-Ray Diagnostic Logs",
      "Load Test Reports",
      "Zero-Defect Certification",
    ],
  },
  {
    id: "deploy",
    label: "DEPLOY",
    title: "5. Fusion into Monolithic Production Core",
    description:
      "Fuse all verified components into a solid, high-performance core—ready for fault-tolerant, high-concurrency production deployment.",
    executionStrategy:
      "Compile production builds, initiate automated zero-downtime CI/CD deployment, and activate continuous real-time monitoring.",
    deliverables: [
      "Immutable Production Build",
      "CI/CD Pipeline Activation",
      "Real-Time Telemetry",
    ],
  },
];

// Pre-calculated target offsets for the 8 sub-cubes in a 2x2x2 grid
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

// Random scatter vectors for Stage 1 (Discover)
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
        end: `+=${totalSteps * 650}`,
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
  
  // Calculate exact percentage so the line connects strictly between node 1 (0%) and node 5 (100%)
  const lineProgressPercent = (activeStep / (PROCESS_STEPS.length - 1)) * 100;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#030303] text-[#e0e0e0] font-mono flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none border-t border-white/10"
    >
      {/* Header Bar */}
      <div className="w-full flex justify-between items-start pt-2 z-20">
        <div className="flex flex-col space-y-1">
          <span className="text-[10px] sm:text-xs text-[#737373] tracking-[0.25em] uppercase">
            04 · ARCHITECTURE PROCESS
          </span>
          <h2 className="font-sans text-xl sm:text-3xl font-bold tracking-tight text-white">
            Approach on problems with 3D Visualization
          </h2>
        </div>

        {/* Navigation */}
        <div className="hidden sm:flex flex-col items-end space-y-1 text-xs font-mono z-20 text-[#525252]">
          <span>01 HOME</span>
          <span>02 ABOUT</span>
          <span>03 WORK</span>
          <span className="text-[#818cf8] font-bold tracking-widest border-b border-[#818cf8] pb-0.5">
            04 PROCESS
          </span>
          <span>05 SERVICES</span>
        </div>
      </div>

      {/* Main Execution Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto z-20 w-full">
        {/* Left Column: Detailed Process Pitch */}
        <div className="lg:col-span-6 space-y-8">
          <span className="text-[10px] text-[#6366f1] tracking-[0.2em] uppercase font-bold">
            EXECUTION METHODOLOGY (SCROLL TO PROGRESS)
          </span>

          {/* Precision Fixed Timeline */}
          <div className="relative w-full max-w-xl py-4">
            {/* Base Line Container matching exact node width */}
            <div className="absolute top-[21px] left-[5px] right-[5px] h-[1px] bg-[#262626]">
              {/* Active Progress Line bounded precisely within node centers */}
              <div
                className="h-[2px] bg-[#6366f1] transition-all duration-300 ease-out shadow-[0_0_12px_#6366f1]"
                style={{ width: `${lineProgressPercent}%` }}
              />
            </div>

            {/* Node Indicators */}
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
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#818cf8] scale-150 ring-4 ring-[#6366f1]/20"
                          : isPassed
                          ? "bg-[#6366f1]"
                          : "bg-[#404040]"
                      }`}
                    />
                    <span
                      className={`text-[10px] mt-4 tracking-widest transition-colors ${
                        isCurrent
                          ? "text-white font-bold"
                          : "text-[#737373] group-hover:text-white"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Granular Execution Description */}
          <div className="space-y-4 max-w-lg min-h-[220px]">
            <h3 className="font-sans text-xl sm:text-2xl text-white font-semibold">
              {currentStep.title}
            </h3>
            
            <p className="font-sans text-xs sm:text-sm text-[#a3a3a3] leading-relaxed font-light">
              {currentStep.description}
            </p>

            {/* Execution Strategy Pitch */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm">
              <span className="text-[10px] text-[#818cf8] tracking-wider uppercase font-bold block mb-1">
                EXECUTION STRATEGY
              </span>
              <p className="font-sans text-xs text-[#d4d4d4] leading-relaxed">
                {currentStep.executionStrategy}
              </p>
            </div>

            {/* Deliverables List */}
            <div className="pt-1">
              <span className="text-[10px] text-[#737373] tracking-widest uppercase block mb-2">
                KEY OUTPUTS & DELIVERABLES
              </span>
              <div className="flex flex-wrap gap-2">
                {currentStep.deliverables.map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2.5 py-1 bg-[#171717] text-[#a3a3a3] border border-[#262626] rounded-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: WebGL Interactive Visual Matrix */}
        <div className="lg:col-span-6 h-[350px] sm:h-[450px] w-full relative flex items-center justify-center">
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <pointLight position={[-10, -10, -5]} intensity={0.8} color="#818cf8" />

            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <ModularCubeMatrix currentState={currentStep.id} />
            </Float>
          </Canvas>
        </div>
      </div>

      {/* Footer Status */}
      <div className="w-full flex justify-between items-center pt-4 border-t border-[#171717] text-[11px] text-[#737373]">
        <span>PHASE 0{activeStep + 1} / 05</span>
        <span className="uppercase tracking-widest">
          TRANSFORMATION STATE · {currentStep.id}
        </span>
      </div>
    </section>
  );
}

// Sub-component rendering the 8 morphing cubes
function ModularCubeMatrix({ currentState }: { currentState: StepState }) {
  const groupRef = useRef<THREE.Group>(null);
  const cubeRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Smooth baseline continuous rotation
    groupRef.current.rotation.y += delta * 0.3;
    groupRef.current.rotation.x += delta * 0.15;

    // Morph individual sub-cubes depending on the current phase
    cubeRefs.current.forEach((cube, index) => {
      if (!cube) return;

      const basePos = BASE_POSITIONS[index];
      const scatterPos = SCATTER_POSITIONS[index];

      let targetPos = new THREE.Vector3(...basePos);
      let targetScale = new THREE.Vector3(0.95, 0.95, 0.95);
      let isWireframe = false;
      let targetOpacity = 0.85;

      switch (currentState) {
        case "discover":
          // Stage 1: Scattered floats
          targetPos.set(...scatterPos);
          targetScale.set(0.7, 0.7, 0.7);
          targetOpacity = 0.5;
          break;

        case "plan":
          // Stage 2: Align along axes with space gap
          targetPos.set(basePos[0] * 1.8, basePos[1] * 1.8, basePos[2] * 1.8);
          targetScale.set(0.85, 0.85, 0.85);
          targetOpacity = 0.75;
          break;

        case "build":
          // Stage 3: Connect close together into a matrix
          targetPos.set(basePos[0] * 1.1, basePos[1] * 1.1, basePos[2] * 1.1);
          targetScale.set(0.98, 0.98, 0.98);
          targetOpacity = 0.95;
          break;

        case "test":
          // Stage 4: Transparent wireframe inspection
          targetPos.set(basePos[0] * 1.3, basePos[1] * 1.3, basePos[2] * 1.3);
          targetScale.set(1.0, 1.0, 1.0);
          isWireframe = true;
          targetOpacity = 0.4;
          break;

        case "deploy":
          // Stage 5: Fuse completely into a single solid core
          targetPos.set(basePos[0] * 0.52, basePos[1] * 0.52, basePos[2] * 0.52);
          targetScale.set(1.04, 1.04, 1.04);
          targetOpacity = 1.0;
          break;
      }

      // Interpolation logic
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