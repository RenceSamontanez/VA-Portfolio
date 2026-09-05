"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FiCloud,
  FiVideo,
  FiCheckCircle,
  FiEdit3,
  FiZap,
  FiShield,
  FiDatabase,
  FiClock,
  FiLock,
  FiSend,
  FiYoutube,
  FiInstagram,
  FiSmartphone,
  FiBarChart2,
  FiArchive,
  FiAlertTriangle,
  FiPlay,
  FiPause,
  FiZoomIn,
  FiZoomOut,
  FiMaximize2,
  FiInfo,
  FiX,
  FiArrowRight,
  FiCheck,
  FiUserCheck,
} from "react-icons/fi";

// ============================================================================
// TYPES & DATA DEFINITIONS
// ============================================================================

interface NodeDetail {
  id: string;
  number: string;
  zone: 1 | 2 | 3 | 4;
  title: string;
  category: string;
  badge: string;
  badgeType: "human" | "automated" | "truth" | "control" | "warning";
  icon: React.ElementType;
  items: string[];
  description: string;
  technicalDetails: string[];
}

interface QueueItem {
  id: string;
  title: string;
  status: "QUEUED" | "AWAITING APPROVAL" | "PROCESSING" | "POSTED" | "FAILED";
  time: string;
}

const NODES_DATA: Record<string, NodeDetail> = {
  "01": {
    id: "01",
    number: "01",
    zone: 1,
    title: "Client Content Library",
    category: "CONTENT PREPARATION",
    badge: "CLIENT INPUT",
    badgeType: "human",
    icon: FiCloud,
    items: ["Source videos", "Long-form content", "Approved raw assets"],
    description:
      "Clients upload source material into their preferred cloud storage repository. The system strictly ingests content from designated, secure asset folders.",
    technicalDetails: [
      "Monitors cloud storage webhooks for new media",
      "Performs file format and metadata verification",
      "Generates lightweight preview proxies",
    ],
  },
  "02": {
    id: "02",
    number: "02",
    zone: 1,
    title: "Clip Creation",
    category: "CONTENT PREPARATION",
    badge: "AI-ASSISTED",
    badgeType: "automated",
    icon: FiVideo,
    items: ["Identify high-hook moments", "Generate short candidates", "Format 9:16 vertical frame"],
    description:
      "Automated audio transcripts and video scene segmentation detect engaging moments from long-form content, formatting them into vertical short-form candidates.",
    technicalDetails: [
      "AI audio transcript indexing & topic extraction",
      "Dynamic face detection & center framing",
      "Automated subtitle placement & timing generation",
    ],
  },
  "03": {
    id: "03",
    number: "03",
    zone: 1,
    title: "Human Quality Check",
    category: "CONTENT PREPARATION",
    badge: "HUMAN CONTROL",
    badgeType: "human",
    icon: FiUserCheck,
    items: ["Watch video clip", "Check hook & captioning", "Verify framing", "Approve / Request Revision"],
    description:
      "Every clip candidate is staged for manual review. Human operators review pacing, hook strength, caption accuracy, and brand alignment before anything enters the publish queue.",
    technicalDetails: [
      "One-click approval dashboard with instant preview",
      "Custom revision tagging and feedback loop",
      "Strict gatekeeper architecture — no automated publishing without explicit sign-off",
    ],
  },
  "03B": {
    id: "03B",
    number: "03B",
    zone: 1,
    title: "Manual Editing Loop",
    category: "CONTENT PREPARATION",
    badge: "REVISION PATH",
    badgeType: "warning",
    icon: FiEdit3,
    items: ["Refine visual cuts", "Adjust captions", "Re-upload modified clip"],
    description:
      "Content requiring adjustments is routed out of the pipeline for editor refinement. Edited assets are required to loop back through Human Quality Check prior to scheduling.",
    technicalDetails: [
      "Tracks edit versioning against original clip candidate",
      "Loops back into review stage — prevents bypassing human approval",
    ],
  },
  "04": {
    id: "04",
    number: "04",
    zone: 2,
    title: "Automated Intake",
    category: "AUTOMATION ENGINE",
    badge: "AUTOMATED",
    badgeType: "automated",
    icon: FiZap,
    items: ["New approved file detected", "Extract metadata payload", "Initialize job transaction"],
    description:
      "Approval triggers an automated intake event. The system packages media assets, title strings, tags, and caption overlays into a unified job payload.",
    technicalDetails: [
      "Secure webhook listener with payload validation",
      "Generates unique transactional process tracking ID",
      "Prepares normalized JSON payload across all targets",
    ],
  },
  "05": {
    id: "05",
    number: "05",
    zone: 2,
    title: "Validation & Deduplication",
    category: "AUTOMATION ENGINE",
    badge: "INTEGRITY CHECK",
    badgeType: "automated",
    icon: FiShield,
    items: ["MD5 hash collision check", "Asset resolution verification", "API platform compliance check"],
    description:
      "Sanitization gate verifying asset integrity, confirming platform spec compliance (duration, aspect ratio, bitrate), and performing MD5 hash deduplication.",
    technicalDetails: [
      "Calculates cryptographic MD5 checksum of video file",
      "Prevents double-posting duplicate video payloads",
      "Validates video against API constraints for YouTube, IG Reels, and TikTok",
    ],
  },
  "06": {
    id: "06",
    number: "06",
    zone: 2,
    title: "Content Queue",
    category: "AUTOMATION ENGINE",
    badge: "SINGLE SOURCE OF TRUTH",
    badgeType: "truth",
    icon: FiDatabase,
    items: ["Database / Operational Queue", "FIFO ordering logic", "Real-time queue state tracking"],
    description:
      "Approved content enters a structured database queue. Acting as the system's single source of truth, it governs publishing sequence, payload status, and scheduling state.",
    technicalDetails: [
      "First-In, First-Out (FIFO) queue ordering",
      "Atomic state transitions preventing race conditions",
      "Row-level locks ensuring safe distributed processing",
    ],
  },
  "07": {
    id: "07",
    number: "07",
    zone: 2,
    title: "Publishing Scheduler",
    category: "AUTOMATION ENGINE",
    badge: "AUTOMATED",
    badgeType: "automated",
    icon: FiClock,
    items: ["09:00 | 13:00 | 19:00", "Target timezone synchronization", "Slot availability evaluator"],
    description:
      "Cron engine evaluating configured daily time slots relative to client target timezones. Automatically selects the next available item in the queue for execution.",
    technicalDetails: [
      "Timezone-aware scheduling cron worker",
      "Dynamic slot allocation based on audience peak activity",
      "Pulls NEXT queued item sequentially from source database",
    ],
  },
  "08": {
    id: "08",
    number: "08",
    zone: 2,
    title: "Queue Protection",
    category: "AUTOMATION ENGINE",
    badge: "EXECUTION CONTROL",
    badgeType: "control",
    icon: FiLock,
    items: ["Atomic queue locks", "Prevent duplicate scheduling", "Process isolated single item"],
    description:
      "Concurrency control mechanism locking queue items immediately prior to distribution, guaranteeing that duplicate webhooks or retries cannot double-publish.",
    technicalDetails: [
      "Acquires temporary execution mutex lock on payload ID",
      "Transitions status from QUEUED to PROCESSING",
      "Timeout safety rollback on worker crash",
    ],
  },
  "09": {
    id: "09",
    number: "09",
    zone: 3,
    title: "Publishing Engine",
    category: "MULTI-PLATFORM DISTRIBUTION",
    badge: "DISTRIBUTION CORE",
    badgeType: "automated",
    icon: FiSend,
    items: ["Parallel platform dispatcher", "Payload adapter", "API rate limit manager"],
    description:
      "Central publishing core distributing a single approved asset payload into specialized adapters tailored for each social media platform API.",
    technicalDetails: [
      "Concurrent platform upload stream dispatching",
      "Platform-specific endpoint payload transformations",
      "Exponential backoff & rate-limit throttling",
    ],
  },
  "10": {
    id: "10",
    number: "10",
    zone: 3,
    title: "YouTube Shorts",
    category: "MULTI-PLATFORM DISTRIBUTION",
    badge: "PLATFORM API",
    badgeType: "automated",
    icon: FiYoutube,
    items: ["Resumable video upload", "Title & tag insertion", "Publish & return URL"],
    description: "Direct integration via YouTube Data API v3 utilizing resumable chunked video uploads.",
    technicalDetails: ["OAuth2 token refresh handler", "Chunked 10MB byte-stream upload", "Captures returned Video ID"],
  },
  "11": {
    id: "11",
    number: "11",
    zone: 3,
    title: "Instagram Reels",
    category: "MULTI-PLATFORM DISTRIBUTION",
    badge: "PLATFORM API",
    badgeType: "automated",
    icon: FiInstagram,
    items: ["Container creation", "Media status poll", "Publish Reel & return URL"],
    description: "Multi-step upload pipeline leveraging the official Graph API for Instagram Reels.",
    technicalDetails: ["Video container initialization", "Encoding status polling loop", "Final reel publish request"],
  },
  "12": {
    id: "12",
    number: "12",
    zone: 3,
    title: "TikTok",
    category: "MULTI-PLATFORM DISTRIBUTION",
    badge: "PLATFORM API",
    badgeType: "automated",
    icon: FiSmartphone,
    items: ["Direct post upload", "Caption & privacy setup", "Publish & return URL"],
    description: "Content posting via official TikTok Content Posting API with creator attribute tags.",
    technicalDetails: ["Chunked video upload authorization", "Creator post settings application", "Publication status tracking"],
  },
  "13": {
    id: "13",
    number: "13",
    zone: 4,
    title: "Publishing Tracker",
    category: "TRACKING + RECOVERY",
    badge: "SYSTEM LOGS",
    badgeType: "truth",
    icon: FiBarChart2,
    items: ["Cross-platform response verification", "Url & timestamp recording", "Status table aggregation"],
    description:
      "Consolidates response payloads from all platforms into a centralized publication log, recording live permalinks, post times, and response status codes.",
    technicalDetails: [
      "Correlates platform responses to master queue item ID",
      "Stores live URLs for analytics and auditing",
      "Evaluates overall delivery state (Full, Partial, Failure)",
    ],
  },
  "14": {
    id: "14",
    number: "14",
    zone: 4,
    title: "Archive Content",
    category: "TRACKING + RECOVERY",
    badge: "COMPLETE",
    badgeType: "human",
    icon: FiArchive,
    items: ["Move completed asset to archive", "Update queue status to POSTED", "Record final audit log"],
    description:
      "Successful publications transition queue items to POSTED state and safely archive physical video files out of the active processing intake.",
    technicalDetails: [
      "Atomic database status update to POSTED",
      "Moves source files into long-term cloud storage archive",
      "Frees queue lock and triggers pipeline cleanup",
    ],
  },
  "15": {
    id: "15",
    number: "15",
    zone: 4,
    title: "Publishing Error & Recovery",
    category: "TRACKING + RECOVERY",
    badge: "EXCEPTION PATH",
    badgeType: "warning",
    icon: FiAlertTriangle,
    items: ["Automated retry loop", "Error log recording", "Manual notification alert"],
    description:
      "Failures or API errors do not drop content. The system logs exact API error responses, executes isolated retries, and alerts operators if human attention is required.",
    technicalDetails: [
      "3-tier exponential backoff retry mechanism",
      "Records exact HTTP error response codes in queue database",
      "Dispatches instant webhook notification for manual attention",
    ],
  },
};

const INITIAL_QUEUE: QueueItem[] = [
  { id: "001", title: "5 AI Tools to Automate Content", status: "QUEUED", time: "09:00" },
  { id: "002", title: "Behind the Scenes Workflow", status: "QUEUED", time: "13:00" },
  { id: "003", title: "How We Scale Social Video", status: "QUEUED", time: "19:00" },
  { id: "004", title: "Client Case Study Breakdown", status: "QUEUED", time: "NEXT" },
];

export default function ContentAutomation() {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeModalNode, setActiveModalNode] = useState<NodeDetail | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(-1);
  const [simStatusMessage, setSimStatusMessage] = useState<string>("Ready to run simulation");
  const [isPausedAtHuman, setIsPausedAtHuman] = useState<boolean>(false);
  const [queueItems, setQueueItems] = useState<QueueItem[]>(INITIAL_QUEUE);

  const runSimulation = useCallback(() => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(0);
    setIsPausedAtHuman(false);
    setSimStatusMessage("Processing: Short-form video payload");
    setQueueItems(INITIAL_QUEUE);
  }, [isSimulating]);

  const resetSimulation = useCallback(() => {
    setIsSimulating(false);
    setSimStep(-1);
    setIsPausedAtHuman(false);
    setSimStatusMessage("Ready to run simulation");
    setQueueItems(INITIAL_QUEUE);
  }, []);

  useEffect(() => {
    if (!isSimulating || simStep < 0) return;

    let isMounted = true;
    let primaryTimer: ReturnType<typeof setTimeout>;
    let secondaryTimer: ReturnType<typeof setTimeout>;

    const stepMap: Record<
      number,
      {
        message: string;
        delay: number;
        nextStep: number;
        onExecute?: () => void;
      }
    > = {
      0: { message: "01 Ingesting client source content...", delay: 1800, nextStep: 1 },
      1: { message: "02 AI isolating viral hook candidates...", delay: 1800, nextStep: 2 },
      2: { message: "03 Awaiting Human Quality Check approval...", delay: 3000, nextStep: 3 },
      3: { message: "04 Executing automated payload intake...", delay: 1500, nextStep: 4 },
      4: { message: "05 Sanitizing video & checking MD5 hash...", delay: 1500, nextStep: 5 },
      5: {
        message: "06 Enqueueing item into Single Source of Truth...",
        delay: 1800,
        nextStep: 6,
        onExecute: () => {
          setQueueItems((prev) =>
            prev.map((item) => (item.id === "001" ? { ...item, status: "PROCESSING" } : item))
          );
        },
      },
      6: { message: "07 Scheduler evaluating timezone slot [09:00 ● NEXT]...", delay: 1800, nextStep: 7 },
      7: { message: "08 Acquiring Queue Lock & initializing Publishing Engine...", delay: 1800, nextStep: 8 },
      8: { message: "09 Multi-platform streaming: YouTube, Instagram & TikTok...", delay: 2200, nextStep: 9 },
      9: { message: "10 Aggregating publication logs & verification permalinks...", delay: 1800, nextStep: 10 },
      10: {
        message: "11 Complete! Asset archived & queue updated.",
        delay: 3500,
        nextStep: -1,
        onExecute: () => {
          setQueueItems([
            { id: "001", title: "5 AI Tools to Automate Content", status: "POSTED", time: "09:00" },
            { id: "002", title: "Behind the Scenes Workflow", status: "QUEUED", time: "13:00 ● NEXT" },
            { id: "003", title: "How We Scale Social Video", status: "QUEUED", time: "19:00" },
            { id: "004", title: "Client Case Study Breakdown", status: "QUEUED", time: "TOMORROW" },
          ]);
        },
      },
    };

    const currentConfig = stepMap[simStep];

    if (currentConfig) {
      setSimStatusMessage(currentConfig.message);
      if (currentConfig.onExecute) {
        currentConfig.onExecute();
      }

      if (simStep === 2) {
        setIsPausedAtHuman(true);
        primaryTimer = setTimeout(() => {
          if (!isMounted) return;
          setIsPausedAtHuman(false);
          setSimStatusMessage("03 Approved — Resuming automation pipeline...");
          secondaryTimer = setTimeout(() => {
            if (isMounted) setSimStep(3);
          }, 1200);
        }, 1800);
      } else {
        primaryTimer = setTimeout(() => {
          if (!isMounted) return;
          if (currentConfig.nextStep === -1) {
            setIsSimulating(false);
          } else {
            setSimStep(currentConfig.nextStep);
          }
        }, currentConfig.delay);
      }
    }

    return () => {
      isMounted = false;
      clearTimeout(primaryTimer);
      clearTimeout(secondaryTimer);
    };
  }, [isSimulating, simStep]);

  const isNodeActiveInSim = useCallback(
    (nodeId: string): boolean => {
      if (!isSimulating || simStep < 0) return false;
      switch (nodeId) {
        case "01": return simStep === 0;
        case "02": return simStep === 1;
        case "03": return simStep === 2;
        case "04": return simStep === 3;
        case "05": return simStep === 4;
        case "06": return simStep === 5;
        case "07": return simStep === 6;
        case "08": return simStep === 7;
        case "09":
        case "10":
        case "11":
        case "12": return simStep === 8;
        case "13": return simStep === 9;
        case "14": return simStep === 10;
        default: return false;
      }
    },
    [isSimulating, simStep]
  );

  return (
    <section className="w-full bg-[#09090b] text-[#f5f5f7] font-sans pt-4 pb-16 px-4 sm:px-8 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto space-y-4 mb-8 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[11px] font-semibold tracking-wider uppercase mb-3">
              <FiUserCheck className="w-3.5 h-3.5" />
              <span>HUMAN APPROVAL + AUTOMATION</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-mono tracking-tight text-white uppercase">
              FROM CONTENT TO PUBLISHED — AUTOMATICALLY
            </h1>
            <p className="text-xs sm:text-sm text-[#a1a1aa] font-light max-w-3xl mt-2 leading-relaxed">
              From content preparation and human approval to automated scheduling, multi-platform publishing, and performance tracking — one connected system handles the repetitive work.
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto justify-center md:justify-end">
            <button
              onClick={isSimulating ? resetSimulation : runSimulation}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-mono text-xs font-semibold transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isSimulating
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 shadow-indigo-600/20 active:scale-95"
              }`}
            >
              {isSimulating ? (
                <>
                  <FiPause className="w-4 h-4 animate-pulse" />
                  <span>Reset Simulation</span>
                </>
              ) : (
                <>
                  <FiPlay className="w-4 h-4 fill-current" />
                  <span>▶ Run Simulation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {isSimulating && (
          <div className="bg-[#121218] border border-indigo-500/30 rounded-xl p-3 flex items-center justify-between animate-in fade-in duration-300 shadow-xl">
            <div className="flex items-center space-x-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-indigo-300 tracking-wide">
                {simStatusMessage}
              </span>
            </div>
            {isPausedAtHuman && (
              <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] uppercase font-bold animate-pulse">
                AWAITING HUMAN APPROVAL
              </span>
            )}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto mb-3 flex items-center justify-between text-xs font-mono text-[#a1a1aa]">
        <div className="flex items-center space-x-2">
          <span>VIEWPORT ZOOM: {Math.round(zoomLevel * 100)}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setZoomLevel((z) => Math.min(Number((z + 0.1).toFixed(1)), 1.2))}
            className="p-1.5 bg-[#121218] border border-white/10 rounded hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <FiZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(Number((z - 0.1).toFixed(1)), 0.7))}
            className="p-1.5 bg-[#121218] border border-white/10 rounded hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <FiZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 bg-[#121218] border border-white/10 rounded hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
            title="Fit View"
            aria-label="Reset Zoom"
          >
            <FiMaximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-[#0b0b0e] border border-white/10 rounded-2xl p-4 sm:p-8 overflow-x-auto shadow-2xl relative">
        <div
          className="transition-transform duration-300 ease-out origin-top-left min-w-[1240px]"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <div className="grid grid-cols-4 gap-4 mb-6 text-center font-mono text-[11px] font-bold tracking-widest uppercase">
            <div className="bg-indigo-950/30 border border-indigo-500/20 text-indigo-300 py-2 rounded-lg flex items-center justify-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <span>ZONE 1: CONTENT PREPARATION</span>
            </div>
            <div className="bg-blue-950/30 border border-blue-500/20 text-blue-300 py-2 rounded-lg flex items-center justify-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>ZONE 2: AUTOMATION ENGINE</span>
            </div>
            <div className="bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 py-2 rounded-lg flex items-center justify-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>ZONE 3: MULTI-PLATFORM DISTRIBUTION</span>
            </div>
            <div className="bg-purple-950/30 border border-purple-500/20 text-purple-300 py-2 rounded-lg flex items-center justify-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              <span>ZONE 4: TRACKING + RECOVERY</span>
            </div>
          </div>

          <div className="relative mb-8 flex items-center">
            <div className="w-[24%] border-b border-indigo-500/40 text-center pb-1">
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest bg-[#0b0b0e] px-2 font-bold">
                HUMAN CONTROL
              </span>
            </div>
            <div className="flex-1 border-b border-dashed border-white/20 text-center pb-1">
              <span className="text-[10px] font-mono text-[#a1a1aa] uppercase tracking-widest bg-[#0b0b0e] px-3 font-semibold">
                APPROVED CONTENT ENTERS AUTOMATION PIPELINE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 relative z-10">
            <div className="space-y-6 flex flex-col justify-between">
              <NodeCard
                node={NODES_DATA["01"]}
                isActive={isNodeActiveInSim("01")}
                isHovered={hoveredNode === "01"}
                onHover={setHoveredNode}
                onClick={setActiveModalNode}
              />
              <NodeCard
                node={NODES_DATA["02"]}
                isActive={isNodeActiveInSim("02")}
                isHovered={hoveredNode === "02"}
                onHover={setHoveredNode}
                onClick={setActiveModalNode}
              />
              <NodeCard
                node={NODES_DATA["03"]}
                isActive={isNodeActiveInSim("03")}
                isHovered={hoveredNode === "03"}
                onHover={setHoveredNode}
                onClick={setActiveModalNode}
                isProminent={true}
              />
              <div className="pt-2 pl-4 border-l-2 border-amber-500/30 ml-4">
                <NodeCard
                  node={NODES_DATA["03B"]}
                  isActive={false}
                  isHovered={hoveredNode === "03B"}
                  onHover={setHoveredNode}
                  onClick={setActiveModalNode}
                />
              </div>
            </div>

            <div className="space-y-5 flex flex-col justify-between">
              <NodeCard
                node={NODES_DATA["04"]}
                isActive={isNodeActiveInSim("04")}
                isHovered={hoveredNode === "04"}
                onHover={setHoveredNode}
                onClick={setActiveModalNode}
              />
              <NodeCard
                node={NODES_DATA["05"]}
                isActive={isNodeActiveInSim("05")}
                isHovered={hoveredNode === "05"}
                onHover={setHoveredNode}
                onClick={setActiveModalNode}
              />
              <QueueNodeCard
                node={NODES_DATA["06"]}
                isActive={isNodeActiveInSim("06")}
                isHovered={hoveredNode === "06"}
                onHover={setHoveredNode}
                onClick={setActiveModalNode}
                queueItems={queueItems}
              />
              <SchedulerNodeCard
                node={NODES_DATA["07"]}
                isActive={isNodeActiveInSim("07")}
                isHovered={hoveredNode === "07"}
                onHover={setHoveredNode}
                onClick={setActiveModalNode}
              />
              <NodeCard
                node={NODES_DATA["08"]}
                isActive={isNodeActiveInSim("08")}
                isHovered={hoveredNode === "08"}
                onHover={setHoveredNode}
                onClick={setActiveModalNode}
              />
            </div>

            <div className="space-y-4 flex flex-col justify-center">
              <NodeCard
                node={NODES_DATA["09"]}
                isActive={isNodeActiveInSim("09")}
                isHovered={hoveredNode === "09"}
                onHover={setHoveredNode}
                onClick={setActiveModalNode}
              />
              <div className="pl-4 space-y-3 border-l border-emerald-500/30 ml-2">
                <NodeCard
                  node={NODES_DATA["10"]}
                  isActive={isNodeActiveInSim("10")}
                  isHovered={hoveredNode === "10"}
                  onHover={setHoveredNode}
                  onClick={setActiveModalNode}
                />
                <NodeCard
                  node={NODES_DATA["11"]}
                  isActive={isNodeActiveInSim("11")}
                  isHovered={hoveredNode === "11"}
                  onHover={setHoveredNode}
                  onClick={setActiveModalNode}
                />
                <NodeCard
                  node={NODES_DATA["12"]}
                  isActive={isNodeActiveInSim("12")}
                  isHovered={hoveredNode === "12"}
                  onHover={setHoveredNode}
                  onClick={setActiveModalNode}
                />
              </div>
            </div>

            <div className="space-y-6 flex flex-col justify-between">
              <TrackerNodeCard
                node={NODES_DATA["13"]}
                isActive={isNodeActiveInSim("13")}
                isHovered={hoveredNode === "13"}
                onHover={setHoveredNode}
                onClick={setActiveModalNode}
              />
              <NodeCard
                node={NODES_DATA["14"]}
                isActive={isNodeActiveInSim("14")}
                isHovered={hoveredNode === "14"}
                onHover={setHoveredNode}
                onClick={setActiveModalNode}
              />
              <div className="pt-2 pl-4 border-l-2 border-amber-500/30 ml-2">
                <NodeCard
                  node={NODES_DATA["15"]}
                  isActive={false}
                  isHovered={hoveredNode === "15"}
                  onHover={setHoveredNode}
                  onClick={setActiveModalNode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-mono text-white uppercase tracking-wider">
            BUILT TO RUN IN THE BACKGROUND
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[#a1a1aa] max-w-3xl mx-auto font-light leading-relaxed">
            Your team shouldn&apos;t have to manually move the same piece of content through multiple platforms every day. We design systems that keep humans in control of quality while automation handles repetitive execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#121218] border border-white/10 rounded-xl p-6 space-y-3 hover:border-indigo-500/40 transition-colors">
            <span className="text-indigo-400 font-mono text-xs font-bold">01</span>
            <h3 className="text-base font-mono font-bold text-white">HUMAN CONTROL</h3>
            <p className="text-xs text-[#a1a1aa] font-sans font-light leading-relaxed">
              Content is reviewed and approved before it enters the automated publishing pipeline.
            </p>
          </div>

          <div className="bg-[#121218] border border-white/10 rounded-xl p-6 space-y-3 hover:border-blue-500/40 transition-colors">
            <span className="text-blue-400 font-mono text-xs font-bold">02</span>
            <h3 className="text-base font-mono font-bold text-white">SMART QUEUES</h3>
            <p className="text-xs text-[#a1a1aa] font-sans font-light leading-relaxed">
              Approved content is organized, ordered, and scheduled so the right content is processed at the right time.
            </p>
          </div>

          <div className="bg-[#121218] border border-white/10 rounded-xl p-6 space-y-3 hover:border-emerald-500/40 transition-colors">
            <span className="text-emerald-400 font-mono text-xs font-bold">03</span>
            <h3 className="text-base font-mono font-bold text-white">MULTI-PLATFORM</h3>
            <p className="text-xs text-[#a1a1aa] font-sans font-light leading-relaxed">
              One approved asset can move through a connected publishing pipeline across multiple social channels.
            </p>
          </div>

          <div className="bg-[#121218] border border-white/10 rounded-xl p-6 space-y-3 hover:border-purple-500/40 transition-colors">
            <span className="text-purple-400 font-mono text-xs font-bold">04</span>
            <h3 className="text-base font-mono font-bold text-white">RECOVERY BUILT IN</h3>
            <p className="text-xs text-[#a1a1aa] font-sans font-light leading-relaxed">
              Failures are recorded, partial publishing is visible, and exceptions can be sent back for human attention.
            </p>
          </div>
        </div>

        <div className="bg-[#0b0b0e] border border-indigo-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-mono text-xs font-bold text-white uppercase tracking-widest">
            <span className="px-3 py-1.5 rounded bg-white/5 border border-white/10">CONTENT</span>
            <FiArrowRight className="text-indigo-400" />
            <span className="px-3 py-1.5 rounded bg-indigo-500/20 border border-indigo-500/40 text-indigo-300">
              APPROVAL
            </span>
            <FiArrowRight className="text-indigo-400" />
            <span className="px-3 py-1.5 rounded bg-white/5 border border-white/10">AUTOMATION</span>
            <FiArrowRight className="text-indigo-400" />
            <span className="px-3 py-1.5 rounded bg-white/5 border border-white/10">DISTRIBUTION</span>
            <FiArrowRight className="text-indigo-400" />
            <span className="px-3 py-1.5 rounded bg-white/5 border border-white/10">TRACKING</span>
          </div>
          <p className="text-xs font-mono text-indigo-300 uppercase tracking-widest font-semibold pt-2">
            Human judgment where it matters. Automation everywhere else.
          </p>
        </div>

        <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-black border border-white/15 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-white uppercase tracking-tight">
            YOUR CONTENT PIPELINE CAN RUN LIKE THIS.
          </h2>
          <p className="text-xs sm:text-sm text-[#a1a1aa] font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Tell us what your team is doing manually. We&apos;ll map the process, automate the repetitive work, and keep humans in control where it matters.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 active:scale-95"
            >
              Automate My Workflow
            </a>
            <button
              onClick={runSimulation}
              className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-semibold transition-colors"
            >
              See How It Works
            </button>
          </div>
        </div>
      </div>

      {activeModalNode && (
        <NodeModal node={activeModalNode} onClose={() => setActiveModalNode(null)} />
      )}
    </section>
  );
}

// ============================================================================
// NODE CARDS COMPONENTS
// ============================================================================

function NodeCard({
  node,
  isActive,
  isHovered,
  onHover,
  onClick,
  isProminent = false,
}: {
  node: NodeDetail;
  isActive: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (node: NodeDetail) => void;
  isProminent?: boolean;
}) {
  const Icon = node.icon;

  const badgeStyles = {
    human: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    automated: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    truth: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    control: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    warning: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  }[node.badgeType];

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(node)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(node);
        }
      }}
      className={`relative rounded-xl border p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        isProminent
          ? "bg-indigo-950/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30"
          : "bg-[#121217] border-white/10 hover:border-white/25"
      } ${
        isActive
          ? "!border-indigo-400 !bg-indigo-950/40 ring-2 ring-indigo-400/50 scale-[1.02] shadow-2xl"
          : ""
      } ${isHovered ? "border-white/30 -translate-y-0.5" : ""}`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#a1a1aa] font-bold tracking-widest">
            {node.number}
          </span>
          <span
            className={`px-2 py-0.5 rounded border font-mono text-[9px] uppercase font-semibold ${badgeStyles}`}
          >
            {node.badge}
          </span>
        </div>

        <div className="flex items-center space-x-2.5">
          <div
            className={`p-2 rounded-lg ${
              isProminent ? "bg-indigo-600 text-white" : "bg-white/5 text-indigo-400"
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-mono font-bold text-white tracking-tight leading-snug">
            {node.title}
          </h3>
        </div>

        <ul className="space-y-1 pt-1 border-t border-white/5">
          {node.items.map((item, idx) => (
            <li
              key={idx}
              className="text-[11px] font-sans text-[#a1a1aa] font-light flex items-center space-x-1.5"
            >
              <span className="w-1 h-1 rounded-full bg-indigo-400/60 shrink-0"></span>
              <span className="truncate">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#71717a]">
        <span>CLICK FOR SPECS</span>
        <FiInfo className="w-3 h-3 hover:text-white transition-colors" />
      </div>
    </div>
  );
}

function QueueNodeCard({
  node,
  isActive,
  isHovered,
  onHover,
  onClick,
  queueItems,
}: {
  node: NodeDetail;
  isActive: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (node: NodeDetail) => void;
  queueItems: QueueItem[];
}) {
  const Icon = node.icon;

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(node)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(node);
        }
      }}
      className={`relative rounded-xl border p-4 transition-all duration-300 cursor-pointer bg-[#121217] border-emerald-500/30 hover:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
        isActive ? "ring-2 ring-emerald-400 border-emerald-400 bg-emerald-950/20 scale-[1.02]" : ""
      } ${isHovered ? "-translate-y-0.5" : ""}`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#a1a1aa] font-bold tracking-widest">
            {node.number}
          </span>
          <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/20 text-emerald-300 font-mono text-[9px] uppercase font-bold">
            {node.badge}
          </span>
        </div>

        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold text-white tracking-tight">
              {node.title}
            </h3>
            <span className="text-[10px] font-mono text-[#a1a1aa]">OPERATIONAL DATABASE</span>
          </div>
        </div>

        <div className="bg-black/60 rounded-lg p-2.5 border border-white/10 space-y-1.5 font-mono text-[10px]">
          {queueItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-1 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center space-x-2 truncate">
                <span className="text-[#71717a] font-bold">{item.id}</span>
                <span className="text-[#e4e4e7] truncate max-w-[110px]">{item.title}</span>
              </div>
              <span
                className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                  item.status === "POSTED"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : item.status === "PROCESSING"
                    ? "bg-indigo-500/20 text-indigo-300 animate-pulse"
                    : "bg-white/10 text-[#a1a1aa]"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[#a1a1aa]">
          <span>FIFO QUEUE LOGIC</span>
          <span className="text-emerald-400 font-bold">MUTEX LOCKED</span>
        </div>
      </div>
    </div>
  );
}

function SchedulerNodeCard({
  node,
  isActive,
  isHovered,
  onHover,
  onClick,
}: {
  node: NodeDetail;
  isActive: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (node: NodeDetail) => void;
}) {
  const Icon = node.icon;

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(node)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(node);
        }
      }}
      className={`relative rounded-xl border p-4 transition-all duration-300 cursor-pointer bg-[#121217] border-white/10 hover:border-white/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        isActive ? "ring-2 ring-indigo-400 border-indigo-400 bg-indigo-950/20 scale-[1.02]" : ""
      } ${isHovered ? "-translate-y-0.5" : ""}`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#a1a1aa] font-bold">{node.number}</span>
          <span className="px-2 py-0.5 rounded border border-blue-500/30 bg-blue-500/20 text-blue-300 font-mono text-[9px] uppercase font-bold">
            {node.badge}
          </span>
        </div>

        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-mono font-bold text-white">{node.title}</h3>
        </div>

        <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px] text-center">
          <div
            className={`p-1.5 rounded border ${
              isActive
                ? "bg-indigo-600 text-white border-indigo-400 font-bold animate-pulse"
                : "bg-white/5 border-white/10 text-[#a1a1aa]"
            }`}
          >
            09:00 ●
          </div>
          <div className="p-1.5 rounded bg-white/5 border border-white/10 text-[#a1a1aa]">
            13:00
          </div>
          <div className="p-1.5 rounded bg-white/5 border border-white/10 text-[#a1a1aa]">
            19:00
          </div>
        </div>

        <div className="text-[10px] font-mono text-[#a1a1aa] text-center">
          CLIENT TIMEZONE SYNCHRONIZED
        </div>
      </div>
    </div>
  );
}

function TrackerNodeCard({
  node,
  isActive,
  isHovered,
  onHover,
  onClick,
}: {
  node: NodeDetail;
  isActive: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (node: NodeDetail) => void;
}) {
  const Icon = node.icon;

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(node)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(node);
        }
      }}
      className={`relative rounded-xl border p-4 transition-all duration-300 cursor-pointer bg-[#121217] border-purple-500/30 hover:border-purple-500/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
        isActive ? "ring-2 ring-purple-400 border-purple-400 bg-purple-950/20 scale-[1.02]" : ""
      } ${isHovered ? "-translate-y-0.5" : ""}`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#a1a1aa] font-bold">{node.number}</span>
          <span className="px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/20 text-purple-300 font-mono text-[9px] uppercase font-bold">
            {node.badge}
          </span>
        </div>

        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-mono font-bold text-white">{node.title}</h3>
        </div>

        <div className="bg-black/60 rounded-lg p-2 border border-white/10 space-y-1 font-mono text-[10px]">
          <div className="flex justify-between text-emerald-400">
            <span>YouTube</span>
            <span>✓ SUCCESS</span>
          </div>
          <div className="flex justify-between text-emerald-400">
            <span>Instagram</span>
            <span>✓ SUCCESS</span>
          </div>
          <div className="flex justify-between text-emerald-400">
            <span>TikTok</span>
            <span>✓ SUCCESS</span>
          </div>
        </div>

        <div className="text-[10px] font-mono text-[#a1a1aa]">PERMALINKS RECORDED</div>
      </div>
    </div>
  );
}

// ============================================================================
// MODAL DRAWER COMPONENT
// ============================================================================

function NodeModal({ node, onClose }: { node: NodeDetail; onClose: () => void }) {
  const Icon = node.icon;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative max-w-lg w-full bg-[#121218] border border-white/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                NODE {node.number} • {node.category}
              </span>
              <h2 id="modal-title" className="text-lg font-mono font-bold text-white">
                {node.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="p-1.5 text-[#a1a1aa] hover:text-white rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono text-[#a1a1aa] uppercase font-bold tracking-widest">
            FUNCTIONAL RATIONALE
          </span>
          <p className="text-xs sm:text-sm font-sans text-[#e4e4e7] font-light leading-relaxed">
            {node.description}
          </p>
        </div>

        <div className="space-y-2 pt-2 border-t border-white/10">
          <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-widest">
            TECHNICAL ARCHITECTURE & SPECIFICATIONS
          </span>
          <ul className="space-y-2">
            {node.technicalDetails.map((detail, idx) => (
              <li
                key={idx}
                className="text-xs font-sans text-[#a1a1aa] font-light flex items-start space-x-2"
              >
                <FiCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-mono text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
}