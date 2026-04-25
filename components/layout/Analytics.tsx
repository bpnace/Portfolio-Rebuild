"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const measurementId = "G-9WPXK6PNZ7";
const analyticsEmbeddingName = "Google Analytics 4";

type Ccm19Embedding = {
  id?: string;
  name?: string;
};

declare global {
  interface Window {
    CCM?: {
      acceptedEmbeddings?: Ccm19Embedding[];
    };
  }
}

function isAnalyticsEmbedding(name: string | undefined) {
  return name?.trim().toLowerCase() === analyticsEmbeddingName.toLowerCase();
}

function hasAnalyticsConsent() {
  return (
    window.CCM?.acceptedEmbeddings?.some((embedding) =>
      isAnalyticsEmbedding(embedding.name),
    ) ?? false
  );
}

export function Analytics() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setAnalyticsAllowed(hasAnalyticsConsent());
    };

    const handleEmbeddingAccepted = (event: Event) => {
      const acceptedEmbedding = event as CustomEvent<Ccm19Embedding>;

      if (
        isAnalyticsEmbedding(acceptedEmbedding.detail?.name) ||
        hasAnalyticsConsent()
      ) {
        setAnalyticsAllowed(true);
      }
    };

    syncConsent();
    window.addEventListener("ccm19WidgetLoaded", syncConsent);
    window.addEventListener("ccm19WidgetClosed", syncConsent);
    window.addEventListener(
      "ccm19EmbeddingAccepted",
      handleEmbeddingAccepted,
    );

    return () => {
      window.removeEventListener("ccm19WidgetLoaded", syncConsent);
      window.removeEventListener("ccm19WidgetClosed", syncConsent);
      window.removeEventListener(
        "ccm19EmbeddingAccepted",
        handleEmbeddingAccepted,
      );
    };
  }, []);

  if (!analyticsAllowed) {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
