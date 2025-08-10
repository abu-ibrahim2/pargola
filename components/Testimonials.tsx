// app/components/Testimonials.tsx
"use client";

import { CiStar } from "react-icons/ci";

type Review = {
  name: string;
  text: string;
  city: string;
  rating?: number;
};

const reviews: Review[] = [
  {
    name: "עדי ק.",
    city: "ירושלים",
    text: "שירות מדהים! התקנה נקייה ומהירה, והפרגולה נראית מעולה.",
    rating: 5,
  },
  {
    name: "נועם ל.",
    city: "בית שמש",
    text: "קיבלנו ליווי צמוד מהתכנון עד הסיום. איכות חומרים ברמה גבוהה.",
    rating: 5,
  },
  {
    name: "מירב ר.",
    city: "מעלה אדומים",
    text: "עמדו בזמנים, הצעת מחיר הוגנת ותוצאה מושלמת לחצר.",
    rating: 5,
  },
  {
    name: "שאדי ח.",
    city: "ירושלים",
    text: "צוות מקצועי וסבלני. ממליץ בחום!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section dir="rtl" className="w-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <header className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            לקוחות מספרים
          </h2>
          <p className="mt-3 text-gray-600">קצת ממה שאומרים עלינו.</p>
        </header>

        {/* Scroll-snap carousel (no lib) */}
        <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
          <div className="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[45%] lg:auto-cols-[30%] gap-4 snap-x snap-mandatory px-1">
            {reviews.map((r, i) => (
              <article
                key={i}
                className="snap-start rounded-2xl bg-white p-6 ring-1 ring-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: r.rating ?? 5 }).map((_, s) => (
                    <CiStar key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-gray-800 leading-7">{r.text}</p>
                <div className="mt-4 text-sm text-gray-600">
                  <span className="font-semibold">{r.name}</span> · {r.city}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* small CTA */}
        <div className="mt-10 text-center">
          <a
            href="/gallery"
            className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 shadow hover:bg-gray-50 transition"
          >
            ראו עוד פרויקטים
          </a>
        </div>
      </div>
    </section>
  );
}
