"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const projectType = formData.get("projectType") as string;
  const budget = formData.get("budget") as string;
  const timeline = formData.get("timeline") as string;
  const description = formData.get("description") as string;

  if (!name || !email || !description) {
    return { success: false, error: "Please fill out all required fields." };
  }

  try {
    await resend.emails.send({
      from: "Portfolio Inquiry <onboarding@resend.dev>",
      to: "rence@example.com", // Replace with your real email
      subject: `New Inquiry: ${name} [${projectType || "General"}]`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Project Type: ${projectType || "N/A"}
Budget: ${budget || "N/A"}
Timeline: ${timeline || "N/A"}

Project Description:
${description}
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("Resend Error:", err);
    return { success: false, error: "Failed to send email inquiry." };
  }
}