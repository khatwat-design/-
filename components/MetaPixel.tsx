"use client";

import Script from "next/script";
import { useRef } from "react";

const PIXEL_ID = "1076444227902192";

export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          alt=""
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

type FbqFn = (...args: unknown[]) => void;

function getFbq(): FbqFn | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { fbq?: FbqFn }).fbq;
}

export function trackPixelEvent(
  event: string,
  params?: Record<string, unknown>
) {
  const fbq = getFbq();
  if (fbq) fbq("track", event, params);
}

let _purchaseFired = false;

export function trackPurchaseOnce({
  value,
  currency = "IQD",
  quantity,
  orderId,
  contentName,
}: {
  value: number;
  currency?: string;
  quantity: number;
  orderId?: string;
  contentName?: string;
}): string | undefined {
  if (_purchaseFired) return undefined;
  _purchaseFired = true;

  const eventId = orderId || `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  trackPixelEvent("Purchase", {
    value,
    currency,
    content_type: "product",
    content_name: contentName,
    quantity,
    content_ids: [eventId],
    event_id: eventId,
  });

  return eventId;
}

export function usePurchaseGuard() {
  const fired = useRef(false);

  return {
    trackPurchaseOnce: (params: {
      value: number;
      currency?: string;
      quantity: number;
      orderId?: string;
      contentName?: string;
    }) => {
      if (fired.current) return undefined;
      fired.current = true;

      const eventId =
        params.orderId ||
        `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

      trackPixelEvent("Purchase", {
        value: params.value,
        currency: params.currency || "IQD",
        content_type: "product",
        content_name: params.contentName,
        quantity: params.quantity,
        content_ids: [eventId],
        event_id: eventId,
      });

      return eventId;
    },
  };
}
