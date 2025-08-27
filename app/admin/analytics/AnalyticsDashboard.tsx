// // components/admin/AnalyticsDashboard.tsx
// "use client";

// import { useEffect, useState } from "react";

// type TopPage =
//   | { name: string; count: number } // new API shape (human label)
//   | { pathname: string; count: number }; // old shape (URL)

// type Stats = {
//   totalPageViews: number;
//   uniqueVisitors: number;
//   activeNow: number;
//   topPages: TopPage[];
//   topReferrers: { referrer: string; count: number }[];
//   last7Days: { date: string; count: number }[];
// };

// export default function AnalyticsDashboard() {
//   const [stats, setStats] = useState<Stats | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/analytics/stats?period=30", { cache: "no-store" })
//       .then((r) => r.json())
//       .then((d) => setStats(d))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div className="animate-pulse text-sm text-gray-500">
//         טוען סטטיסטיקות…
//       </div>
//     );
//   }
//   if (!stats) {
//     return <div className="text-sm text-red-600">לא ניתן לטעון נתונים</div>;
//   }

//   return (
//     <section dir="rtl" className="space-y-6">
//       <h2 className="text-lg sm:text-xl font-bold">סטטיסטיקות האתר</h2>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <Card
//           title="צפיות דף (30 ימים)"
//           value={stats.totalPageViews.toLocaleString()}
//         />
//         <Card
//           title="מבקרים ייחודיים (30 ימים)"
//           value={stats.uniqueVisitors.toLocaleString()}
//         />
//         <Card
//           title="פעילים כעת (5 דק׳)"
//           value={stats.activeNow.toLocaleString()}
//         />
//       </div>

//       {/* Last 7 days tiny chart (simple SVG sparkline) */}
//       <div className="rounded-2xl ring-1 ring-gray-200 p-4">
//         <h3 className="font-semibold mb-3">7 הימים האחרונים</h3>
//         <Sparkline
//           data={stats.last7Days.map((d) => d.count)}
//           labels={stats.last7Days.map((d) => d.date.slice(5))}
//         />
//       </div>

//       {/* Top pages & referrers */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <ListBlock
//           title="עמודים מובילים"
//           rows={stats.topPages.map((p) => ({
//             k: "name" in p ? p.name : "pathname" in p ? p.pathname : "עמוד",
//             v: p.count,
//           }))}
//           empty="אין נתונים"
//         />
//         <ListBlock
//           title="מקורות תנועה מובילים"
//           rows={stats.topReferrers.map((r) => ({
//             k: r.referrer || "(ישיר)",
//             v: r.count,
//           }))}
//           empty="אין נתונים"
//         />
//       </div>
//     </section>
//   );
// }

// function Card({ title, value }: { title: string; value: string }) {
//   return (
//     <div className="rounded-2xl ring-1 ring-gray-200 p-4 bg-white">
//       <div className="text-sm text-gray-600">{title}</div>
//       <div className="mt-1 text-2xl font-extrabold tabular-nums">{value}</div>
//     </div>
//   );
// }

// function ListBlock({
//   title,
//   rows,
//   empty,
// }: {
//   title: string;
//   rows: { k: string; v: number }[];
//   empty: string;
// }) {
//   return (
//     <div className="rounded-2xl ring-1 ring-gray-200 p-4 bg-white">
//       <h3 className="font-semibold mb-3">{title}</h3>
//       <ul className="divide-y">
//         {rows.length ? (
//           rows.map((r) => (
//             <li
//               key={r.k}
//               className="py-2 flex items-center justify-between gap-3"
//             >
//               <span className="truncate text-sm">{r.k}</span>
//               <span className="text-sm font-semibold tabular-nums">{r.v}</span>
//             </li>
//           ))
//         ) : (
//           <li className="py-2 text-sm text-gray-500">{empty}</li>
//         )}
//       </ul>
//     </div>
//   );
// }

// function Sparkline({ data, labels }: { data: number[]; labels: string[] }) {
//   const w = 600,
//     h = 80,
//     pad = 8;
//   const max = Math.max(1, ...data);
//   const step = (w - pad * 2) / Math.max(1, data.length - 1);
//   const points = data
//     .map((v, i) => {
//       const x = pad + i * step;
//       const y = h - pad - (v / max) * (h - pad * 2);
//       return `${x},${y}`;
//     })
//     .join(" ");
//   return (
//     <div className="overflow-x-auto">
//       <svg width={w} height={h} className="block">
//         <polyline
//           points={points}
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//         />
//         {data.map((v, i) => {
//           const x = pad + i * step;
//           const y = h - pad - (v / max) * (h - pad * 2);
//           return <circle key={i} cx={x} cy={y} r="2.5" />;
//         })}
//       </svg>
//       <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
//         {labels.map((l, i) => (
//           <span key={i} className="tabular-nums">
//             {l}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// components/admin/AnalyticsDashboard.tsx
"use client";

import { useEffect, useState } from "react";

type Stats = {
  totalPageViews: number;
  uniqueVisitors: number;
  activeNow: number;
  topPages: { name: string; count: number }[]; // ← human labels
  topReferrers: { referrer: string; count: number }[];
  last7Days: { date: string; count: number }[];
};

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics/stats?period=30", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setStats(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="animate-pulse text-sm text-gray-500">
        טוען סטטיסטיקות…
      </div>
    );
  if (!stats)
    return <div className="text-sm text-red-600">לא ניתן לטעון נתונים</div>;

  return (
    <section dir="rtl" className="space-y-6">
      <h2 className="text-lg sm:text-xl font-bold">סטטיסטיקות האתר</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card
          title="צפיות דף (30 ימים)"
          value={stats.totalPageViews.toLocaleString()}
        />
        <Card
          title="מבקרים ייחודיים (30 ימים)"
          value={stats.uniqueVisitors.toLocaleString()}
        />
        <Card
          title="פעילים כעת (5 דק׳)"
          value={stats.activeNow.toLocaleString()}
        />
      </div>

      <div className="rounded-2xl ring-1 ring-gray-200 p-4">
        <h3 className="font-semibold mb-3">7 הימים האחרונים</h3>
        <Sparkline
          data={stats.last7Days.map((d) => d.count)}
          labels={stats.last7Days.map((d) => d.date.slice(5))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ListBlock
          title="עמודים מובילים"
          rows={stats.topPages.map((p) => ({ k: p.name, v: p.count }))}
          empty="אין נתונים"
        />
        <ListBlock
          title="מקורות תנועה מובילים"
          rows={stats.topReferrers.map((r) => ({
            k: r.referrer || "(ישיר)",
            v: r.count,
          }))}
          empty="אין נתונים"
        />
      </div>
    </section>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl ring-1 ring-gray-200 p-4 bg-white">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="mt-1 text-2xl font-extrabold tabular-nums">{value}</div>
    </div>
  );
}

function ListBlock({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: { k: string; v: number }[];
  empty: string;
}) {
  return (
    <div className="rounded-2xl ring-1 ring-gray-200 p-4 bg-white">
      <h3 className="font-semibold mb-3">{title}</h3>
      <ul className="divide-y">
        {rows.length ? (
          rows.map((r) => (
            <li
              key={r.k}
              className="py-2 flex items-center justify-between gap-3"
            >
              <span className="truncate text-sm">{r.k}</span>
              <span className="text-sm font-semibold tabular-nums">{r.v}</span>
            </li>
          ))
        ) : (
          <li className="py-2 text-sm text-gray-500">{empty}</li>
        )}
      </ul>
    </div>
  );
}

function Sparkline({ data, labels }: { data: number[]; labels: string[] }) {
  const w = 600,
    h = 80,
    pad = 8;
  const max = Math.max(1, ...data);
  const step = (w - pad * 2) / Math.max(1, data.length - 1);
  const points = data
    .map((v, i) => {
      const x = pad + i * step;
      const y = h - pad - (v / max) * (h - pad * 2);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <div className="overflow-x-auto">
      <svg width={w} height={h} className="block">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        {data.map((v, i) => {
          const x = pad + i * step;
          const y = h - pad - (v / max) * (h - pad * 2);
          return <circle key={i} cx={x} cy={y} r="2.5" />;
        })}
      </svg>
      <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
        {labels.map((l, i) => (
          <span key={i} className="tabular-nums">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
