"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/validation/contactSchema";

export type ContactState = { ok: boolean; error?: string | null };

export async function sendContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  try {
    const raw = Object.fromEntries(formData) as Record<string, unknown>;
    // Validate on the server for safety
    const values = await contactSchema.validate(raw, { abortEarly: false });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
    if (!TO_EMAIL) return { ok: false, error: "Server not configured (TO)" };

    const subject = `New contact form: ${values.fullName}`;
    const text = [
      `Name: ${values.fullName}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email ?? "—"}`,
      "",
      "Message:",
      values.message,
    ].join("\n");

    const { error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // must be verified in Resend
      to: TO_EMAIL,
      subject,
      text,
    });

    if (error) return { ok: false, error: String(error) };
    return { ok: true, error: null };
  } catch (err: any) {
    // Yup validation or other error
    return { ok: false, error: err?.message ?? "Failed to send" };
  }
}
