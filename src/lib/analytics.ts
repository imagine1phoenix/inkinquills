import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type DeviceType = "desktop" | "mobile" | "tablet" | "unknown";

export interface VisitRecord {
  id: string;
  visitorId: string;
  timestamp: string; // ISO string
  lastSeen?: string; // ISO string
  path: string;
  referrer: string;
  browser: string;
  os: string;
  device: DeviceType;
  screen?: string;
  ipMasked?: string;
  country?: string;
  isLive?: boolean;
}

export interface ActivePageInfo {
  path: string;
  count: number;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  viewsToday: number;
  viewsThisWeek: number;
  uniqueToday: number;
  activeNow: number; // Visitors active in the last 5 minutes
  activePages: ActivePageInfo[]; // Pages currently being read by active visitors
  topPages: { path: string; count: number; percentage: number }[];
  deviceBreakdown: { device: string; count: number; percentage: number }[];
  browserBreakdown: { browser: string; count: number; percentage: number }[];
  referrerBreakdown: { referrer: string; count: number; percentage: number }[];
  recentVisits: (VisitRecord & { isLive?: boolean })[];
}

export interface ActiveSession {
  visitorId: string;
  path: string;
  lastSeen: number; // ms timestamp
  device: DeviceType;
  browser: string;
  os: string;
  country: string;
}

// Preserve active sessions in global scope across Next.js API route re-evaluations
const globalForAnalytics = globalThis as unknown as {
  __activeVisitorSessions?: Map<string, ActiveSession>;
};
const activeSessions: Map<string, ActiveSession> =
  globalForAnalytics.__activeVisitorSessions ??
  (globalForAnalytics.__activeVisitorSessions = new Map<string, ActiveSession>());

const analyticsFilePath = path.join(process.cwd(), "src", "data", "visits.json");

// Helper to parse user-agent
export function parseUserAgent(userAgent: string): { browser: string; os: string; device: DeviceType } {
  const ua = userAgent.toLowerCase();

  // Detect Device
  let device: DeviceType = "desktop";
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    device = "tablet";
  } else if (/mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini/i.test(ua)) {
    device = "mobile";
  }

  // Detect OS
  let os = "Unknown OS";
  if (/macintosh|mac os x/i.test(ua)) os = "macOS";
  else if (/windows|win32|win64/i.test(ua)) os = "Windows";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/linux/i.test(ua)) os = "Linux";
  else if (/cros/i.test(ua)) os = "Chrome OS";

  // Detect Browser
  let browser = "Other";
  if (/edg\//i.test(ua)) browser = "Edge";
  else if (/opr\/|opera/i.test(ua)) browser = "Opera";
  else if (/chrome|crios/i.test(ua) && !/edg\//i.test(ua)) browser = "Chrome";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua) && !/chrome|crios|android/i.test(ua)) browser = "Safari";
  else if (/samsungbrowser/i.test(ua)) browser = "Samsung Internet";

  return { browser, os, device };
}

// Map timezone string to a human-friendly country/region
function timezoneToLocation(tz: string): string {
  if (!tz) return "";
  if (tz.includes("Kolkata") || tz.includes("Calcutta") || tz.includes("India")) return "India";
  if (
    tz.startsWith("America/New_York") ||
    tz.startsWith("America/Chicago") ||
    tz.startsWith("America/Los_Angeles") ||
    tz.startsWith("America/Denver") ||
    tz.startsWith("America/Phoenix") ||
    tz.startsWith("America/Detroit")
  ) {
    return "United States";
  }
  if (tz.startsWith("Europe/London")) return "United Kingdom";
  if (tz.startsWith("America/Toronto") || tz.startsWith("America/Vancouver") || tz.startsWith("America/Montreal")) {
    return "Canada";
  }
  if (tz.startsWith("Australia/")) return "Australia";
  if (tz.startsWith("Asia/Tokyo")) return "Japan";
  if (tz.startsWith("Asia/Singapore")) return "Singapore";
  if (tz.startsWith("Asia/Dubai")) return "United Arab Emirates";
  if (tz.startsWith("Europe/Berlin")) return "Germany";
  if (tz.startsWith("Europe/Paris")) return "France";
  if (tz.startsWith("Europe/Amsterdam")) return "Netherlands";
  if (tz.startsWith("Europe/Madrid")) return "Spain";
  if (tz.startsWith("Europe/Rome")) return "Italy";

  const parts = tz.split("/");
  if (parts.length >= 2) {
    return parts[1].replace(/_/g, " ");
  }
  return tz;
}

// Resolve real location from cloud headers, timezone, or IP
export function resolveLocation(options: {
  countryHeader?: string | null;
  timezone?: string | null;
  ip?: string | null;
}): string {
  const { countryHeader, timezone, ip } = options;

  if (ip === "::1" || ip === "127.0.0.1") {
    if (timezone) {
      const loc = timezoneToLocation(timezone);
      return loc ? `${loc} (Dev)` : "Localhost / Dev";
    }
    return "Localhost / Dev";
  }

  if (countryHeader && countryHeader.trim().length === 2) {
    const code = countryHeader.trim().toUpperCase();
    const countryNames: Record<string, string> = {
      IN: "India",
      US: "United States",
      GB: "United Kingdom",
      CA: "Canada",
      AU: "Australia",
      DE: "Germany",
      FR: "France",
      JP: "Japan",
      SG: "Singapore",
      AE: "United Arab Emirates",
      BR: "Brazil",
      NL: "Netherlands",
      ES: "Spain",
      IT: "Italy",
      RU: "Russia",
      CN: "China",
      PK: "Pakistan",
      BD: "Bangladesh",
      ZA: "South Africa",
      NZ: "New Zealand",
      IE: "Ireland",
    };
    return countryNames[code] || code;
  }

  if (timezone) {
    const loc = timezoneToLocation(timezone);
    if (loc) return loc;
  }

  return "Global";
}

// Clean referrer into readable source name
export function cleanReferrer(ref?: string): string {
  if (!ref || ref.trim() === "") return "Direct / Bookmark";
  try {
    const url = new URL(ref);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    if (host.includes("google")) return "Google Search";
    if (host.includes("instagram")) return "Instagram";
    if (host.includes("twitter") || host.includes("x.com")) return "Twitter / X";
    if (host.includes("linkedin")) return "LinkedIn";
    if (host.includes("reddit")) return "Reddit";
    if (host.includes("github")) return "GitHub";
    if (host.includes("facebook")) return "Facebook";
    if (host.includes("whatsapp")) return "WhatsApp";
    if (host.includes("pinterest")) return "Pinterest";
    if (host.includes("youtube")) return "YouTube";
    return host;
  } catch {
    return ref.slice(0, 30);
  }
}

// Mask IP address for privacy
export function maskIp(ip?: string | null): string {
  if (!ip) return "Unknown";
  if (ip === "::1" || ip === "127.0.0.1") return "Localhost / Dev";
  // IPv4
  const ipv4Parts = ip.split(".");
  if (ipv4Parts.length === 4) {
    return `${ipv4Parts[0]}.${ipv4Parts[1]}.***.***`;
  }
  // IPv6
  const ipv6Parts = ip.split(":");
  if (ipv6Parts.length > 2) {
    return `${ipv6Parts[0]}:${ipv6Parts[1]}:****:****`;
  }
  return ip.slice(0, 7) + "***";
}

// Filter out any dummy / mockup data records
function isRealVisit(record: VisitRecord): boolean {
  if (!record || !record.id) return false;
  if (record.id.startsWith("v-init-")) return false;
  if (record.visitorId.startsWith("v_litclub_")) return false;
  if (record.visitorId.startsWith("v_reader_")) return false;
  if (record.visitorId.startsWith("v_writer_")) return false;
  if (record.visitorId.startsWith("v_bookworm_")) return false;
  if (record.visitorId.startsWith("test_")) return false;
  return true;
}

// Read raw visits from disk
async function readVisitsFile(): Promise<VisitRecord[]> {
  try {
    const file = await fs.readFile(analyticsFilePath, "utf8");
    const data = JSON.parse(file);
    if (Array.isArray(data)) {
      return (data as VisitRecord[]).filter(isRealVisit);
    }
    return [];
  } catch {
    return [];
  }
}

// Write raw visits to disk
async function writeVisitsFile(visits: VisitRecord[]): Promise<void> {
  try {
    const trimmed = visits.filter(isRealVisit).slice(-2000);
    await fs.mkdir(path.dirname(analyticsFilePath), { recursive: true });
    await fs.writeFile(analyticsFilePath, JSON.stringify(trimmed, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to write visits file:", error);
  }
}

// Active window threshold (5 minutes)
const ACTIVE_WINDOW_MS = 5 * 60 * 1000;

// Register live active heartbeat from browser
export function recordHeartbeat(data: {
  visitorId: string;
  path: string;
  userAgent?: string;
  screen?: string;
  country?: string;
}): void {
  if (!data.visitorId) return;
  const { browser, os, device } = parseUserAgent(data.userAgent || "");
  activeSessions.set(data.visitorId, {
    visitorId: data.visitorId,
    path: data.path.split("?")[0] || "/",
    lastSeen: Date.now(),
    device,
    browser,
    os,
    country: data.country || "Localhost / Dev",
  });
}

// Register visitor tab close / departure
export function recordVisitorLeave(visitorId: string): void {
  if (!visitorId) return;
  activeSessions.delete(visitorId);
}

// Record a new real-time visit
export async function recordVisit(data: {
  visitorId: string;
  path: string;
  referrer?: string;
  userAgent?: string;
  ip?: string | null;
  screen?: string;
  country?: string;
}): Promise<VisitRecord> {
  const { browser, os, device } = parseUserAgent(data.userAgent || "");
  const nowIso = new Date().toISOString();
  const cleanPath = data.path.split("?")[0] || "/";

  const record: VisitRecord = {
    id: randomUUID(),
    visitorId: data.visitorId || `v_${randomUUID().slice(0, 8)}`,
    timestamp: nowIso,
    lastSeen: nowIso,
    path: cleanPath,
    referrer: cleanReferrer(data.referrer),
    browser,
    os,
    device,
    screen: data.screen || "",
    ipMasked: maskIp(data.ip),
    country: data.country || "Localhost / Dev",
  };

  // Update in-memory active session for zero-latency real-time view
  activeSessions.set(record.visitorId, {
    visitorId: record.visitorId,
    path: cleanPath,
    lastSeen: Date.now(),
    device,
    browser,
    os,
    country: record.country || "Localhost / Dev",
  });

  const visits = await readVisitsFile();
  visits.push(record);
  await writeVisitsFile(visits);

  return record;
}

// Compute analytics summary for the Admin dashboard
export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const visits = await readVisitsFile();
  const now = new Date();
  const nowMs = now.getTime();
  const oneDayAgo = new Date(nowMs - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(nowMs - 7 * 24 * 60 * 60 * 1000);
  const fiveMinutesAgo = nowMs - ACTIVE_WINDOW_MS;

  // Prune expired sessions from in-memory active map
  for (const [vId, session] of activeSessions.entries()) {
    if (nowMs - session.lastSeen > ACTIVE_WINDOW_MS) {
      activeSessions.delete(vId);
    }
  }

  // Also include recent visits within the last 5 minutes in the active sessions pool
  for (const visit of visits) {
    const visitTime = new Date(visit.timestamp).getTime();
    if (visitTime >= fiveMinutesAgo && !activeSessions.has(visit.visitorId)) {
      activeSessions.set(visit.visitorId, {
        visitorId: visit.visitorId,
        path: visit.path,
        lastSeen: visitTime,
        device: visit.device,
        browser: visit.browser,
        os: visit.os,
        country: visit.country || "Localhost / Dev",
      });
    }
  }

  const activeNow = activeSessions.size;

  // Real-time breakdown of pages currently being browsed
  const activePageMap: Record<string, number> = {};
  for (const session of activeSessions.values()) {
    activePageMap[session.path] = (activePageMap[session.path] || 0) + 1;
  }
  const activePages: ActivePageInfo[] = Object.entries(activePageMap)
    .map(([pathName, count]) => ({ path: pathName, count }))
    .sort((a, b) => b.count - a.count);

  const totalViews = visits.length;
  const uniqueVisitorsSet = new Set<string>();
  const uniqueTodaySet = new Set<string>();

  let viewsToday = 0;
  let viewsThisWeek = 0;

  const pageCounts: Record<string, number> = {};
  const deviceCounts: Record<string, number> = {};
  const browserCounts: Record<string, number> = {};
  const referrerCounts: Record<string, number> = {};

  for (const visit of visits) {
    const visitDate = new Date(visit.timestamp);
    uniqueVisitorsSet.add(visit.visitorId);

    if (visitDate >= oneDayAgo) {
      viewsToday++;
      uniqueTodaySet.add(visit.visitorId);
    }
    if (visitDate >= sevenDaysAgo) {
      viewsThisWeek++;
    }

    pageCounts[visit.path] = (pageCounts[visit.path] || 0) + 1;
    deviceCounts[visit.device] = (deviceCounts[visit.device] || 0) + 1;
    browserCounts[visit.browser] = (browserCounts[visit.browser] || 0) + 1;
    referrerCounts[visit.referrer] = (referrerCounts[visit.referrer] || 0) + 1;
  }

  const formatBreakdown = (dict: Record<string, number>, keyName: string) => {
    return Object.entries(dict)
      .map(([key, count]) => ({
        [keyName]: key,
        count,
        percentage: totalViews > 0 ? Math.round((count / totalViews) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);
  };

  const topPages = Object.entries(pageCounts)
    .map(([pathName, count]) => ({
      path: pathName,
      count,
      percentage: totalViews > 0 ? Math.round((count / totalViews) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const deviceBreakdown = formatBreakdown(deviceCounts, "device") as { device: string; count: number; percentage: number }[];
  const browserBreakdown = formatBreakdown(browserCounts, "browser") as { browser: string; count: number; percentage: number }[];
  const referrerBreakdown = formatBreakdown(referrerCounts, "referrer") as { referrer: string; count: number; percentage: number }[];

  // Return last 50 visits in reverse chronological order, tagging if active right now
  const recentVisits = [...visits]
    .reverse()
    .slice(0, 50)
    .map((visit) => {
      const vTime = new Date(visit.timestamp).getTime();
      const isLive = nowMs - vTime <= ACTIVE_WINDOW_MS || activeSessions.has(visit.visitorId);
      return {
        ...visit,
        isLive,
      };
    });

  return {
    totalViews,
    uniqueVisitors: uniqueVisitorsSet.size,
    viewsToday,
    viewsThisWeek,
    uniqueToday: uniqueTodaySet.size,
    activeNow,
    activePages,
    topPages,
    deviceBreakdown,
    browserBreakdown,
    referrerBreakdown,
    recentVisits,
  };
}

// Purge any mock/dummy data from storage
export async function purgeMockData(): Promise<{ removedCount: number }> {
  try {
    const file = await fs.readFile(analyticsFilePath, "utf8");
    const data = JSON.parse(file);
    if (!Array.isArray(data)) {
      return { removedCount: 0 };
    }
    const realOnes = (data as VisitRecord[]).filter(isRealVisit);
    const removedCount = data.length - realOnes.length;
    await fs.writeFile(analyticsFilePath, JSON.stringify(realOnes, null, 2), "utf8");
    return { removedCount };
  } catch {
    return { removedCount: 0 };
  }
}

// Reset analytics data completely
export async function resetAnalyticsData(): Promise<void> {
  activeSessions.clear();
  await writeVisitsFile([]);
}
