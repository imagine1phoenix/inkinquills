"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { logoutAdmin } from "@/actions/auth";
import {
  deleteAdminAudition,
  readAdminAuditions,
  readAdminAnalytics,
  resetAdminAnalytics,
  purgeAdminMockAnalytics,
  saveAdminCollection,
  uploadEventPhotos,
  type AdminCollection,
} from "@/actions/admin";
import type { AnalyticsSummary } from "@/lib/analytics";

type AdminData = Record<AdminCollection, unknown[]>;
type Panel = AdminCollection | "auditions" | "analytics";
type Audition = Awaited<ReturnType<typeof readAdminAuditions>>[number];
type DraftRecord = Record<string, unknown>;
type FieldKind = "text" | "textarea" | "date" | "select" | "checkbox" | "color" | "list";

type FieldConfig = {
  key: string;
  label: string;
  kind: FieldKind;
  options?: string[];
  help?: string;
};

const collectionLabels: Record<AdminCollection, string> = {
  stories: "Stories & Poems",
  events: "Events",
  books: "Library Books",
};

const blankRecords: Record<AdminCollection, DraftRecord> = {
  stories: { id: "new-story", title: "New title", author: "", type: "poem", date: "2026-09", featured: false, body: "Write here..." },
  events: { id: "new-event", title: "New event", date: "2026-09-30", description: "", longDescription: "", status: "upcoming", photos: [] },
  books: { id: "new-book", title: "New book", author: "", coverColor: "#012CEB", spineColor: "#0B0B0B", textColor: "#F4F2EC", review: "", synopsis: "", recommendedBy: "", genre: "", year: 2026 },
};

const fieldConfigs: Record<AdminCollection, FieldConfig[]> = {
  stories: [
    { key: "title", label: "Title", kind: "text" },
    { key: "author", label: "Author", kind: "text", help: "Leave blank if this is anonymous." },
    { key: "type", label: "Content type", kind: "select", options: ["poem", "story"] },
    { key: "date", label: "Publication month", kind: "text", help: "Use YYYY-MM, for example 2026-09." },
    { key: "featured", label: "Feature this piece", kind: "checkbox" },
    { key: "body", label: "Writing", kind: "textarea", help: "Leave a blank line between stanzas or paragraphs." },
  ],
  events: [
    { key: "title", label: "Event name", kind: "text" },
    { key: "date", label: "Event date", kind: "date" },
    { key: "status", label: "Event status", kind: "select", options: ["upcoming", "past"] },
    { key: "description", label: "Short description", kind: "textarea" },
    { key: "longDescription", label: "Full description", kind: "textarea" },
    { key: "photos", label: "Photo paths", kind: "list", help: "One public path per line, for example /events/photo.jpg." },
  ],
  books: [
    { key: "title", label: "Book title", kind: "text" },
    { key: "author", label: "Author", kind: "text" },
    { key: "genre", label: "Genre", kind: "text" },
    { key: "year", label: "Publication year", kind: "text" },
    { key: "recommendedBy", label: "Recommended by", kind: "text" },
    { key: "review", label: "Club review", kind: "textarea" },
    { key: "synopsis", label: "Synopsis", kind: "textarea" },
    { key: "coverColor", label: "Cover color", kind: "color" },
    { key: "spineColor", label: "Spine color", kind: "color" },
    { key: "textColor", label: "Cover text color", kind: "color" },
  ],
};

function asDraft(record: unknown): DraftRecord {
  return typeof record === "object" && record !== null && !Array.isArray(record) ? { ...(record as DraftRecord) } : {};
}

function recordLabel(record: unknown, index: number) {
  if (typeof record === "object" && record !== null) {
    const item = record as Record<string, unknown>;
    return String(item.title || item.name || `Untitled ${index + 1}`);
  }
  return `Record ${index + 1}`;
}

function formatTimeAgo(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffSec < 60) return "Just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

export default function AdminDashboard({
  initialData,
  initialAnalytics,
}: {
  initialData: AdminData;
  initialAnalytics?: AnalyticsSummary;
}) {
  const [data, setData] = useState(initialData);
  const [panel, setPanel] = useState<Panel>("stories");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draft, setDraft] = useState<DraftRecord>(asDraft(initialData.stories[0]));
  const [auditions, setAuditions] = useState<Audition[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(initialAnalytics || null);
  const [isLivePolling, setIsLivePolling] = useState(true);
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [notice, setNotice] = useState("");
  const [isPending, startTransition] = useTransition();

  // Real-time automatic polling when viewing the Visitors & Traffic section
  useEffect(() => {
    if (panel !== "analytics" || !isLivePolling) return;

    const interval = setInterval(async () => {
      try {
        const res = await readAdminAnalytics();
        setAnalytics(res);
        setSecondsAgo(0);
      } catch (err) {
        console.error("Live analytics poll error:", err);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [panel, isLivePolling]);

  // Second ticker for "Synced Xs ago"
  useEffect(() => {
    if (panel !== "analytics") return;
    const timer = setInterval(() => {
      setSecondsAgo((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [panel]);

  const activeRecords = panel === "auditions" || panel === "analytics" ? [] : data[panel];
  const stats = useMemo(() => ({
    stories: data.stories.length,
    events: data.events.length,
    books: data.books.length,
    auditions: auditions.length,
    visitors: analytics?.uniqueVisitors ?? 0,
    views: analytics?.totalViews ?? 0,
  }), [auditions.length, data, analytics]);

  const choosePanel = (nextPanel: Panel) => {
    setPanel(nextPanel);
    setSelectedIndex(0);
    setNotice("");
    setSelectedFiles([]);
    if (nextPanel === "auditions") {
      startTransition(async () => setAuditions(await readAdminAuditions()));
      return;
    }
    if (nextPanel === "analytics") {
      setSecondsAgo(0);
      startTransition(async () => {
        const res = await readAdminAnalytics();
        setAnalytics(res);
      });
      return;
    }
    setDraft(asDraft(data[nextPanel][0]));
  };

  const chooseRecord = (index: number) => {
    if (panel === "auditions" || panel === "analytics") return;
    setSelectedIndex(index);
    setDraft(asDraft(data[panel][index]));
    setSelectedFiles([]);
    setNotice("");
  };

  const addRecord = () => {
    if (panel === "auditions" || panel === "analytics") return;
    const next = [...data[panel], blankRecords[panel]];
    setData({ ...data, [panel]: next });
    setSelectedIndex(next.length - 1);
    setDraft(asDraft(next[next.length - 1]));
    setNotice("New draft created. Save collection to publish it.");
  };

  const saveRecord = () => {
    if (panel === "auditions" || panel === "analytics") return;
    const next = data[panel].map((record, index) => index === selectedIndex ? draft : record);
    setData({ ...data, [panel]: next });
    startTransition(async () => {
      const result = await saveAdminCollection(panel, JSON.stringify(next));
      setNotice(result.success ? (result.committed ? "Saved, committed to GitHub, and deployment has started." : "Saved locally. Add GITHUB_TOKEN to commit and deploy automatically.") : result.error || "Save failed.");
    });
  };

  const deleteRecord = () => {
    if (panel === "auditions" || panel === "analytics" || activeRecords.length === 0) return;
    const next = activeRecords.filter((_, index) => index !== selectedIndex);
    setData({ ...data, [panel]: next });
    const nextIndex = Math.max(0, selectedIndex - 1);
    setSelectedIndex(nextIndex);
    setDraft(asDraft(next[nextIndex]));
    startTransition(async () => {
      const result = await saveAdminCollection(panel, JSON.stringify(next));
      setNotice(result.success ? "Record removed from the live content source." : result.error || "Delete failed.");
    });
  };

  const removeAudition = (id: string) => {
    startTransition(async () => {
      const result = await deleteAdminAudition(id);
      if (result.success) setAuditions((current) => current.filter((audition) => audition.id !== id));
      setNotice(result.success ? "Application removed." : result.error || "Delete failed.");
    });
  };

  const addFiles = (files: File[]) => {
    const images = files.filter((file) => file.type.startsWith("image/"));
    setSelectedFiles((current) => [...current, ...images]);
    if (images.length !== files.length) setNotice("Only image files can be added.");
  };

  const uploadPhotos = () => {
    if (panel !== "events" || selectedFiles.length === 0) return;
    const eventId = typeof draft.id === "string" ? draft.id : "";
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("photos", file));
    startTransition(async () => {
      const result = await uploadEventPhotos(eventId, formData);
      if (result.success) {
        const photos = result.photos || [];
        const nextDraft = { ...draft, photos };
        const nextData = data.events.map((record, index) => index === selectedIndex ? nextDraft : record);
        setDraft(nextDraft);
        setData({ ...data, events: nextData });
        setSelectedFiles([]);
        setNotice(`${photos.length === 1 ? "Photo" : "Photos"} uploaded, attached, and committed. Deployment has started.`);
      } else {
        setNotice(result.error || "The photos could not be uploaded.");
      }
    });
  };

  const updateField = (field: FieldConfig, value: unknown) => {
    setDraft((current) => ({ ...current, [field.key]: value }));
  };

  const renderField = (field: FieldConfig) => {
    const value = draft[field.key];
    const stringValue = typeof value === "string" || typeof value === "number" ? String(value) : "";
    const inputClass = "w-full border-2 border-midnight bg-white px-3 py-3 font-body text-base text-midnight outline-none transition-colors focus:border-electric-blue";

    return (
      <label key={field.key} className={field.kind === "textarea" || field.kind === "list" ? "block md:col-span-2" : "block"}>
        <span className="mb-2 block font-ui text-[10px] font-bold uppercase tracking-widest">{field.label}</span>
        {field.kind === "textarea" && <textarea value={stringValue} onChange={(event) => updateField(field, event.target.value)} className={`${inputClass} min-h-32 resize-y`} />}
        {field.kind === "list" && <textarea value={Array.isArray(value) ? value.join("\n") : ""} onChange={(event) => updateField(field, event.target.value.split("\n").map((item) => item.trim()).filter(Boolean))} className={`${inputClass} min-h-24 resize-y`} />}
        {(field.kind === "text" || field.kind === "date") && <input type={field.kind} value={field.kind === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(stringValue) ? "" : stringValue} onChange={(event) => updateField(field, field.key === "year" ? Number(event.target.value) : event.target.value)} className={inputClass} />}
        {field.kind === "select" && <select value={stringValue} onChange={(event) => updateField(field, event.target.value)} className={inputClass}>{field.options?.map((option) => <option key={option} value={option}>{option === "past" ? "Past event" : option === "upcoming" ? "Upcoming event" : option}</option>)}</select>}
        {field.kind === "color" && <div className="flex items-center gap-3 border-2 border-midnight bg-white p-2"><input type="color" value={stringValue || "#000000"} onChange={(event) => updateField(field, event.target.value)} className="h-10 w-14 cursor-pointer border-0 bg-transparent" /><span className="font-mono text-sm uppercase">{stringValue || "#000000"}</span></div>}
        {field.kind === "checkbox" && <span className="flex items-center gap-3 border-2 border-midnight bg-white px-3 py-3"><input type="checkbox" checked={Boolean(value)} onChange={(event) => updateField(field, event.target.checked)} className="h-5 w-5 accent-[var(--electric-blue)]" /><span className="font-body text-base">Show this piece as featured</span></span>}
        {field.help && <span className="mt-1 block font-ui text-[10px] text-midnight/55">{field.help}</span>}
      </label>
    );
  };

  return (
    <div className="min-h-screen bg-[#E8E5DC] text-midnight px-4 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 border-b-4 border-midnight pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-electric-blue">Ink in Quills / Control Room</p>
            <h1 className="mt-2 font-display text-6xl font-black uppercase leading-[0.8] md:text-8xl">Admin<br />Desk</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="border-2 border-midnight bg-metro-yellow px-3 py-2 font-ui text-[10px] font-bold uppercase tracking-widest shadow-[4px_4px_0_var(--midnight)]">Local workspace</span>
            <Link href="/" className="border-2 border-midnight bg-[#F4F2EC] px-4 py-2 font-ui text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0_var(--electric-blue)] transition-transform hover:-translate-y-1">View site</Link>
            <form action={logoutAdmin}><button type="submit" className="border-2 border-midnight bg-[#F4F2EC] px-4 py-2 font-ui text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0_var(--midnight)] transition-transform hover:-translate-y-1">Log out</button></form>
          </div>
        </header>

        <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {([
            ["stories", stats.stories, "Stories"],
            ["events", stats.events, "Events"],
            ["books", stats.books, "Books"],
            ["auditions", stats.auditions, "Applications"],
            [
              "analytics",
              analytics?.activeNow ? `${analytics.activeNow} Live` : stats.visitors,
              analytics?.activeNow
                ? `● ${analytics.activeNow} Active (${stats.views} Views)`
                : `Visitors (${stats.views} Views)`,
            ],
          ] as const).map(([key, value, label]) => (
            <button
              key={key}
              onClick={() => choosePanel(key as Panel)}
              className={`border-2 border-midnight p-4 text-left shadow-[5px_5px_0_var(--midnight)] transition-transform hover:-translate-y-1 ${
                panel === key ? "bg-metro-yellow" : "bg-[#F4F2EC]"
              }`}
            >
              <span className="font-display text-4xl font-black">{value}</span>
              <span className="mt-1 block font-ui text-[10px] font-bold uppercase tracking-widest text-midnight/70">
                {label}
              </span>
            </button>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-[210px_280px_minmax(0,1fr)]">
          <aside className="border-2 border-midnight bg-midnight p-3 shadow-[8px_8px_0_var(--electric-blue)]">
            <p className="mb-3 px-2 font-ui text-[10px] font-bold uppercase tracking-[0.25em] text-metro-yellow">Manage</p>
            {([...Object.keys(collectionLabels), "auditions", "analytics"] as Panel[]).map((item) => (
              <button
                key={item}
                onClick={() => choosePanel(item)}
                className={`mb-1 w-full border-2 px-3 py-3 text-left font-ui text-xs font-bold uppercase tracking-widest transition-colors ${
                  panel === item
                    ? "border-metro-yellow bg-metro-yellow text-midnight"
                    : "border-transparent text-[#F4F2EC] hover:border-[#F4F2EC]"
                }`}
              >
                {item === "auditions"
                  ? "Applications"
                  : item === "analytics"
                  ? "Visitors & Traffic"
                  : collectionLabels[item]}
              </button>
            ))}
          </aside>

          {panel === "auditions" ? (
            <section className="min-h-[520px] border-2 border-midnight bg-[#F4F2EC] p-5 shadow-[8px_8px_0_var(--metro-yellow)] lg:col-span-2">
              <div className="mb-5 flex items-start justify-between gap-4 border-b-2 border-dashed border-midnight/30 pb-4">
                <div><p className="font-ui text-[10px] font-bold uppercase tracking-widest text-electric-blue">Inbox</p><h2 className="font-display text-4xl font-black uppercase">Applications</h2></div>
                <button onClick={() => choosePanel("auditions")} className="border-2 border-midnight bg-electric-blue px-3 py-2 font-ui text-[10px] font-bold uppercase tracking-widest text-[#F4F2EC]">Refresh</button>
              </div>
              {auditions.length === 0 ? <p className="font-body text-lg text-midnight/60">No applications loaded yet. Use Refresh to check the audition inbox.</p> : <div className="space-y-3">{auditions.map((audition) => <article key={audition.id} className="border-2 border-midnight p-4 shadow-[4px_4px_0_var(--midnight)]"><div className="flex justify-between gap-4"><div><h3 className="font-display text-2xl font-black uppercase">{audition.name}</h3><p className="font-ui text-xs font-bold uppercase tracking-widest text-electric-blue">{audition.email} / {audition.role}</p></div><button onClick={() => removeAudition(audition.id)} className="font-ui text-[10px] font-bold uppercase tracking-widest text-red-700">Delete</button></div><p className="mt-3 font-body text-sm">{audition.manifesto}</p></article>)}</div>}
            </section>
          ) : panel === "analytics" ? (
            <section className="min-h-[520px] border-2 border-midnight bg-[#F4F2EC] p-5 shadow-[8px_8px_0_var(--electric-blue)] lg:col-span-2">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b-2 border-dashed border-midnight/30 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-electric-blue">
                      Live Real-Time Intelligence
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 border border-midnight px-2 py-0.5 font-ui text-[9px] font-black uppercase tracking-wider ${
                        isLivePolling
                          ? "bg-emerald-400 text-midnight shadow-[1px_1px_0_var(--midnight)]"
                          : "bg-metro-yellow text-midnight shadow-[1px_1px_0_var(--midnight)]"
                      }`}
                    >
                      {isLivePolling ? (
                        <>
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-600 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-700"></span>
                          </span>
                          LIVE STREAM (4s)
                        </>
                      ) : (
                        <>
                          <span className="h-2 w-2 rounded-full bg-midnight/50"></span>
                          PAUSED
                        </>
                      )}
                    </span>
                  </div>
                  <h2 className="mt-0.5 font-display text-4xl font-black uppercase">Website Visitors</h2>
                  <p className="mt-1 font-body text-xs text-midnight/70">
                    {isLivePolling
                      ? `Real-time activity feed updating automatically (${secondsAgo === 0 ? "synced just now" : `synced ${secondsAgo}s ago`}).`
                      : "Auto-refresh paused. Click Resume or Refresh Feed to fetch latest data."}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsLivePolling(!isLivePolling)}
                    className={`border-2 border-midnight px-3 py-2 font-ui text-[10px] font-bold uppercase tracking-widest transition-transform hover:-translate-y-0.5 ${
                      isLivePolling
                        ? "bg-[#F4F2EC] text-midnight shadow-[3px_3px_0_var(--midnight)]"
                        : "bg-emerald-500 text-white shadow-[3px_3px_0_var(--midnight)]"
                    }`}
                  >
                    {isLivePolling ? "⏸ Pause Live" : "▶ Resume Live"}
                  </button>

                  <button
                    onClick={() => {
                      startTransition(async () => {
                        const res = await readAdminAnalytics();
                        setAnalytics(res);
                        setSecondsAgo(0);
                        setNotice("Visitor analytics refreshed.");
                      });
                    }}
                    disabled={isPending}
                    className="border-2 border-midnight bg-electric-blue px-3 py-2 font-ui text-[10px] font-bold uppercase tracking-widest text-[#F4F2EC] shadow-[3px_3px_0_var(--midnight)] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {isPending ? "Refreshing..." : "↺ Refresh Feed"}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm("Purge any mock/dummy entries from visitor logs?")) {
                        startTransition(async () => {
                          const res = await purgeAdminMockAnalytics();
                          const updated = await readAdminAnalytics();
                          setAnalytics(updated);
                          setNotice(`Purged ${res.removedCount} mock records. Only live visitors remain.`);
                        });
                      }
                    }}
                    disabled={isPending}
                    className="border-2 border-midnight bg-[#F4F2EC] px-3 py-2 font-ui text-[10px] font-bold uppercase tracking-widest text-amber-800 shadow-[3px_3px_0_var(--midnight)] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    Purge Mock Data
                  </button>

                  <button
                    onClick={() => {
                      if (confirm("Reset and clear all visitor analytics data?")) {
                        startTransition(async () => {
                          await resetAdminAnalytics();
                          const res = await readAdminAnalytics();
                          setAnalytics(res);
                          setNotice("Visitor analytics cleared completely.");
                        });
                      }
                    }}
                    disabled={isPending}
                    className="border-2 border-midnight bg-[#F4F2EC] px-3 py-2 font-ui text-[10px] font-bold uppercase tracking-widest text-red-700 shadow-[3px_3px_0_var(--midnight)] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {/* Active Right Now Card */}
                <div className="relative col-span-2 overflow-hidden border-2 border-midnight bg-white p-3 shadow-[3px_3px_0_var(--midnight)] sm:col-span-1">
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-[10px] font-bold uppercase tracking-wider text-midnight/70">
                      Active Now
                    </span>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    </span>
                  </div>
                  <span className="mt-1 block font-display text-3xl font-black text-emerald-600">
                    {analytics?.activeNow ?? 0}
                  </span>
                  <span className="mt-0.5 block font-ui text-[9px] font-semibold text-emerald-800">
                    {(analytics?.activeNow ?? 0) === 1 ? "1 person online" : `${analytics?.activeNow ?? 0} online now`}
                  </span>
                </div>

                {/* Total Views Card */}
                <div className="border-2 border-midnight bg-white p-3 shadow-[3px_3px_0_var(--midnight)]">
                  <span className="block font-ui text-[10px] font-bold uppercase tracking-wider text-midnight/60">
                    Total Views
                  </span>
                  <span className="mt-1 block font-display text-3xl font-black text-electric-blue">
                    {analytics?.totalViews ?? 0}
                  </span>
                  <span className="mt-0.5 block font-ui text-[9px] text-midnight/50">All-time visits</span>
                </div>

                {/* Unique Visitors */}
                <div className="border-2 border-midnight bg-white p-3 shadow-[3px_3px_0_var(--midnight)]">
                  <span className="block font-ui text-[10px] font-bold uppercase tracking-wider text-midnight/60">
                    Unique Visitors
                  </span>
                  <span className="mt-1 block font-display text-3xl font-black text-midnight">
                    {analytics?.uniqueVisitors ?? 0}
                  </span>
                  <span className="mt-0.5 block font-ui text-[9px] text-midnight/50">Distinct people</span>
                </div>

                {/* Views Today */}
                <div className="border-2 border-midnight bg-white p-3 shadow-[3px_3px_0_var(--midnight)]">
                  <span className="block font-ui text-[10px] font-bold uppercase tracking-wider text-midnight/60">
                    Views Today
                  </span>
                  <span className="mt-1 block font-display text-3xl font-black text-midnight">
                    {analytics?.viewsToday ?? 0}
                  </span>
                  <span className="mt-0.5 block font-ui text-[9px] text-midnight/50">
                    {analytics?.uniqueToday ?? 0} unique today
                  </span>
                </div>

                {/* Past 7 Days */}
                <div className="border-2 border-midnight bg-white p-3 shadow-[3px_3px_0_var(--midnight)]">
                  <span className="block font-ui text-[10px] font-bold uppercase tracking-wider text-midnight/60">
                    Past 7 Days
                  </span>
                  <span className="mt-1 block font-display text-3xl font-black text-midnight">
                    {analytics?.viewsThisWeek ?? 0}
                  </span>
                  <span className="mt-0.5 block font-ui text-[9px] text-midnight/50">Recent week</span>
                </div>
              </div>

              {/* Live Activity Radar Banner */}
              {analytics?.activePages && analytics.activePages.length > 0 && (
                <div className="mb-6 border-2 border-midnight bg-emerald-500/10 p-3 shadow-[3px_3px_0_var(--midnight)]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-600 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-700"></span>
                      </span>
                      <span className="font-ui text-[10px] font-black uppercase tracking-wider text-emerald-900">
                        Live Readers On Site Right Now:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analytics.activePages.map((ap) => (
                        <span
                          key={ap.path}
                          className="border border-midnight bg-white px-2 py-0.5 font-mono text-[11px] font-bold text-midnight shadow-[2px_2px_0_var(--midnight)]"
                        >
                          <span className="text-emerald-600">●</span> {ap.path} :{" "}
                          <span className="text-electric-blue">
                            {ap.count} {ap.count === 1 ? "reader" : "readers"}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Two Columns: Pages and Sources */}
              <div className="mb-6 grid gap-4 md:grid-cols-2">
                {/* Popular Pages */}
                <div className="border-2 border-midnight bg-white p-4 shadow-[4px_4px_0_var(--midnight)]">
                  <h3 className="mb-3 font-ui text-xs font-bold uppercase tracking-widest text-electric-blue">
                    Most Visited Pages
                  </h3>
                  {!analytics?.topPages || analytics.topPages.length === 0 ? (
                    <p className="font-body text-xs text-midnight/50">No page view data yet.</p>
                  ) : (
                    <div className="space-y-2.5">
                      {analytics.topPages.map((page) => {
                        const isCurrentlyActive = analytics.activePages?.some((ap) => ap.path === page.path);
                        return (
                          <div key={page.path} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="flex items-center gap-1.5 font-mono font-bold text-midnight">
                                {page.path}
                                {isCurrentlyActive && (
                                  <span className="border border-emerald-600 bg-emerald-100 px-1.5 py-0.2 font-ui text-[9px] font-bold text-emerald-800">
                                    LIVE NOW
                                  </span>
                                )}
                              </span>
                              <span className="font-ui font-semibold text-midnight/70">
                                {page.count} views ({page.percentage}%)
                              </span>
                            </div>
                            <div className="h-2 w-full border border-midnight bg-[#E8E5DC]">
                              <div
                                className="h-full bg-electric-blue"
                                style={{ width: `${Math.max(page.percentage, 4)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Sources & Devices */}
                <div className="space-y-4">
                  {/* Traffic Sources */}
                  <div className="border-2 border-midnight bg-white p-4 shadow-[4px_4px_0_var(--midnight)]">
                    <h3 className="mb-2 font-ui text-xs font-bold uppercase tracking-widest text-electric-blue">
                      Traffic Sources / Referrers
                    </h3>
                    {!analytics?.referrerBreakdown || analytics.referrerBreakdown.length === 0 ? (
                      <p className="font-body text-xs text-midnight/50">No referrer data yet.</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {analytics.referrerBreakdown.map((ref) => (
                          <span
                            key={ref.referrer}
                            className="border border-midnight bg-[#F4F2EC] px-2 py-1 font-ui text-[10px] font-bold"
                          >
                            {ref.referrer}: <span className="text-electric-blue">{ref.count}</span> ({ref.percentage}%)
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Devices & Browsers */}
                  <div className="border-2 border-midnight bg-white p-4 shadow-[4px_4px_0_var(--midnight)]">
                    <h3 className="mb-2 font-ui text-xs font-bold uppercase tracking-widest text-electric-blue">
                      Devices &amp; Browsers
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="block font-ui text-[10px] font-bold uppercase text-midnight/60">
                          Devices
                        </span>
                        <div className="mt-1 space-y-1">
                          {analytics?.deviceBreakdown?.map((d) => (
                            <div key={d.device} className="flex justify-between font-ui text-[11px]">
                              <span className="capitalize">
                                {d.device === "mobile"
                                  ? "📱 Mobile"
                                  : d.device === "tablet"
                                  ? "📟 Tablet"
                                  : "💻 Desktop"}
                              </span>
                              <span className="font-bold text-midnight">{d.percentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="block font-ui text-[10px] font-bold uppercase text-midnight/60">
                          Browsers
                        </span>
                        <div className="mt-1 space-y-1">
                          {analytics?.browserBreakdown?.slice(0, 4).map((b) => (
                            <div key={b.browser} className="flex justify-between font-ui text-[11px]">
                              <span>{b.browser}</span>
                              <span className="font-bold text-midnight">{b.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Log */}
              <div className="border-2 border-midnight bg-white p-4 shadow-[4px_4px_0_var(--midnight)]">
                <div className="mb-3 flex items-center justify-between border-b border-dashed border-midnight/20 pb-2">
                  <div>
                    <h3 className="font-ui text-xs font-bold uppercase tracking-widest text-electric-blue">
                      Live Visitor Activity Stream
                    </h3>
                    <p className="font-body text-[11px] text-midnight/60">
                      Real-time chronological stream of visitors, routes viewed, and origins
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="border border-midnight bg-metro-yellow px-2 py-0.5 font-ui text-[10px] font-bold uppercase">
                      {analytics?.recentVisits?.length ?? 0} Recorded
                    </span>
                  </div>
                </div>

                {!analytics?.recentVisits || analytics.recentVisits.length === 0 ? (
                  <div className="py-8 text-center font-body text-xs text-midnight/60">
                    <p className="font-bold text-midnight">No visitor logs recorded yet.</p>
                    <p className="mt-1 text-midnight/50">
                      Open any page of Ink in Quills in another tab to watch real-time tracking stream in!
                    </p>
                  </div>
                ) : (
                  <div className="max-h-[380px] divide-y divide-midnight/15 overflow-y-auto border border-midnight">
                    {analytics.recentVisits.map((visit) => (
                      <div
                        key={visit.id}
                        className={`flex flex-col gap-2 p-3 text-xs transition-colors hover:bg-metro-yellow/10 sm:flex-row sm:items-center sm:justify-between ${
                          visit.isLive ? "bg-emerald-50/60" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 border border-midnight bg-midnight px-1.5 py-0.5 font-mono text-[10px] font-bold text-metro-yellow">
                            {visit.device === "mobile" ? "MOB" : visit.device === "tablet" ? "TAB" : "DSK"}
                          </span>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-bold text-electric-blue">
                                {visit.path}
                              </span>
                              <span className="font-ui text-[10px] text-midnight/50">
                                via {visit.referrer}
                              </span>
                              {visit.isLive && (
                                <span className="inline-flex items-center gap-1 border border-emerald-700 bg-emerald-400 px-1.5 py-0.5 font-mono text-[9px] font-black uppercase text-midnight shadow-[1px_1px_0_var(--midnight)] animate-pulse">
                                  ● LIVE NOW
                                </span>
                              )}
                            </div>
                            <div className="mt-0.5 flex flex-wrap items-center gap-2 font-ui text-[10px] text-midnight/70">
                              <span>
                                {visit.browser} on {visit.os}
                              </span>
                              <span>•</span>
                              <span className="font-mono">{visit.visitorId.slice(0, 14)}</span>
                              <span>•</span>
                              <span className="text-midnight/60">
                                📍 {visit.country || "Local"} ({visit.ipMasked})
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="font-ui text-right text-[10px] font-semibold text-midnight/60 sm:whitespace-nowrap">
                          {visit.isLive ? (
                            <span className="font-bold text-emerald-700">Active now</span>
                          ) : (
                            formatTimeAgo(visit.timestamp)
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ) : (
            <>
              <section className="border-2 border-midnight bg-midnight p-3 shadow-[8px_8px_0_var(--metro-yellow)]">
                <div className="mb-3 flex items-center justify-between px-2"><p className="font-ui text-[10px] font-bold uppercase tracking-[0.25em] text-metro-yellow">{collectionLabels[panel]}</p><button onClick={addRecord} className="font-ui text-lg font-bold text-[#F4F2EC]" aria-label="Add record">+</button></div>
                <div className="space-y-1">{activeRecords.map((record, index) => <button key={`${recordLabel(record, index)}-${index}`} onClick={() => chooseRecord(index)} className={`w-full border-2 px-3 py-3 text-left font-body text-sm ${selectedIndex === index ? "border-electric-blue bg-[#F4F2EC] text-midnight" : "border-transparent text-[#F4F2EC] hover:border-[#F4F2EC]"}`}><span className="mr-2 font-ui text-[10px] font-bold text-metro-yellow">{String(index + 1).padStart(2, "0")}</span>{recordLabel(record, index)}</button>)}</div>
              </section>
              <section className="border-2 border-midnight bg-[#F4F2EC] p-5 shadow-[8px_8px_0_var(--electric-blue)]">
                <div className="mb-5 flex items-start justify-between gap-4 border-b-2 border-dashed border-midnight/30 pb-4"><div><p className="font-ui text-[10px] font-bold uppercase tracking-widest text-electric-blue">Simple editor</p><h2 className="font-display text-4xl font-black uppercase">Edit content</h2></div><button onClick={deleteRecord} className="border-2 border-midnight bg-[#F4F2EC] px-3 py-2 font-ui text-[10px] font-bold uppercase tracking-widest text-red-700">Delete</button></div>
                <div className="grid gap-5 md:grid-cols-2">{fieldConfigs[panel].map(renderField)}</div>
                {panel === "events" && <div className="mt-6 border-2 border-dashed border-electric-blue bg-electric-blue/5 p-4">
                  <div className="mb-3"><p className="font-ui text-[10px] font-bold uppercase tracking-widest text-electric-blue">Add event photos</p><p className="mt-1 font-body text-sm text-midnight/65">Choose photos or drag them into the box. They will be saved to the website automatically.</p></div>
                  <label onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setIsDragging(false)} onDrop={(event) => { event.preventDefault(); setIsDragging(false); addFiles(Array.from(event.dataTransfer.files)); }} className={`flex min-h-28 cursor-pointer flex-col items-center justify-center border-2 border-midnight p-4 text-center transition-colors ${isDragging ? "bg-metro-yellow" : "bg-[#F4F2EC] hover:bg-metro-yellow/40"}`}>
                    <span className="font-display text-2xl font-black uppercase">Drop photos here</span><span className="mt-1 font-ui text-[10px] font-bold uppercase tracking-widest text-midnight/60">or click to choose files</span>
                    <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple className="sr-only" onChange={(event) => addFiles(Array.from(event.target.files || []))} />
                  </label>
                  {selectedFiles.length > 0 && <div className="mt-3 flex flex-wrap items-center justify-between gap-3"><p className="font-ui text-xs font-bold">{selectedFiles.length} {selectedFiles.length === 1 ? "photo" : "photos"} ready</p><button onClick={uploadPhotos} disabled={isPending} className="border-2 border-midnight bg-electric-blue px-4 py-2 font-ui text-xs font-bold uppercase tracking-widest text-[#F4F2EC] shadow-[4px_4px_0_var(--midnight)] disabled:opacity-50">{isPending ? "Uploading..." : "Upload photos"}</button></div>}
                </div>}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-midnight/30 pt-5"><p className="font-ui text-xs text-midnight/60">Make your changes above, then press save to publish them.</p><button onClick={saveRecord} disabled={isPending} className="border-2 border-midnight bg-metro-yellow px-5 py-3 font-ui text-xs font-bold uppercase tracking-widest shadow-[5px_5px_0_var(--midnight)] transition-transform hover:-translate-y-1 disabled:opacity-50">{isPending ? "Saving..." : "Save changes"}</button></div>
              </section>
            </>
          )}
        </div>
        {notice && <p className="mt-6 border-2 border-midnight bg-metro-yellow px-4 py-3 font-ui text-xs font-bold uppercase tracking-widest">{notice}</p>}
      </div>
    </div>
  );
}