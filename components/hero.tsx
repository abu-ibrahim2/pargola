// app/components/Hero.tsx
import Image from "next/image";
import heroPic from "@/public/images/hero3.jpg";

export function Hero() {
  return (
    <section
      dir="rtl"
      className="relative w-screen overflow-hidden bg-black"
      aria-label="Hero"
    >
      {/* Image */}
      <div className="relative w-full h-[30vh] sm:h-[40vh] lg:h-[55vh]">
        <Image
          src={heroPic}
          alt="פרגולה יפה בירושלים"
          fill
          priority
          placeholder="blur"
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="pointer-events-auto mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight">
              פרגולות איכותיות בירושלים
            </h1>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-white/90">
              תכנון, ייצור והתקנה בהתאמה אישית – עמידות מושלמת לשמש הישראלית
              ועיצוב מודרני.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="tel:0500000000"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm sm:text-base font-semibold text-black shadow hover:opacity-90 transition"
              >
                התקשר עכשיו
              </a>
              <a
                href="/gallery"
                className="inline-flex items-center justify-center rounded-2xl border border-white/70 px-5 py-3 text-sm sm:text-base font-semibold text-white hover:bg-white/10 transition"
              >
                גלריה
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* nice divider line under hero (optional) */}
      <div className="w-full p-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
