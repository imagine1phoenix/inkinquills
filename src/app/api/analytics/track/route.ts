import { NextResponse } from "next/server";
import { recordVisit } from "@/lib/analytics";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { path = "/", referrer = "", visitorId = "", screen = "" } = body;

    // Do not track admin or internal API requests
    if (typeof path === "string" && (path.startsWith("/admin") || path.startsWith("/api"))) {
      return NextResponse.json({ success: false, reason: "Ignored path" });
    }

    const userAgent = request.headers.get("user-agent") || "";
    
    // Extract IP safely
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : (realIp || "127.0.0.1");

    // Extract country if provided by edge/hosting proxies (e.g. Vercel / Cloudflare)
    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      undefined;

    await recordVisit({
      visitorId: typeof visitorId === "string" ? visitorId : "",
      path: typeof path === "string" ? path : "/",
      referrer: typeof referrer === "string" ? referrer : "",
      userAgent,
      ip: clientIp,
      screen: typeof screen === "string" ? screen : "",
      country,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in analytics track API:", error);
    return NextResponse.json({ success: false, error: "Tracking failed" }, { status: 500 });
  }
}
