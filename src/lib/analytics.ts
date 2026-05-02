// Lightweight analytics utility
// Fires custom events that can be picked up by Google Analytics, GTM, or any analytics provider

type AnalyticsEvent =
  | { event: "view_product"; productId: string; productName: string; price: number; collection?: string }
  | { event: "add_to_cart"; productId: string; productName: string; variantId: string; price: number }
  | { event: "begin_checkout"; itemCount: number; total: number }
  | { event: "purchase"; orderId?: string; total: number; itemCount: number }
  | { event: "quiz_start" }
  | { event: "quiz_complete"; identity: string }
  | { event: "quiz_result_click"; identity: string; action: string }
  | { event: "coupon_activated"; code: string }
  | { event: "email_captured"; source: string };

export function trackEvent(data: AnalyticsEvent) {
  // Log in development
  if (import.meta.env.DEV) {
    console.log("[Analytics]", data.event, data);
  }

  // Push to dataLayer for GTM
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push(data);
  }

  // Push to gtag for GA4
  if (typeof window !== "undefined" && (window as any).gtag) {
    const { event, ...params } = data;
    (window as any).gtag("event", event, params);
  }
}
