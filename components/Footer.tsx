// app/components/Footer.tsx
import Link from "next/link";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer dir="rtl" className="w-screen bg-gray-950 text-gray-300 px-4">
      {/* top */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* brand */}
          <div>
            <h3 className="text-white text-2xl font-extrabold">
              פרגולה בירושלים
            </h3>
            <p className="mt-3 text-sm text-gray-400">
              תכנון, ייצור והתקנה של פרגולות איכות בהתאמה אישית – שירות בכל
              ירושלים והסביבה.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://wa.me/972500000000"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-white text-sm font-semibold hover:opacity-90 transition"
              >
                <FaWhatsapp className="h-4 w-4" />
                וואטסאפ מהיר
              </a>
              <a
                href="tel:0500000000"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-gray-900 px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
              >
                התקשרו
              </a>
            </div>
          </div>

          {/* quick links */}
          <div>
            <h4 className="text-white font-semibold">ניווט</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  דף הבית
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white">
                  גלריה
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  אודות
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>

          {/* services */}
          <div>
            <h4 className="text-white font-semibold">שירותים</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/services/custom-design"
                  className="hover:text-white"
                >
                  תכנון בהתאמה אישית
                </Link>
              </li>
              <li>
                <Link href="/services/production" className="hover:text-white">
                  ייצור פרגולות
                </Link>
              </li>
              <li>
                <Link
                  href="/services/installation"
                  className="hover:text-white"
                >
                  התקנה מקצועית
                </Link>
              </li>
              <li>
                <Link href="/services/maintenance" className="hover:text-white">
                  שירות ותחזוקה
                </Link>
              </li>
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="text-white font-semibold">יצירת קשר</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <FaPhone className="h-4 w-4 text-gray-400" />
                <a href="tel:0500000000" className="hover:text-white">
                  050-000-0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="h-4 w-4 text-gray-400" />
                <a
                  href="mailto:info@pargola-jerusalem.co.il"
                  className="hover:text-white"
                >
                  info@pargola-jerusalem.co.il
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                <span>ירושלים והסביבה</span>
              </li>
            </ul>

            {/* socials */}
            <div className="mt-5 flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="hover:text-white">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-white">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* bottom */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {year} פרגולה בירושלים. כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-white">
              מדיניות פרטיות
            </Link>
            <span className="opacity-50">•</span>
            <Link href="/terms" className="hover:text-white">
              תנאים והגבלות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
