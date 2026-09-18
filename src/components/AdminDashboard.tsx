"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import {
  deleteAdminAudition,
  readAdminAuditions,
  saveAdminCollection,
  uploadEventPhotos,
  type AdminCollection,
} from "@/actions/admin";

type AdminData = Record<AdminCollection, unknown[]>;
type Panel = AdminCollection | "auditions";
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

export default function AdminDashboard({ initialData }: { initialData: AdminData }) {
  const [data, setData] = useState(initialData);
  const [panel, setPanel] = useState<Panel>("stories");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draft, setDraft] = useState<DraftRecord>(asDraft(initialData.stories[0]));
  const [auditions, setAuditions] = useState<Audition[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [notice, setNotice] = useState("");
  const [isPending, startTransition] = useTransition();

  const activeRecords = panel === "auditions" ? [] : data[panel];
  const stats = useMemo(() => ({
    stories: data.stories.length,
    events: data.events.length,
    books: data.books.length,
    auditions: auditions.length,
  }), [auditions.length, data]);

  const choosePanel = (nextPanel: Panel) => {
    setPanel(nextPanel);
    setSelectedIndex(0);
    setNotice("");
    setSelectedFiles([]);
    if (nextPanel === "auditions") {
      startTransition(async () => setAuditions(await readAdminAuditions()));
      return;
    }
    setDraft(asDraft(data[nextPanel][0]));
  };

  const chooseRecord = (index: number) => {
    if (panel === "auditions") return;
    setSelectedIndex(index);
    setDraft(asDraft(data[panel][index]));
    setSelectedFiles([]);
    setNotice("");
  };

  const addRecord = () => {
    if (panel === "auditions") return;
    const next = [...data[panel], blankRecords[panel]];
    setData({ ...data, [panel]: next });
    setSelectedIndex(next.length - 1);
    setDraft(asDraft(next[next.length - 1]));
    setNotice("New draft created. Save collection to publish it.");
  };

  const saveRecord = () => {
    if (panel === "auditions") return;
    const next = data[panel].map((record, index) => index === selectedIndex ? draft : record);
    setData({ ...data, [panel]: next });
    startTransition(async () => {
      const result = await saveAdminCollection(panel, JSON.stringify(next));
      setNotice(result.success ? "Saved to the live content source." : result.error || "Save failed.");
    });
  };

  const deleteRecord = () => {
    if (panel === "auditions" || activeRecords.length === 0) return;
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
        setNotice(`${photos.length === 1 ? "Photo" : "Photos"} uploaded and attached to this event.`);
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
          </div>
        </header>

        <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {([["stories", stats.stories, "Stories"], ["events", stats.events, "Events"], ["books", stats.books, "Books"], ["auditions", stats.auditions, "Applications"]] as const).map(([key, value, label]) => (
            <button key={key} onClick={() => choosePanel(key)} className="border-2 border-midnight bg-[#F4F2EC] p-4 text-left shadow-[5px_5px_0_var(--midnight)] transition-transform hover:-translate-y-1">
              <span className="font-display text-4xl font-black">{value}</span>
              <span className="mt-1 block font-ui text-[10px] font-bold uppercase tracking-widest text-midnight/60">{label}</span>
            </button>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-[210px_280px_minmax(0,1fr)]">
          <aside className="border-2 border-midnight bg-midnight p-3 shadow-[8px_8px_0_var(--electric-blue)]">
            <p className="mb-3 px-2 font-ui text-[10px] font-bold uppercase tracking-[0.25em] text-metro-yellow">Manage</p>
            {([...Object.keys(collectionLabels), "auditions"] as Panel[]).map((item) => (
              <button key={item} onClick={() => choosePanel(item)} className={`mb-1 w-full border-2 px-3 py-3 text-left font-ui text-xs font-bold uppercase tracking-widest transition-colors ${panel === item ? "border-metro-yellow bg-metro-yellow text-midnight" : "border-transparent text-[#F4F2EC] hover:border-[#F4F2EC]"}`}>
                {item === "auditions" ? "Applications" : collectionLabels[item]}
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