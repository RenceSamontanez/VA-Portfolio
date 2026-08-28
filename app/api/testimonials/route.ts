import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

interface Testimonial {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
}

// In-memory array for live submissions
const testimonials: Testimonial[] = [];

export async function GET() {
  const total = testimonials.length;
  const avgRating =
    total > 0
      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / total).toFixed(1)
      : "5.0";

  return NextResponse.json({ testimonials, avgRating, total });
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: "Unauthorized. You must sign in with a valid Gmail account." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { role, company, rating, comment } = body;

    if (!rating || !comment) {
      return NextResponse.json(
        { error: "Rating and feedback comment are required." },
        { status: 400 }
      );
    }

    const newFeedback: Testimonial = {
      id: Date.now().toString(),
      name: (session.user.name || "VERIFIED USER").toUpperCase(),
      email: session.user.email,
      role: role ? role.toUpperCase() : "VERIFIED CLIENT",
      company: company || "",
      avatar: session.user.image || undefined,
      rating: Number(rating),
      comment: comment.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    testimonials.unshift(newFeedback);

    const total = testimonials.length;
    const avgRating = (
      testimonials.reduce((sum, t) => sum + t.rating, 0) / total
    ).toFixed(1);

    return NextResponse.json({
      success: true,
      testimonials,
      avgRating,
      total,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit feedback. Please try again." },
      { status: 500 }
    );
  }
}