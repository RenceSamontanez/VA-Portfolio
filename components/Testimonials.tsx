"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaStar, FaGoogle } from "react-icons/fa";
import {
  FiArrowRight,
  FiX,
  FiMessageSquare,
  FiCheckCircle,
  FiPlusCircle,
  FiUser,
  FiAlertCircle,
} from "react-icons/fi";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // State to track image loading errors
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
        } catch (_) {
          // Response was not JSON
        }
        console.error("Failed to fetch feedback:", errorMessage);
        setApiError(errorMessage);
        return;
      }

      const text = await res.text();
      if (!text || !text.trim()) {
        console.warn("API returned an empty response.");
        return;
      }

      let data: any;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error("API did not return valid JSON. Response body received:", text);
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
      console.error("Failed to fetch feedback network error:", err);
      setApiError(err?.message || "Network Error");
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
        ".testimonials-scroll-container",
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
        console.error("Failed to submit feedback:", errorMessage);
        setApiError(`Submission failed: ${errorMessage}`);
      }
    } catch (err: any) {
      console.error("Failed to submit feedback", err);
      setApiError(`Submission failed: ${err?.message || "Network error"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] text-[#f5f5f7] font-mono py-28 px-6 sm:px-12 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="testimonials-header flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-[#a1a1aa] text-xs font-mono uppercase tracking-widest">
              <span>SOCIAL PROOF</span>
              <span className="text-[#818cf8] font-bold">
                ★ {avgRating} / 5.0 ({total} REVIEWS)
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase font-mono">
              TESTIMONIALS
            </h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-white hover:text-[#818cf8] transition-colors border-b border-transparent hover:border-[#818cf8] pb-1 cursor-pointer"
          >
            <span>LEAVE FEEDBACK</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Display Backend Route Error Notice if 500 fails */}
        {apiError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs font-mono flex items-center space-x-3">
            <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>Backend API Error: {apiError}. Verify `app/api/feedback/route.ts` and Supabase keys.</span>
          </div>
        )}

        {/* Scrollable Testimonials Area */}
        <div className="testimonials-scroll-container max-h-[460px] overflow-y-auto pr-2 space-y-8 scrollbar-thin scrollbar-thumb-[#818cf8]/40 scrollbar-track-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {testimonials.map((item) => {
              const hasValidAvatar = item.avatar && !avatarErrorMap[item.id];

              return (
                <div
                  key={item.id}
                  className="bg-[#0a0a0d] border border-white/10 p-6 rounded-2xl space-y-5 hover:border-white/20 transition-colors"
                >
                  {/* Rating & Profile Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-[#818cf8]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < item.rating ? "text-[#818cf8]" : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Profile Picture render with fallback */}
                    {hasValidAvatar ? (
                      <img
                        src={item.avatar}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setAvatarErrorMap((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className="w-9 h-9 rounded-full border border-white/20 object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
                        <FiUser className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Comment */}
                  <p className="text-sm font-sans font-normal text-white leading-relaxed min-h-[60px]">
                    &quot;{item.comment}&quot;
                  </p>

                  {/* Client Info */}
                  <div className="space-y-0.5 font-mono text-xs border-t border-white/5 pt-3">
                    <div className="text-[#a1a1aa] tracking-wider uppercase">
                      {item.name} <span className="text-white/30">—</span> {item.role}
                    </div>
                    {item.company && (
                      <div className="text-[#818cf8] text-[11px]">
                        {item.company}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* End of List CTA Card */}
            <a
              href="#contact"
              className="group bg-[#0a0a0d] border-2 border-dashed border-[#818cf8]/40 hover:border-[#818cf8] p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 transition-all duration-300 min-h-[220px]"
            >
              <div className="p-3 bg-[#818cf8]/10 rounded-full text-[#818cf8] group-hover:scale-110 transition-transform">
                <FiPlusCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  BE MY PARTNER NOW
                </h3>
                <p className="text-xs text-[#a1a1aa] font-sans max-w-xs">
                  Ready to start a new project together? Get in touch to build something amazing.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* FEEDBACK MODAL WITH GMAIL AUTH */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0a0a0d] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative font-mono">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2 text-[#818cf8]">
                <FiMessageSquare className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-bold">
                  SUBMIT FEEDBACK
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Google Authorization Check */}
            {!session ? (
              <div className="text-center py-8 space-y-6 font-sans">
                <div className="p-4 bg-white/5 rounded-full w-16 h-16 mx-auto flex items-center justify-center text-white">
                  <FaGoogle className="w-8 h-8 text-[#818cf8]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white font-mono uppercase">
                    AUTHENTICATE WITH GMAIL
                  </h3>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed max-w-xs mx-auto">
                    To display your verified Google profile picture and name, sign in with your Gmail account.
                  </p>
                </div>
                <button
                  onClick={() => signIn("google")}
                  className="inline-flex items-center justify-center space-x-3 px-6 py-3.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gray-200 transition-colors w-full cursor-pointer"
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
                <p className="text-xs font-sans text-emerald-300">
                  Thank you, {session.user?.name}! Your testimonial is now live.
                </p>
              </div>
            ) : (
              /* FEEDBACK FORM */
              <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs">
                {/* User Session Info */}
                <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 p-3 rounded-lg">
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
                      <span className="text-[10px] text-[#71717a] block">
                        {session.user?.email}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="text-[10px] text-red-400 hover:underline font-mono cursor-pointer"
                  >
                    SIGN OUT
                  </button>
                </div>

                {/* Star Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1aa] block">
                    YOUR RATING
                  </label>
                  <div className="flex items-center space-x-2 text-[#818cf8]">
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
                            className={`w-6 h-6 ${
                              starValue <= (hoverRating || rating)
                                ? "text-[#818cf8]"
                                : "text-white/20"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1aa] block">
                      ROLE / TITLE
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CEO, Product Lead"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-3 text-white placeholder-[#52525b] focus:outline-none focus:border-[#818cf8]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1aa] block">
                      COMPANY / ORG
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Inc."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-3 text-white placeholder-[#52525b] focus:outline-none focus:border-[#818cf8]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1aa] block">
                    YOUR FEEDBACK
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share your experience working together..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-3 text-white placeholder-[#52525b] focus:outline-none focus:border-[#818cf8] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#818cf8] hover:bg-[#6366f1] text-black font-bold uppercase tracking-widest font-mono rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "POSTING..." : "PUBLISH FEEDBACK"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}