"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useActionState } from "react";
import { useFormik } from "formik";
import {
  contactSchema,
  type ContactValues,
} from "@/lib/validation/contactSchema";
import { sendContact, type ContactState } from "@/app/actions/sendContact";
import { createClient } from "@/lib/supabase/client";
import { useFormStatus } from "react-dom";
import { FiPhone, FiMail, FiMapPin, FiMessageCircle } from "react-icons/fi";

type SiteSettings = {
  address: string | null;
  contact_email: string | null;
  phone_number: string | null;
  whatsapp_number: string | null;
};

type ContactProps = {
  asPage?: boolean;
  title?: string;
  subtitle?: string;
  phone?: string;
  email?: string;
  areaLabel?: string;
  whatsappIntl?: string;
  whatsappText?: string;
  showMap?: boolean;
  mapSrc?: string;
};

export default function Contact({
  asPage = false,
  title = "צרו קשר",
  subtitle = "נשמח לייעץ, למדוד ולהציע פתרון שמתאים בדיוק לחלל שלכם.",
  phone,
  email,
  areaLabel,
  whatsappIntl,
  whatsappText = "היי! אשמח להצעת מחיר לפרגולת אלומיניום בירושלים.",
  showMap = true,
  mapSrc,
}: ContactProps) {
  const supabase = useMemo(() => createClient(), []);
  const [settings, setSettings] = useState<SiteSettings>({
    address: null,
    contact_email: null,
    phone_number: null,
    whatsapp_number: null,
  });
  const [loading, setLoading] = useState(true);

  // Load settings (unchanged from your version)
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("site_settings")
        .select("address, contact_email, phone_number, whatsapp_number")
        .eq("id", "site-default")
        .maybeSingle();

      if (!error && data && mounted) setSettings(data);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [supabase]);

  const phoneFinal = phone ?? settings.phone_number ?? "";
  const emailFinal = email ?? settings.contact_email ?? "";
  const areaFinal = areaLabel ?? settings.address ?? "ירושלים והסביבה";

  const waFromDb = settings.whatsapp_number?.replace(/\s+/g, "") ?? "";
  const normalizedWa = waFromDb.startsWith("0")
    ? `972${waFromDb.slice(1)}`
    : waFromDb;
  const whatsappIntlFinal = (whatsappIntl ?? normalizedWa) || "972500000000";

  const mapSrcFinal =
    mapSrc ??
    `https://www.google.com/maps?q=${encodeURIComponent(
      areaFinal
    )}&output=embed`;

  // Server Action state
  const [state, formAction] = useActionState<ContactState, FormData>(
    sendContact,
    { ok: false, error: null }
  );

  // Formik (client-side validation + controlled inputs)
  const formik = useFormik<ContactValues>({
    initialValues: { fullName: "", phone: "", email: "", message: "" },
    validationSchema: contactSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {
      // We do NOT call send here. Submission is native via <form action={formAction} />
      // We only prevent submission if there are errors in onSubmitCapture (below).
    },
  });

  // Let native form submission trigger the server action,
  // but block it if client-side validation fails:
  const onSubmitCapture: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    // make sure all fields are "touched" so errors show
    formik.setTouched(
      { fullName: true, phone: true, email: true, message: true },
      true
    );
    try {
      await contactSchema.validate(formik.values, { abortEarly: false });
      // valid -> allow native submission to server action
    } catch {
      e.preventDefault(); // stop submit if client validation fails
    }
  };

  const Content = (
    <section dir="rtl" className="w-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <header className="mb-10 text-center">
          <h1
            className={`${
              asPage
                ? "text-2xl sm:text-3xl lg:text-4xl"
                : "text-2xl sm:text-3xl"
            } font-extrabold text-gray-900`}
          >
            {title}
          </h1>
          <p className="mt-3 text-gray-600">{subtitle}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: details */}
          <div className="space-y-5">
            {(loading || phoneFinal) && (
              <InfoRow
                icon={<FiPhone className="h-5 w-5" />}
                text={loading ? "..." : phoneFinal}
                href={
                  loading || !phoneFinal
                    ? undefined
                    : `tel:${phoneFinal.replace(/[^0-9+]/g, "")}`
                }
              />
            )}

            {(loading || emailFinal) && (
              <InfoRow
                icon={<FiMail className="h-5 w-5" />}
                text={loading ? "..." : emailFinal}
                href={
                  loading || !emailFinal ? undefined : `mailto:${emailFinal}`
                }
              />
            )}

            <InfoRow
              icon={<FiMapPin className="h-5 w-5" />}
              text={loading ? "..." : areaFinal}
            />

            <a
              href={`https://wa.me/${whatsappIntlFinal}?text=${encodeURIComponent(
                whatsappText
              )}`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white shadow hover:opacity-90 transition w-fit"
            >
              <FiMessageCircle className="h-5 w-5" />
              וואטסאפ מהיר
            </a>

            {showMap && (
              <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-gray-200">
                <iframe
                  title="map"
                  src={mapSrcFinal}
                  className="w-full h-64"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* Right: form (Formik-controlled inputs, Server Action submit) */}
          <form
            action={formAction}
            onSubmitCapture={onSubmitCapture}
            className="rounded-3xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="שם מלא"
                name="fullName"
                type="text"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullName ? formik.errors.fullName : undefined
                }
              />
              <Field
                label="טלפון"
                name="phone"
                type="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone ? formik.errors.phone : undefined}
              />
            </div>

            <div className="mt-4">
              <Field
                label="אימייל"
                name="email"
                type="email"
                value={formik.values.email ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email ? formik.errors.email : undefined}
              />
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                מה תרצו לבנות?
              </label>
              <textarea
                name="message"
                rows={6}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
                placeholder="ספרו לנו על הפרויקט, מידות משוערות, חומרים מועדפים ועוד…"
              />
              {formik.touched.message && formik.errors.message && (
                <p className="mt-1 text-xs text-red-600">
                  {formik.errors.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <SubmitButton />

            {/* Server result */}
            {state?.ok && (
              <p className="mt-3 text-sm text-green-600">
                תודה! נחזור אליכם בהקדם.
              </p>
            )}
            {state?.error && !state.ok && (
              <p className="mt-3 text-sm text-red-600">שגיאה: {state.error}</p>
            )}

            <p className="mt-4 text-xs text-gray-500">
              בלחיצה על “שלחו פנייה” הינכם מאשרים יצירת קשר בהתאם{" "}
              <Link href="/privacy" className="underline">
                למדיניות הפרטיות
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );

  return asPage ? (
    <main dir="rtl" className="w-screen bg-white">
      {Content}
    </main>
  ) : (
    Content
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 w-full rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:opacity-90 transition disabled:opacity-50"
    >
      {pending ? "שולח..." : "שלחו פנייה"}
    </button>
  );
}

function InfoRow({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 ring-1 ring-gray-200">
        {icon}
      </span>
      <span className="text-gray-800">{text}</span>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-90 transition">
      {content}
    </a>
  ) : (
    content
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
