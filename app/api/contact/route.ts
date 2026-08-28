import { Resend } from "resend";
import { cookies } from "next/headers";

// Provide a fallback empty string so the constructor doesn't crash during build time evaluation
const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder_for_build");
const RATE_LIMIT_DURATION = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

export async function POST(req: Request) {
  // Check runtime key existence
  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { error: "RESEND_API_KEY environment variable is missing." },
      { status: 500 }
    );
  }

  try {
    const cookieStore = await cookies();
    const lastSentCookie = cookieStore.get("contact_rate_limit");

    if (lastSentCookie) {
      const lastSentTime = parseInt(lastSentCookie.value, 10);
      const timeElapsed = Date.now() - lastSentTime;

      if (timeElapsed < RATE_LIMIT_DURATION) {
        const remainingMinutes = Math.ceil(
          (RATE_LIMIT_DURATION - timeElapsed) / (1000 * 60)
        );
        const hours = Math.floor(remainingMinutes / 60);
        const mins = remainingMinutes % 60;
        const timeString = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

        return Response.json(
          {
            error: `Rate limit reached. You can only send one message every 3 hours. Please try again in ${timeString}.`,
          },
          { status: 429 }
        );
      }
    }

    const { name, email, message } = await req.json();

    if (!email || !message) {
      return Response.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.MY_EMAIL || "your_actual_email@example.com"],
      subject: `New Portfolio Inquiry from ${name || "Anonymous"}`,
      replyTo: email,
      html: `
        <div style="font-family: monospace; background-color: #0a0a0a; color: #ffffff; padding: 20px; border-radius: 8px;">
          <h2 style="color: #818cf8;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name || "N/A"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border-color: #333;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; color: #d4d4d8;">${message}</p>
        </div>
      `,
    });

    // Set cookie for 3 hours (10,800 seconds)
    const response = Response.json({ success: true, data });
    // @ts-ignore: Response may not have cookies in edge runtime, but in Node.js it does
    response.cookies?.set?.("contact_rate_limit", Date.now().toString(), {
      maxAge: 10800,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch {
    return Response.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}