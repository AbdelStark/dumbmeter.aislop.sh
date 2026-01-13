import type { StatusStamp } from "@/lib/types";

export type ZoneToken = "sharp" | "normal" | "sus" | "panic";

export type ZoneInfo = {
  name: "Sharp" | "Normal" | "Sus" | "Emergency";
  token: ZoneToken;
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getZone(value: number): ZoneInfo {
  const v = clamp(value, 0, 100);
  if (v <= 25) return { name: "Sharp", token: "sharp" };
  if (v <= 50) return { name: "Normal", token: "normal" };
  if (v <= 75) return { name: "Sus", token: "sus" };
  return { name: "Emergency", token: "panic" };
}

export function getStampForScore(value: number): StatusStamp {
  if (value >= 76) return "BROKEN";
  if (value >= 51) return "SUS";
  return "OK";
}

export function formatDelta(delta?: number) {
  if (delta === undefined || delta === null) return "";
  const sign = delta > 0 ? "+" : "";
  return `${sign}${delta}`;
}

export function formatDisplayDate(dateISO: string) {
  const date = new Date(dateISO);
  if (Number.isNaN(date.getTime())) return dateISO;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
}

export function formatTimeAgo(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.max(1, Math.round(diffMs / 60000));
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}
