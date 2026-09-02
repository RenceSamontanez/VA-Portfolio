"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaStar, FaGoogle } from "react-icons/fa";
import {
  FiX,
  FiMessageSquare,
  FiCheckCircle,
  FiPlus,
  FiUser,
  FiAlertCircle,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { BsQuote } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [avgRating, setAvgRating] = useState<string>("5.0");
  const [total, setTotal] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [comment, setComment] = useState("");

  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [avatarErrorMap, setAvatarErrorMap] = useState<Record<string | number, boolean>>({});
  const [sessionAvatarError, setSessionAvatarError] = useState(false);

  const fetchTestimonials = async () => {
    try {
      setApiError(null);
      const res = await fetch("/api/feedback", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        let errorMessage = `Server responded with status ${res.status}`;
        try {
          const errJson = await res.json();
          if (errJson?.error) errorMessage = errJson.error;
        } catch (_) {}
        setApiError(errorMessage);
        return;
      }

      const text = await res.text();
      if (!text || !text.trim()) return;

      let data: any;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        return;
      }

      const rawList = Array.isArray(data) ? data : data.testimonials || [];

      const mapped: Testimonial[] = rawList.map((item: any) => ({
        id: item.id || Math.random().toString(),
        name: item.author || item.name || "Anonymous",
        role: item.role || "Client",
        company: item.company || "",
        avatar: item.avatar || "",
        rating: Number(item.rating) || 5,
        comment: item.content || item.comment || "",
        date: item.created_at || "",
      }));

      setTestimonials(mapped);
      setTotal(mapped.length);

      if (mapped.length > 0) {
        const sum = mapped.reduce((acc, curr) => acc + curr.rating, 0);
        setAvgRating((sum / mapped.length).toFixed(1));
      } else {
        setAvgRating("5.0");
      }
    } catch (err: any) {
      setApiError(err?.message || "Network Error");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      ScrollTrigger.refresh();

      gsap.fromTo(
        ".testimonials-header",
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
        ".testimonials-ticker-container",
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

  // Standard Google Sign In (triggers normal page refresh on return)
  const handleSignIn = async () => {
    setIsAuthLoading(true);
    await signIn("google");
  };

  // Sign Out guaranteed to stay on #testimonials section
  const handleSignOut = async () => {
    setIsAuthLoading(true);
    await signOut({ redirect: false });
    setIsAuthLoading(false);

    if (typeof window !== "undefined") {
      window.location.hash = "testimonials";
      const testimonialsEl = document.getElementById("testimonials");
      if (testimonialsEl) {
        testimonialsEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    setSubmitting(true);
    setApiError(null);

    try {
      const payload: Record<string, any> = {
        author: session.user.name || "Anonymous",
        role: role.trim() || "Client",
        rating: Number(rating) || 5,
        content: comment.trim(),
        avatar: session.user.image || "",
      };

      if (company.trim()) {
        payload.company = company.trim();
      }

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmittedSuccess(true);
        setComment("");
        setRole("");
        setCompany("");
        await fetchTestimonials();
        setTimeout(() => {
          setSubmittedSuccess(false);
          setIsModalOpen(false);
        }, 2000);
      } else {
        let errorMessage = `Status ${res.status}`;
        try {
          const errJson = await res.json();
          if (errJson?.error) errorMessage = errJson.error;
        } catch (_) {}
        setApiError(`Submission failed: ${errorMessage}`);
      }
    } catch (err: any) {
      setApiError(`Submission failed: ${err?.message || "Network error"}`);
    } finally {
      setSubmitting(false);
    }
  };

  const displayList =
    testimonials.length > 0
      ? testimonials.length < 3
        ? [...testimonials, ...testimonials, ...testimonials, ...testimonials]
        : [...testimonials, ...testimonials]
      : [];

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative w-full bg-[#030303] text-white py-28 px-6 sm:px-12 lg:px-20 overflow-hidden font-sans border-t border-white/10"
    >
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8">
        {apiError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs font-mono flex items-center space-x-3">
            <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>Backend API Notice: {apiError}.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="testimonials-header lg:col-span-5 space-y-8 z-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-semibold tracking-wider uppercase">
              <HiSparkles className="w-3.5 h-3.5" />
              <span>
                ★ {avgRating} / 5.0 ({total} VERIFIED REVIEWS)
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Trusted by teams who{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-sky-400">
                move fast
              </span>
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-lg">
              Reduce technical friction, optimize performance, and empower your engineering workflow — engineered for scale and speed.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] cursor-pointer"
              >
                <FiPlus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                <span>Leave Feedback</span>
              </button>
            </div>
          </div>

          <div className="testimonials-ticker-container lg:col-span-7 relative h-[520px] overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-20 pointer-events-none" />

            {isFetching ? (
              <div className="space-y-4 animate-pulse p-2">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 rounded-full bg-white/10" />
                      <div className="space-y-2">
                        <div className="h-3 w-32 bg-white/10 rounded" />
                        <div className="h-2 w-20 bg-white/5 rounded" />
                      </div>
                    </div>
                    <div className="h-3 w-full bg-white/10 rounded" />
                    <div className="h-3 w-2/3 bg-white/5 rounded" />
                  </div>
                ))}
              </div>
            ) : displayList.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-neutral-900/40 border border-white/10 space-y-4">
                <p className="text-sm font-mono text-zinc-400">No testimonials yet.</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs font-mono text-sky-400 hover:underline"
                >
                  Be the first to leave feedback →
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-vertical-infinite-scroll group-hover:[animation-play-state:paused]">
                {displayList.map((item, idx) => {
                  const hasValidAvatar = item.avatar && !avatarErrorMap[`${item.id}-${idx}`];

                  return (
                    <div
                      key={`${item.id}-${idx}`}
                      className="p-6 sm:p-7 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-white/10 hover:border-sky-500/40 transition-all duration-300 shadow-xl space-y-4 relative"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3.5">
                          {hasValidAvatar ? (
                            <img
                              src={item.avatar}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              onError={() =>
                                setAvatarErrorMap((prev) => ({
                                  ...prev,
                                  [`${item.id}-${idx}`]: true,
                                }))
                              }
                              className="w-11 h-11 rounded-full object-cover border border-white/10"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
                              <FiUser className="w-5 h-5 text-zinc-400" />
                            </div>
                          )}

                          <div>
                            <h3 className="text-sm font-bold text-white tracking-wide">
                              {item.name}
                            </h3>
                            <p className="text-xs text-zinc-400 font-mono">
                              {item.role}
                              {item.company ? `, ${item.company}` : ""}
                            </p>
                          </div>
                        </div>

                        <BsQuote className="w-7 h-7 text-sky-400 opacity-90 shrink-0" />
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-light">
                        &quot;{item.comment}&quot;
                      </p>

                      <div className="flex items-center space-x-1 pt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-3 h-3 ${
                              i < item.rating ? "text-sky-400" : "text-white/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-neutral-950 border border-white/15 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative font-sans">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2 text-sky-400">
                <FiMessageSquare className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold">
                  SUBMIT FEEDBACK
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {isAuthLoading ? (
              <div className="py-8 space-y-4 animate-pulse">
                <div className="w-12 h-12 bg-white/10 rounded-full mx-auto" />
                <div className="h-4 bg-white/10 rounded w-3/4 mx-auto" />
                <div className="h-3 bg-white/5 rounded w-1/2 mx-auto" />
                <div className="h-12 bg-white/10 rounded-xl w-full pt-4" />
              </div>
            ) : !session ? (
              <div className="text-center py-6 space-y-6">
                <div className="p-4 bg-white/5 rounded-full w-16 h-16 mx-auto flex items-center justify-center text-white">
                  <FaGoogle className="w-8 h-8 text-sky-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white font-mono uppercase">
                    AUTHENTICATE WITH GMAIL
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                    Sign in with Gmail to verify your profile picture and name before submitting feedback.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="inline-flex items-center justify-center space-x-3 px-6 py-3.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-200 transition-colors w-full cursor-pointer"
                >
                  <FaGoogle className="w-4 h-4" />
                  <span>SIGN IN WITH GMAIL</span>
                </button>
              </div>
            ) : submittedSuccess ? (
              <div className="py-12 text-center space-y-3">
                <FiCheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-white uppercase font-mono">
                  FEEDBACK PUBLISHED
                </h3>
                <p className="text-xs text-emerald-300">
                  Thank you, {session.user?.name}! Your testimonial is live.
                </p>
              </div>
            ) : submitting ? (
              <div className="py-6 space-y-5 animate-pulse">
                <div className="p-4 rounded-xl bg-white/5 border border-sky-500/30 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/20" />
                    <div className="space-y-1">
                      <div className="h-3 w-24 bg-white/20 rounded" />
                      <div className="h-2 w-16 bg-white/10 rounded" />
                    </div>
                  </div>
                  <div className="h-3 w-full bg-white/15 rounded" />
                  <div className="h-3 w-4/5 bg-white/10 rounded" />
                </div>
                <div className="text-center text-xs font-mono text-sky-400">
                  PUBLISHING YOUR FEEDBACK...
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 p-3 rounded-xl">
                  <div className="flex items-center space-x-3">
                    {session.user?.image && !sessionAvatarError ? (
                      <img
                        src={session.user.image}
                        alt="Avatar"
                        referrerPolicy="no-referrer"
                        onError={() => setSessionAvatarError(true)}
                        className="w-8 h-8 rounded-full border border-white/20 object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                        <FiUser className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-mono font-bold text-white block">
                        {session.user?.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 block">
                        {session.user?.email}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="text-[10px] text-red-400 hover:underline font-mono cursor-pointer"
                  >
                    SIGN OUT
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                    YOUR RATING
                  </label>
                  <div className="flex items-center space-x-2 text-sky-400">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const starValue = idx + 1;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 cursor-pointer focus:outline-none transition-transform hover:scale-110"
                        >
                          <FaStar
                            className={`w-5 h-5 ${
                              starValue <= (hoverRating || rating)
                                ? "text-sky-400"
                                : "text-zinc-700"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                      ROLE / TITLE
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CEO, Developer"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl p-3 text-white placeholder-zinc-600 focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                      COMPANY / ORG
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Inc."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl p-3 text-white placeholder-zinc-600 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                    YOUR FEEDBACK *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share your experience working together..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl p-3 text-white placeholder-zinc-600 focus:outline-none focus:border-sky-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest font-mono rounded-xl transition-colors disabled:opacity-50 cursor-pointer shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                >
                  PUBLISH FEEDBACK
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes vertical-infinite-scroll {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-vertical-infinite-scroll {
          animation: vertical-infinite-scroll 24s linear infinite;
        }
      `}</style>
    </section>
  );
}