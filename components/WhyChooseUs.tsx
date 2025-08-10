// app/components/WhyChooseUs.tsx
import { LuAward, LuShieldCheck, LuSun, LuWrench } from "react-icons/lu";

import { MdOutlineCheckCircleOutline } from "react-icons/md";
import Image from "next/image";

export function WhyChooseUs() {
  return (
    <section dir="rtl" className="w-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <header className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            למה לבחור בנו?
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            איכות הנדסית, שירות אנושי ותוצאה שמחזיקה שנים – בלי הפתעות.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Illustration / photo block (optional image) */}
          <div className="relative overflow-hidden rounded-3xl ring-1 ring-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 aspect-[16/11]">
            {/* If you have an image, uncomment:  */}
            <Image
              src="/images/why.jpg"
              alt="בניית פרגולה איכותית"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <Stat label="התקנות" value="500+" />
                <Stat label="אחריות" value="10 שנים" />
                <Stat label="דירוג" value="4.9★" />
              </div>
            </div>
          </div>

          {/* Benefits list */}
          <div className="space-y-5">
            <Benefit
              Icon={LuAward}
              title="איכות בלתי מתפשרת"
              desc="חומרים תקניים ובקרת איכות בכל שלב – משלב התכנון ועד ההתקנה."
            />
            <Benefit
              Icon={LuSun}
              title="מותאם לאקלים הישראלי"
              desc="עמידות לחום ולקרינת UV, צביעה/ציפוי המותאמים לשמש של הארץ."
            />
            <Benefit
              Icon={LuShieldCheck}
              title="בטיחות ותכן קונסטרוקטיבי"
              desc="קונסטרוקציה חזקה, עיגונים נכונים ועמידה בתקנים רלוונטיים."
            />
            <Benefit
              Icon={LuWrench}
              title="התקנה נקייה ומהירה"
              desc="צוות מקצועי, לוחות זמנים ברורים ושקט נפשי עד למסירה."
            />
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <MdOutlineCheckCircleOutline className="h-4 w-4 text-green-600" />{" "}
                הצעת מחיר שקופה
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineCheckCircleOutline className="h-4 w-4 text-green-600" />{" "}
                תיאום מלא עם הלקוח
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineCheckCircleOutline className="h-4 w-4 text-green-600" />{" "}
                אחריות כתובה
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineCheckCircleOutline className="h-4 w-4 text-green-600" />{" "}
                שירות ותחזוקה זמינים
              </li>
            </ul>

            <div className="pt-4">
              <a
                href="tel:0500000000"
                className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-white font-semibold shadow hover:opacity-90 transition"
              >
                דברו איתנו היום
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefit({
  Icon,
  title,
  desc,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 ring-1 ring-gray-200">
        <Icon className="h-6 w-6 text-gray-800" />
      </span>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-gray-600">{desc}</p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-gray-200 p-4 text-center">
      <div className="text-xl font-extrabold text-gray-900">{value}</div>
      <div className="text-xs text-gray-600 mt-0.5">{label}</div>
    </div>
  );
}
