// // components/pergolas/config.ts

// export type PergolaSlug =
//   | "fixed"
//   | "opening"
//   | "pvc"
//   | "aluminum-auto"
//   | "european";

// export type PergolaType = {
//   slug: PergolaSlug;
//   title: string;
//   subtitle: string;
//   badge: string; // the type name to display as a chip
//   description: string;
//   features: string[];
//   images: { src: string; alt: string }[];
// };

// export const PERGOLAS: Record<PergolaSlug, PergolaType> = {
//   fixed: {
//     slug: "fixed",
//     title: "פרגולה קבועה",
//     subtitle: "פתרון קלאסי ואמין לשטחי חוץ",
//     badge: "קבועה",
//     description:
//       "פרגולה קבועה מספקת הצללה איכותית כל השנה – עמידה, אלגנטית, ומותאמת אישית לפי העיצוב והמידות של החלל שלכם.",
//     features: [
//       "מתאימה לכל עונות השנה",
//       "מגוון צבעים וטקסטורות",
//       "תחזוקה מינימלית",
//       "תכנון מותאם אישית",
//     ],
//     images: [
//       { src: "/images/pergolas/fixed-1.jpg", alt: "פרגולה קבועה 1" },
//       { src: "/images/pergolas/fixed-2.jpg", alt: "פרגולה קבועה 2" },
//       { src: "/images/pergolas/fixed-3.jpg", alt: "פרגולה קבועה 3" },
//     ],
//   },
//   opening: {
//     slug: "opening",
//     title: "פרגולה נפתחת",
//     subtitle: "שליטה מלאה בפתיחה וסגירה לפי הצורך",
//     badge: "נפתחת",
//     description:
//       "פרגולה נפתחת מעניקה גמישות מלאה – שמש כשנעים, צל כשרוצים, והכול במראה נקי ומודרני.",
//     features: [
//       "פתיחה/סגירה חלקה",
//       "עמידה לרוח ולקרינת שמש",
//       "מתאים לחצרות, מרפסות וגגות",
//       "שדרוג מיידי לחוויית האירוח",
//     ],
//     images: [
//       { src: "/images/pergolas/opening-1.jpg", alt: "פרגולה נפתחת 1" },
//       { src: "/images/pergolas/opening-2.jpg", alt: "פרגולה נפתחת 2" },
//       { src: "/images/pergolas/opening-3.jpg", alt: "פרגולה נפתחת 3" },
//     ],
//   },
//   pvc: {
//     slug: "pvc",
//     title: "פרגולה נפתחת PVC",
//     subtitle: "אטימות גבוהה למים והגנה משמש",
//     badge: "PVC",
//     description:
//       "פתרון פרקטי שמספק איטום מצוין ועמידות במים – נהדר לימי חורף ושמש קופחת, עם מראה מוקפד.",
//     features: [
//       "אטום לגשם",
//       "קל לניקוי",
//       "עמיד לקרינת UV",
//       "פתרון משתלם לטווח ארוך",
//     ],
//     images: [
//       { src: "/images/pergolas/pvc-1.jpg", alt: "פרגולת PVC 1" },
//       { src: "/images/pergolas/pvc-2.jpg", alt: "פרגולת PVC 2" },
//       { src: "/images/pergolas/pvc-3.jpg", alt: "פרגולת PVC 3" },
//     ],
//   },
//   "aluminum-auto": {
//     slug: "aluminum-auto",
//     title: "פרגולה נפתחת מאלומיניום אוטומטית",
//     subtitle: "נוחות בלחיצת כפתור – מערכת אוטומטית מלאה",
//     badge: "אלומיניום אוטומטית",
//     description:
//       "מערכת חכמה מאלומיניום באיכות גבוהה המופעלת בלחיצת כפתור/שלט – שילוב מושלם של עיצוב וטכנולוגיה.",
//     features: [
//       "שליטה חשמלית מלאה",
//       "אלומיניום עמיד וחזק",
//       "אפשרות לחיישני גשם/רוח",
//       "התממשקות לבית חכם",
//     ],
//     images: [
//       { src: "/images/pergolas/auto-1.jpg", alt: "פרגולה אוטומטית 1" },
//       { src: "/images/pergolas/auto-2.jpg", alt: "פרגולה אוטומטית 2" },
//       { src: "/images/pergolas/auto-3.jpg", alt: "פרגולה אוטומטית 3" },
//     ],
//   },
//   european: {
//     slug: "european",
//     title: "מערכת אירופאית לשליטה בצל ושמש",
//     subtitle: "שליטה מדויקת בכמות האור וההצללה",
//     badge: "מערכת אירופאית",
//     description:
//       "להבים מתכווננים המאפשרים שליטה חכמה בכמות האור והצל – מראה פרימיום וביצועים ללא פשרות.",
//     features: [
//       "להבים מתכווננים",
//       "אסתטיקה מודרנית",
//       "עמידות גבוהה לאורך זמן",
//       "התאמה מושלמת למרחבים יוקרתיים",
//     ],
//     images: [
//       { src: "/images/pergolas/euro-1.jpg", alt: "מערכת אירופאית 1" },
//       { src: "/images/pergolas/euro-2.jpg", alt: "מערכת אירופאית 2" },
//       { src: "/images/pergolas/euro-3.jpg", alt: "מערכת אירופאית 3" },
//     ],
//   },
// };

// export const ALL_PERGOLA_SLUGS = Object.keys(PERGOLAS) as PergolaSlug[];

// components/pergolas/config.ts

export type PergolaSlug =
  | "fixed"
  | "opening"
  | "pvc"
  | "aluminum-auto"
  | "european";

export type PergolaType = {
  slug: PergolaSlug;
  title: string;
  subtitle: string;
  badge: string; // the type name to display as a chip
  description: string;
  features: string[];
  storagePath: string; // folder in your Supabase Storage bucket
};

export const PERGOLAS: Record<PergolaSlug, PergolaType> = {
  fixed: {
    slug: "fixed",
    title: "פרגולה קבועה",
    subtitle: "פתרון קלאסי ואמין לשטחי חוץ",
    badge: "קבועה",
    description:
      "פרגולה קבועה מספקת הצללה איכותית כל השנה – עמידה, אלגנטית, ומותאמת אישית לפי העיצוב והמידות של החלל שלכם.",
    features: [
      "מתאימה לכל עונות השנה",
      "מגוון צבעים וטקסטורות",
      "תחזוקה מינימלית",
      "תכנון מותאם אישית",
    ],
    storagePath: "pergolas/fixed",
  },
  opening: {
    slug: "opening",
    title: "פרגולה נפתחת",
    subtitle: "שליטה מלאה בפתיחה וסגירה לפי הצורך",
    badge: "נפתחת",
    description:
      "פרגולה נפתחת מעניקה גמישות מלאה – שמש כשנעים, צל כשרוצים, והכול במראה נקי ומודרני.",
    features: [
      "פתיחה/סגירה חלקה",
      "עמידה לרוח ולקרינת שמש",
      "מתאים לחצרות, מרפסות וגגות",
      "שדרוג מיידי לחוויית האירוח",
    ],
    storagePath: "pergolas/opening",
  },
  pvc: {
    slug: "pvc",
    title: "פרגולה נפתחת PVC",
    subtitle: "אטימות גבוהה למים והגנה משמש",
    badge: "PVC",
    description:
      "פתרון פרקטי שמספק איטום מצוין ועמידות במים – נהדר לימי חורף ושמש קופחת, עם מראה מוקפד.",
    features: [
      "אטום לגשם",
      "קל לניקוי",
      "עמיד לקרינת UV",
      "פתרון משתלם לטווח ארוך",
    ],
    storagePath: "pergolas/pvc",
  },
  "aluminum-auto": {
    slug: "aluminum-auto",
    title: "פרגולה נפתחת מאלומיניום אוטומטית",
    subtitle: "נוחות בלחיצת כפתור – מערכת אוטומטית מלאה",
    badge: "אלומיניום אוטומטית",
    description:
      "מערכת חכמה מאלומיניום באיכות גבוהה המופעלת בלחיצת כפתור/שלט – שילוב מושלם של עיצוב וטכנולוגיה.",
    features: [
      "שליטה חשמלית מלאה",
      "אלומיניום עמיד וחזק",
      "אפשרות לחיישני גשם/רוח",
      "התממשקות לבית חכם",
    ],
    storagePath: "pergolas/aluminum-auto",
  },
  european: {
    slug: "european",
    title: "מערכת אירופאית לשליטה בצל ושמש",
    subtitle: "שליטה מדויקת בכמות האור וההצללה",
    badge: "מערכת אירופאית",
    description:
      "להבים מתכווננים המאפשרים שליטה חכמה בכמות האור והצל – מראה פרימיום וביצועים ללא פשרות.",
    features: [
      "להבים מתכווננים",
      "אסתטיקה מודרנית",
      "עמידות גבוהה לאורך זמן",
      "התאמה מושלמת למרחבים יוקרתיים",
    ],
    storagePath: "pergolas/european",
  },
};

export const ALL_PERGOLA_SLUGS = Object.keys(PERGOLAS) as PergolaSlug[];
