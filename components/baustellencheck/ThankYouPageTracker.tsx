"use client";

import { useEffect } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics-events";

export function ThankYouPageTracker() {
  useEffect(() => {
    trackAnalyticsEvent("thank_you_page_view", {
      page: "/webseitecheck/danke",
    });
  }, []);

  return null;
}
