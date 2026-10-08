"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    // Skip admin and API paths to keep analytics clean
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    // Retrieve or generate anonymous persistent visitor ID in localStorage
    let visitorId = "";
    try {
      visitorId = localStorage.getItem("iiq_vid") || "";
      if (!visitorId) {
        visitorId = `v_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
        localStorage.setItem("iiq_vid", visitorId);
      }
    } catch {
      // Storage access may be restricted
      visitorId = `v_anon_${Math.random().toString(36).substring(2, 8)}`;
    }

    const timezone =
      typeof Intl !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone || ""
        : "";
    const screen =
      typeof window !== "undefined"
        ? `${window.innerWidth}x${window.innerHeight}`
        : "";

    // 1. Track pageview whenever the pathname changes
    if (lastTracked.current !== pathname) {
      lastTracked.current = pathname;

      const pageviewPayload = JSON.stringify({
        type: "pageview",
        path: pathname,
        referrer: typeof document !== "undefined" ? document.referrer : "",
        visitorId,
        screen,
        timezone,
      });

      try {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: pageviewPayload,
          keepalive: true,
        }).catch(() => {});
      } catch {
        // Safe fail
      }
    }

    // 2. Real-time active heartbeat while reading/browsing this page
    const sendHeartbeat = () => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") {
        return;
      }
      try {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "heartbeat",
            path: pathname,
            visitorId,
            screen,
            timezone,
          }),
          keepalive: true,
        }).catch(() => {});
      } catch {
        // Safe fail
      }
    };

    // Heartbeat every 20 seconds
    const heartbeatTimer = setInterval(sendHeartbeat, 20000);

    const handleVisibilityChange = () => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        sendHeartbeat();
      }
    };

    const handleBeforeUnload = () => {
      const leavePayload = JSON.stringify({
        type: "leave",
        visitorId,
      });
      try {
        if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
          navigator.sendBeacon(
            "/api/analytics/track",
            new Blob([leavePayload], { type: "application/json" })
          );
        }
      } catch {
        // Safe fail
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      clearInterval(heartbeatTimer);
      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
    };
  }, [pathname]);

  return null;
}
