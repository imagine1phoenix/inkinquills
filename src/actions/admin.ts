"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export type AdminCollection = "stories" | "events" | "books";

const collectionFiles: Record<AdminCollection, string> = {
  stories: "stories.json",
  events: "events.json",
  books: "books.json",
};

const collectionPaths: Record<AdminCollection, string[]> = {
  stories: ["/stories"],
  events: ["/events"],
  books: ["/library"],
};

function collectionPath(collection: AdminCollection) {
  return path.join(process.cwd(), "src", "data", collectionFiles[collection]);
}

export async function readAdminCollection(collection: AdminCollection) {
  const source = await fs.readFile(collectionPath(collection), "utf8");
  return JSON.parse(source) as unknown[];
}

export async function saveAdminCollection(collection: AdminCollection, value: string) {
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) {
      return { success: false, error: "The collection must be a JSON array." };
    }

    await fs.writeFile(collectionPath(collection), `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
    collectionPaths[collection].forEach((route) => revalidatePath(route));
    return { success: true };
  } catch {
    return { success: false, error: "That JSON is not valid. Check the editor and try again." };
  }
}

export async function uploadEventPhotos(eventId: string, formData: FormData) {
  const files = formData.getAll("photos").filter((value): value is File => value instanceof File && value.size > 0);
  const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

  if (files.length === 0) return { success: false, error: "Choose at least one image first." };
  if (files.some((file) => !file.type.startsWith("image/") || !allowedExtensions.has(path.extname(file.name).toLowerCase()))) {
    return { success: false, error: "Only JPG, PNG, WEBP, and GIF images can be uploaded." };
  }
  if (files.some((file) => file.size > 10 * 1024 * 1024)) {
    return { success: false, error: "Each image must be smaller than 10 MB." };
  }

  try {
    const eventsPath = collectionPath("events");
    const events = JSON.parse(await fs.readFile(eventsPath, "utf8")) as Array<Record<string, unknown>>;
    const event = events.find((item) => item.id === eventId);
    if (!event) return { success: false, error: "Select an event before uploading photos." };

    const eventsDirectory = path.join(process.cwd(), "public", "events");
    await fs.mkdir(eventsDirectory, { recursive: true });
    const uploadedPaths: string[] = [];

    for (const file of files) {
      const extension = path.extname(file.name).toLowerCase();
      const baseName = path.basename(file.name, extension).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "event-photo";
      const fileName = `${baseName}-${randomUUID().slice(0, 8)}${extension}`;
      await fs.writeFile(path.join(eventsDirectory, fileName), Buffer.from(await file.arrayBuffer()));
      uploadedPaths.push(`/events/${fileName}`);
    }

    const existingPhotos = Array.isArray(event.photos) ? event.photos.filter((photo): photo is string => typeof photo === "string") : [];
    event.photos = [...existingPhotos, ...uploadedPaths];
    await fs.writeFile(eventsPath, `${JSON.stringify(events, null, 2)}\n`, "utf8");
    revalidatePath("/events");
    return { success: true, photos: event.photos as string[] };
  } catch (error) {
    console.error("Error uploading event photos:", error);
    return { success: false, error: "The photos could not be uploaded." };
  }
}

export async function readAdminAuditions() {
  try {
    const auditions = await prisma.audition.findMany({ orderBy: { createdAt: "desc" } });
    return auditions.map((audition) => ({ ...audition, createdAt: audition.createdAt.toISOString() }));
  } catch (error) {
    console.error("Error reading auditions:", error);
    return [];
  }
}

export async function deleteAdminAudition(id: string) {
  try {
    await prisma.audition.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("Error deleting audition:", error);
    return { success: false, error: "Could not delete that audition." };
  }
}