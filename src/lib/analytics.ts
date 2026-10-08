import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type DeviceType = "desktop" | "mobile" | "tablet" | "unknown";

export interface VisitRecord {
  id: string;
  visitorId: string;
  timestamp: string; // ISO string
  path: string;
  referrer: string;
  browser: string;
  os: string;
  device: DeviceType;
  screen?: string;
  ipMasked?: string;
  country?: string;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  viewsToday: number;
  viewsThisWeek: number;
  uniqueToday: number;
  topPages: { path: string; count: number; percentage: number }[];
  deviceBreakdown: { device: string; count: number; percentage: number }[];
  browserBreakdown: { browser: string; count: number; percentage: number }[];
  referrerBreakdown: { referrer: string; count: number; percentage: number }[];
  recentVisits: VisitRecord[];
}

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

// Read raw visits from disk
async function readVisitsFile(): Promise<VisitRecord[]> {
  try {
    const file = await fs.readFile(analyticsFilePath, "utf8");
    const data = JSON.parse(file);
    if (Array.isArray(data)) return data as VisitRecord[];
    return [];
  } catch {
    return [];
  }
}

// Write raw visits to disk
async function writeVisitsFile(visits: VisitRecord[]): Promise<void> {
  try {
    // Keep up to 2000 most recent visits to maintain performance
    const trimmed = visits.slice(-2000);
    await fs.mkdir(path.dirname(analyticsFilePath), { recursive: true });
    await fs.writeFile(analyticsFilePath, JSON.stringify(trimmed, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to write visits file:", error);
  }
}

// Record a new visit
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
  const record: VisitRecord = {
    id: randomUUID(),
    visitorId: data.visitorId || `v_${randomUUID().slice(0, 8)}`,
    timestamp: new Date().toISOString(),
    path: data.path.split("?")[0] || "/",
    referrer: cleanReferrer(data.referrer),
    browser,
    os,
    device,
    screen: data.screen || "",
    ipMasked: maskIp(data.ip),
    country: data.country || "Local / Unknown",
  };

  const visits = await readVisitsFile();
  visits.push(record);
  await writeVisitsFile(visits);

  return record;
}

// Compute analytics summary for the Admin dashboard
export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const visits = await readVisitsFile();
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

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

    // Counts
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

  // Return last 50 visits in reverse chronological order
  const recentVisits = [...visits].reverse().slice(0, 50);

  return {
    totalViews,
    uniqueVisitors: uniqueVisitorsSet.size,
    viewsToday,
    viewsThisWeek,
    uniqueToday: uniqueTodaySet.size,
    topPages,
    deviceBreakdown,
    browserBreakdown,
    referrerBreakdown,
    recentVisits,
  };
}

// Reset analytics data
export async function resetAnalyticsData(): Promise<void> {
  await writeVisitsFile([]);
}
