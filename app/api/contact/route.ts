import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["rencesamontanez@gmail.com"],
      replyTo: email,
      subject: `New Portfolio Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                background-color: #0f172a;
                margin: 0;
                padding: 40px 20px;
                color: #e2e8f0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background: #1e293b;
                border: 1px solid #334155;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
              }
              .header {
                background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                padding: 24px 32px;
                display: flex;
                align-items: center;
                justify-content: space-between;
              }
              .logo {
                font-size: 24px;
                font-weight: 800;
                color: #ffffff;
                letter-spacing: -0.5px;
                margin: 0;
              }
              .logo span {
                color: #38bdf8;
              }
              .badge {
                background: rgba(255, 255, 255, 0.2);
                color: #ffffff;
                font-size: 12px;
                padding: 4px 10px;
                border-radius: 9999px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .content {
                padding: 32px;
              }
              .field-group {
                margin-bottom: 20px;
              }
              .label {
                font-size: 12px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                color: #94a3b8;
                margin-bottom: 6px;
              }
              .value {
                font-size: 16px;
                color: #f8fafc;
                font-weight: 500;
              }
              .value a {
                color: #60a5fa;
                text-decoration: none;
              }
              .message-box {
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 8px;
                padding: 16px;
                margin-top: 8px;
                color: #cbd5e1;
                font-size: 15px;
                line-height: 1.6;
                white-space: pre-wrap;
              }
              .footer {
                padding: 16px 32px;
                background: #0f172a;
                border-top: 1px solid #334155;
                text-align: center;
                font-size: 12px;
                color: #64748b;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="logo">Solo<span>X</span></h1>
                <span class="badge">New Inquiry</span>
              </div>
              <div class="content">
                <div class="field-group">
                  <div class="label">Sender Name</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field-group">
                  <div class="label">Email Address</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field-group">
                  <div class="label">Message</div>
                  <div class="message-box">${message}</div>
                </div>
              </div>
              <div class="footer">
                Sent automatically via SoloX Portfolio Contact System
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}