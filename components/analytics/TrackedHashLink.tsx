"use client";

import type { ComponentProps, MouseEvent, ReactNode } from "react";
import {
  type AnalyticsEventName,
  trackAnalyticsEvent,
} from "@/lib/analytics-events";
import { HashLink } from "@/components/ui/HashLink";

type TrackedHashLinkProps = Omit<ComponentProps<typeof HashLink>, "children"> & {
  children: ReactNode;
  eventName: AnalyticsEventName;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

export function TrackedHashLink({
  eventName,
  eventParams,
  onClick,
  children,
  ...props
}: TrackedHashLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackAnalyticsEvent(eventName, eventParams);
    onClick?.(event);
  }

  return (
    <HashLink onClick={handleClick} {...props}>
      {children}
    </HashLink>
  );
}
