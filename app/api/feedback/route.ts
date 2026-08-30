import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;
  return createClient(url, key);
}

// Handles GET requests (Fetching Testimonials)
export async function GET() {
  const supabase = getSupabase();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase environment variables missing in .env.local" },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || [], { status: 200 });
}

// Handles POST requests (Submitting Testimonials)
export async function POST(req: Request) {
  const supabase = getSupabase();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase environment variables missing in .env.local" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();

    const insertPayload: Record<string, any> = {
      author: body.author || "Anonymous",
      role: body.role || "Client",
      rating: Number(body.rating) || 5,
      content: body.content || "",
      avatar: body.avatar || "",
    };

    if (body.company) {
      insertPayload.company = body.company;
    }

    const { data, error } = await supabase
      .from("feedback")
      .insert([insertPayload])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Invalid payload" },
      { status: 400 }
    );
  }
}