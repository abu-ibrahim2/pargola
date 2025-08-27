// app/components/Services.tsx
"use client";

import { RxRulerSquare } from "react-icons/rx";
import { LuHammer, LuShieldCheck, LuWrench, LuClock, LuTruck } from "react-icons/lu";

type Service = {
  title: string;
  desc: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const services: Service[] = [
  {
    title: "תכנון בהתאמה אישית",
    desc: "מדידה, תכנון ועיצוב לפי החלל והסגנון שלכם – בלי תבניות מוכנות.",
    Icon: RxRulerSquare,
  },
  {
    title: "ייצור איכותי",
    desc: "חומרים עמידים לשמש הישראלית: עץ, אלומיניום, פוליקרבונט ועוד.",
    Icon: LuHammer,
  },
  {
    title: "התקנה מקצועית",
    desc: "צוות מיומן שמרכיב נקי, מדויק ובטיחותי – בזמן ולפי התקן.",
    Icon: LuTruck,
  },
  {
    title: "עמידות וביטחון",
    desc: "תכנון קונסטרוקטיבי נכון וציוד תקני לשקט נפשי לאורך זמן.",
    Icon: LuShieldCheck,
  },
  {
    title: "שירות ותחזוקה",
    desc: "שימון, חיזוקים וניקוי תקופתי כדי שהפרגולה תישאר חדשה.",
    Icon: LuWrench,
  },
  {
    title: "זמני ביצוע מהירים",
    desc: "לוחות זמנים ברורים ומחויבות למסירה מהירה ללא פשרות על איכות.",
    Icon: LuClock,
  },
];

export function Services() {
  return (
    <section dir="rtl" className="w-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <header className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
            השירותים שלנו
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            מ-א׳ עד ת׳: תכנון, ייצור והתקנה של פרגולות איכות – כולל שירות
            ותחזוקה שוטפים.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ title, desc, Icon }) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 ring-1 ring-gray-200 transition group-hover:bg-gray-200">
                  <Icon className="h-6 w-6 text-gray-800" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 leading-6">{desc}</p>
                </div>
              </div>

              {/* subtle accent line */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 transition group-hover:opacity-100" />
            </article>
          ))}
        </div>

        {/* CTA under services */}
        <div className="mt-12 flex justify-center">
          <a
            href="tel:0500000000"
            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-white font-semibold shadow hover:opacity-90 transition"
          >
            קבלו הצעת מחיר
          </a>
        </div>
      </div>
    </section>
  );
}
