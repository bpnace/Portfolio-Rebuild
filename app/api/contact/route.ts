import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

type ContactPayload = {
  name?: string;
  email?: string;
  project?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const project = String(payload.project ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json(
      { message: "Bitte gib einen gültigen Namen ein." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Bitte gib eine gültige E-Mail-Adresse ein." },
      { status: 400 },
    );
  }

  if (project.length < 20) {
    return NextResponse.json(
      {
        message:
          "Beschreibe das Projekt bitte etwas genauer, damit wir sinnvoll antworten können.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const targetEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;

  if (!apiKey) {
    return NextResponse.json(
      {
        message:
          "Die Anfrage wurde validiert. Der Mailversand ist in dieser Umgebung noch nicht aktiviert.",
      },
      { status: 202 },
    );
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "Stackwerkhaus <onboarding@resend.dev>",
    to: targetEmail,
    replyTo: email,
    subject: `Neue Projektanfrage von ${name}`,
    text: `Name: ${name}\nE-Mail: ${email}\n\nProjekt:\n${project}`,
  });

  return NextResponse.json({
    message: "Danke. Die Anfrage wurde gesendet und wir melden uns zeitnah.",
  });
}
