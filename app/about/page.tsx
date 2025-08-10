// app/about/page.tsx
import { FaAward, FaShieldAlt, FaTools, FaSun, FaUsers } from "react-icons/fa";
import Link from "next/link";

export const metadata = {
  title: "אודות | פרגולה בירושלים",
  description:
    "עלינו: צוות מומחים לתכנון, ייצור והתקנת פרגולות בירושלים והסביבה. איכות, שקיפות ושירות אישי.",
};

export default function AboutPage() {
  return (
    <main dir="rtl" className="w-screen bg-white">
      {/* Top intro */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 text-center">
            מי אנחנו
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-center text-gray-600">
            אנחנו סטודיו ירושלמי המתמחה בתכנון, ייצור והתקנה של פרגולות בהתאמה
            אישית. שילוב של הנדסה מדויקת, חומרים איכותיים ושירות אנושי—מהפגישה
            הראשונה ועד תחזוקה שוטפת.
          </p>

          {/* Stats strip */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            <Stat label="שנות ניסיון" value="8+" />
            <Stat label="פרויקטים מושלמים" value="500+" />
            <Stat label="דירוג לקוחות" value="4.9★" />
            <Stat label="אחריות עבודה" value="עד 10 שנים" />
            <Stat label="זמני התקנה" value="מהירים" />
          </div>
        </div>
      </section>

      {/* Values / USP */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900">
                מה מניע אותנו
              </h2>
              <p className="mt-4 text-gray-600">
                כל פרגולה היא פרויקט ייחודי. אנחנו מתחילים מהבנה עמוקה של החלל,
                ההעדפות והתקציב— ואז משלבים תכן קונסטרוקטיבי, חומרים חזקים
                ועיצוב נקי שמתיישב עם האדריכלות הקיימת.
              </p>
              <ul className="mt-6 space-y-3 text-gray-800">
                <li className="flex items-center gap-3">
                  <Dot /> שקיפות מלאה במחיר ובתהליך
                </li>
                <li className="flex items-center gap-3">
                  <Dot /> עמידות לאקלים הירושלמי (שמש, UV ורוחות)
                </li>
                <li className="flex items-center gap-3">
                  <Dot /> לוחות זמנים ברורים והתקנה נקייה
                </li>
              </ul>

              <div className="mt-8 flex gap-3">
                <Link
                  href="/gallery"
                  className="rounded-2xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 shadow hover:bg-gray-50 transition"
                >
                  הצצות מהעבודות
                </Link>
                <Link
                  href="/contact"
                  className="rounded-2xl bg-black px-6 py-3 font-semibold text-white shadow hover:opacity-90 transition"
                >
                  דברו איתנו
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card
                icon={<FaAward className="h-6 w-6" />}
                title="איכות בלתי מתפשרת"
                desc="בקרת איכות בכל שלב—מהתכנון ועד הגמר."
              />
              <Card
                icon={<FaShieldAlt className="h-6 w-6" />}
                title="בטיחות ותכן"
                desc="קונסטרוקציה חזקה, עיגונים נכונים ועמידה בתקנים."
              />
              <Card
                icon={<FaSun className="h-6 w-6" />}
                title="מותאם לאקלים"
                desc="ציפויים/צביעה מתקדמים להגנה מקרינת UV וחום."
              />
              <Card
                icon={<FaTools className="h-6 w-6" />}
                title="התקנה נקייה"
                desc="צוות מנוסה, כלים מקצועיים ותיאום מלא עם הלקוח."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team note (optional simple line) */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl bg-white ring-1 ring-gray-200 p-6 sm:p-8 flex items-start gap-4">
            <div className="mt-1 shrink-0">
              <FaUsers className="h-6 w-6 text-gray-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">הצוות</h3>
              <p className="mt-2 text-gray-600">
                צוות מהנדסים ומתקינים עם ניסיון מצטבר של עשרות שנים. אנחנו
                אוהבים חללים יפים, פרטים מדויקים ושירות שמרגיש בית.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-gray-200 p-4 text-center">
      <div className="text-xl font-extrabold text-gray-900">{value}</div>
      <div className="text-xs text-gray-600 mt-0.5">{label}</div>
    </div>
  );
}

function Card({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 ring-1 ring-gray-200">
        {icon}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-gray-600">{desc}</p>
    </div>
  );
}

function Dot() {
  return <span className="inline-block h-2 w-2 rounded-full bg-gray-400" />;
}
