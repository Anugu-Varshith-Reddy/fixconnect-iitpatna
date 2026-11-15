import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const required = ["name", "phone", "hostel", "category", "details"];
    for (const key of required) if (!String(form.get(key) || "").trim()) {
      return NextResponse.json({ error: `Please provide ${key}.` }, { status: 400 });
    }
    const proof = form.get("paymentProof");
    if (!(proof instanceof File) || proof.size === 0) {
      return NextResponse.json({ error: "Payment screenshot is required." }, { status: 400 });
    }
    if (proof.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Payment proof must be smaller than 8 MB." }, { status: 400 });
    }
    const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, FIXCONNECT_TEAM_EMAILS } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !FIXCONNECT_TEAM_EMAILS) {
      return NextResponse.json({ error: "Email delivery is not configured yet. Please contact the FixConnect team directly." }, { status: 503 });
    }
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST, port: Number(SMTP_PORT || 465),
      secure: SMTP_SECURE !== "false", auth: { user: SMTP_USER, pass: SMTP_PASS }
    });
    const recipients = FIXCONNECT_TEAM_EMAILS.split(",").map(x => x.trim()).filter(Boolean);
    const lines = ["New FixConnect repair request", ...required.map(k => `${k}: ${form.get(k)}`),
      `Email: ${form.get("email") || "Not provided"}`, `Best time: ${form.get("time") || "Anytime"}`,
      `Services basket: ${form.get("services") || "None"}`, `UTR: ${form.get("utr") || "Not provided"}`,
      `Booking fee: ₹50 (payment proof attached)`, "", `Issue: ${form.get("details")}`];
    await transporter.sendMail({
      from: `"FixConnect Requests" <${SMTP_USER}>`, to: recipients,
      subject: `New repair request — ${form.get("name")} (${form.get("category")})`,
      text: lines.join("\n"),
      attachments: [{ filename: proof.name || "payment-proof", content: Buffer.from(await proof.arrayBuffer()), contentType: proof.type || "application/octet-stream" }]
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("FixConnect request error:", error);
    return NextResponse.json({ error: "Could not send the request. Please try again or email the team." }, { status: 500 });
  }
}