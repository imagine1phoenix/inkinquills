import { NextResponse } from "next/server";
import {
  recordVisit,
  recordHeartbeat,
  recordVisitorLeave,
  resolveLocation,
} from "@/lib/analytics";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      type = "pageview",
      path = "/",
      referrer = "",
      visitorId = "",
      screen = "",
      timezone = "",
    } = body;

    // Do not track admin or internal API requests
    if (typeof path === "string" && (path.startsWith("/admin") || path.startsWith("/api"))) {
      return NextResponse.json({ success: false, reason: "Ignored path" });
    }

    if (!visitorId || typeof visitorId !== "string") {
      return NextResponse.json({ success: false, reason: "Missing visitorId" });
    }

    const userAgent = request.headers.get("user-agent") || "";

    // Extract IP safely
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";

    // Extract country/location
    const countryHeader =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      undefined;

    const location = resolveLocation({
      countryHeader,
      timezone: typeof timezone === "string" ? timezone : undefined,
      ip: clientIp,
    });

    if (type === "heartbeat") {
      recordHeartbeat({
        visitorId,
        path: typeof path === "string" ? path : "/",
        userAgent,
        screen: typeof screen === "string" ? screen : "",
        country: location,
      });
      return NextResponse.json({ success: true, type: "heartbeat" });
    }

    if (type === "leave") {
      recordVisitorLeave(visitorId);
      return NextResponse.json({ success: true, type: "leave" });
    }

    // Default: pageview
    await recordVisit({
      visitorId,
      path: typeof path === "string" ? path : "/",
      referrer: typeof referrer === "string" ? referrer : "",
      userAgent,
      ip: clientIp,
      screen: typeof screen === "string" ? screen : "",
      country: location,
    });

    return NextResponse.json({ success: true, type: "pageview" });
  } catch (error) {
    console.error("Error in analytics track API:", error);
    return NextResponse.json({ success: false, error: "Tracking failed" }, { status: 500 });
  }
}
