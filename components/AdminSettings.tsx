"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type SiteSettings = {
  id: string;
  site_title: string | null;
  address: string | null;
  contact_email: string | null;
  phone_number: string | null;
  whatsapp_number: string | null;
  instagram_handle: string | null;
  facebook_url: string | null;
  map_embed_url: string | null;
  updated_at: string | null;
};

export default function AdminSettings() {
  const supabase = useMemo(() => createClient(), []);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  // General
  const [siteTitle, setSiteTitle] = useState("");

  // Contact
  const [address, setAddress] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Socials / Map
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [mapEmbed, setMapEmbed] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      setOk(null);

      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "site-default")
        .maybeSingle();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (!data) {
        const { error: seedErr } = await supabase
          .from("site_settings")
          .upsert(
            { id: "site-default", updated_at: new Date().toISOString() },
            { onConflict: "id" }
          );
        if (seedErr) setError(seedErr.message);
        setLoading(false);
        return;
      }

      const s = data as SiteSettings;
      setSiteTitle(s.site_title ?? "");
      setAddress(s.address ?? "");
      setContactEmail(s.contact_email ?? "");
      setPhone(s.phone_number ?? "");
      setWhatsapp(s.whatsapp_number ?? "");
      setInstagram(s.instagram_handle ?? "");
      setFacebook(s.facebook_url ?? "");
      setMapEmbed(s.map_embed_url ?? "");

      setLoading(false);
    };

    load();
  }, [supabase]);

  const onSave = async () => {
    setSaving(true);
    setError(null);
    setOk(null);

    const clean = <T extends string>(v: T) =>
      v.trim() === "" ? null : v.trim();

    const { error } = await supabase.from("site_settings").upsert(
      {
        id: "site-default",
        site_title: clean(siteTitle),
        address: clean(address),
        contact_email: clean(contactEmail),
        phone_number: clean(phone),
        whatsapp_number: clean(whatsapp),
        instagram_handle: clean(instagram),
        facebook_url: clean(facebook),
        map_embed_url: clean(mapEmbed),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    if (error) setError(error.message);
    else setOk("השינויים נשמרו בהצלחה");
    setSaving(false);
  };

  return (
    <div dir="rtl" className="space-y-10">
      {/* General */}
      <section>
        <h2 className="text-lg font-bold">מידע כללי</h2>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">שם האתר</label>
            <input
              className="rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              placeholder="Pargola in Jerusalem"
              disabled={loading}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-lg font-bold">פרטי יצירת קשר</h2>
        <p className="text-sm text-gray-500">
          עדכון כתובת, אימייל, טלפון ו-וואטסאפ.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">כתובת</label>
            <input
              className="rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="רחוב, עיר, מיקוד"
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">אימייל ליצירת קשר</label>
            <input
              type="email"
              className="rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="name@example.com"
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">מספר טלפון</label>
            <input
              className="rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="05X-XXXXXXX"
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">מספר וואטסאפ</label>
            <input
              className="rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="05X-XXXXXXX"
              disabled={loading}
            />
          </div>
        </div>
      </section>

      {/* Socials / Map */}
      <section>
        <h2 className="text-lg font-bold">רשתות ומפה</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Instagram</label>
            <input
              className="rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@my_instagram"
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Facebook (URL)</label>
            <input
              className="rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="https://facebook.com/..."
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-sm font-medium">
              Google Maps (Embed URL)
            </label>
            <input
              className="rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={mapEmbed}
              onChange={(e) => setMapEmbed(e.target.value)}
              placeholder="https://www.google.com/maps/embed?..."
              disabled={loading}
            />
          </div>
        </div>
      </section>

      {/* Save */}
      <section>
        <div className="mt-2">
          <button
            onClick={onSave}
            disabled={loading || saving}
            className="rounded-xl bg-black text-white px-5 py-2.5 hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "שומר..." : "שמירת שינויים"}
          </button>
        </div>
      </section>

      {(error || ok) && (
        <div className="pt-2">
          {error && (
            <div className="rounded-xl bg-red-50 text-red-700 px-4 py-2 text-sm">
              {error}
            </div>
          )}
          {ok && (
            <div className="rounded-xl bg-green-50 text-green-700 px-4 py-2 text-sm">
              {ok}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
