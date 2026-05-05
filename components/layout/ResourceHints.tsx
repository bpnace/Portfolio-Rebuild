"use client";

import ReactDOM from "react-dom";

export function ResourceHints() {
  ReactDOM.preconnect("https://cloud.ccm19.de", { crossOrigin: "" });
  ReactDOM.preconnect("https://www.clarity.ms", { crossOrigin: "" });

  return null;
}
