'use client';

// app/components/ContactSection.tsx
import { FiPhone, FiMail, FiMapPin, FiMessageCircle } from "react-icons/fi";

export function ContactSection() {
  return (
    <section dir="rtl" className="w-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <header className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            צרו קשר
          </h2>
          <p className="mt-3 text-gray-600">
            נשמח לתת ייעוץ והצעת מחיר ללא התחייבות.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact details + WhatsApp */}
          <div className="space-y-5">
            <InfoRow
              icon={<FiPhone className="h-5 w-5" />}
              text="050-000-0000"
              href="tel:0500000000"
            />
            <InfoRow
              icon={<FiMail className="h-5 w-5" />}
              text="info@pargola-jerusalem.co.il"
              href="mailto:info@pargola-jerusalem.co.il"
            />
            <InfoRow
              icon={<FiMapPin className="h-5 w-5" />}
              text="ירושלים והסביבה"
            />

            <a
              href={`https://wa.me/972500000000?text=${encodeURIComponent(
                "היי! אשמח להצעת מחיר לפרגולה בירושלים."
              )}`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white shadow hover:opacity-90 transition w-fit"
            >
              <FiMessageCircle className="h-5 w-5" />
              וואטסאפ מהיר
            </a>
          </div>

          {/* Simple contact form (client-side only) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const data = new FormData(form);
              const payload = Object.fromEntries(data.entries());
              console.log("Contact form payload:", payload);
              alert("תודה! נחזור אליכם בהקדם.");
              form.reset();
            }}
            className="rounded-3xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="שם מלא" name="fullName" type="text" required />
              <Field label="טלפון" name="phone" type="tel" required />
            </div>
            <div className="mt-4">
              <Field label="אימייל (לא חובה)" name="email" type="email" />
            </div>
            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                הודעה
              </label>
              <textarea
                name="message"
                rows={5}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
                placeholder="ספרו לנו קצת על הפרויקט..."
                required
              />
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-2xl bg-black px-6 py-3 font-semibold text-white shadow hover:opacity-90 transition"
            >
              שלחו פנייה
            </button>
          </form>
        </div>
      </div>
    </section>
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
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
      />
    </div>
  );
}
