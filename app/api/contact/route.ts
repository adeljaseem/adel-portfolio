import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_384;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  website?: unknown;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function jsonError(status: number, code: string, message: string) {
  return NextResponse.json({ ok: false, code, message }, { status });
}

export async function POST(request: NextRequest) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return jsonError(413, "PAYLOAD_TOO_LARGE", "The submitted message is too large.");
  }

  let body: ContactPayload;
  try {
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return jsonError(413, "PAYLOAD_TOO_LARGE", "The submitted message is too large.");
    }
    const parsedBody: unknown = JSON.parse(rawBody);
    if (
      !parsedBody ||
      typeof parsedBody !== "object" ||
      Array.isArray(parsedBody)
    ) {
      return jsonError(
        400,
        "INVALID_PAYLOAD",
        "Please submit a valid form payload.",
      );
    }
    body = parsedBody as ContactPayload;
  } catch {
    return jsonError(400, "INVALID_JSON", "Please submit a valid form payload.");
  }

  const name = asTrimmedString(body.name);
  const email = asTrimmedString(body.email).toLowerCase();
  const company = asTrimmedString(body.company);
  const message = asTrimmedString(body.message);
  const website = asTrimmedString(body.website);

  // A filled hidden field is treated as bot traffic, but returns a neutral success response.
  if (website) {
    return NextResponse.json({ ok: true, message: "Message received." });
  }

  if (name.length < 2 || name.length > 80) {
    return jsonError(
      422,
      "INVALID_NAME",
      "Please provide a name between 2 and 80 characters.",
    );
  }

  if (!emailPattern.test(email) || email.length > 160) {
    return jsonError(422, "INVALID_EMAIL", "Please provide a valid email address.");
  }

  if (company.length > 120 || message.length < 20 || message.length > 3_000) {
    return jsonError(
      422,
      "INVALID_MESSAGE",
      "Please provide a message between 20 and 3,000 characters.",
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return jsonError(
      503,
      "NOT_CONFIGURED",
      "The hosted form is not configured yet. Please use WhatsApp or the direct email link instead.",
    );
  }

  const subjectName = name.replace(/[\r\n\t]+/g, " ").slice(0, 80);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company || "Not provided");
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry from ${subjectName}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company/context: ${company || "Not provided"}`,
          "",
          message,
        ].join("\n"),
        html: [
          '<div style="font-family:Inter,Arial,sans-serif;line-height:1.65;color:#172033">',
          '<h2 style="margin:0 0 16px">New portfolio enquiry</h2>',
          `<p><strong>Name:</strong> ${safeName}</p>`,
          `<p><strong>Email:</strong> ${safeEmail}</p>`,
          `<p><strong>Company/context:</strong> ${safeCompany}</p>`,
          '<hr style="border:0;border-top:1px solid #d9e0e8;margin:24px 0" />',
          `<p>${safeMessage}</p>`,
          "</div>",
        ].join(""),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const providerError = await response.text();
      console.error(
        "Contact email provider error",
        response.status,
        providerError.slice(0, 500),
      );
      return jsonError(
        502,
        "PROVIDER_ERROR",
        "The message could not be sent right now. Please use WhatsApp or the direct email link instead.",
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Message sent. Thanks — I’ll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return jsonError(
      502,
      "DELIVERY_FAILED",
      "The message could not be sent right now. Please use WhatsApp or the direct email link instead.",
    );
  }
}
