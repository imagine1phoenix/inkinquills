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

    // Prevent duplicate track calls on same page in one session
    if (lastTracked.current === pathname) {
      return;
    }
    lastTracked.current = pathname;

    // Retrieve or generate anonymous persistent visitor ID in localStorage
    let visitorId = "";
    try {
      visitorId = localStorage.getItem("iiq_vid") || "";
      if (!visitorId) {
        visitorId = `v_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
        localStorage.setItem("iiq_vid", visitorId);
      }
    } catch {
      // Ignore storage restrictions
    }

    const payload = JSON.stringify({
      path: pathname,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      visitorId,
      screen: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "",
    });

    try {
      if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/analytics/track", blob);
      } else {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Analytics failures should never impact user browsing experience
    }
  }, [pathname]);

  return null;
}
