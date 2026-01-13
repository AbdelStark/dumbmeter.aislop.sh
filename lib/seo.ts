export const SITE_URL = "https://dumbmeter.aislope.sh";
export const SITE_NAME = "Dumb Meter";
export const DEFAULT_DESCRIPTION =
  "Daily LLM vibe check that shows when models drift from their own baseline. Auto evals + community reports.";
export const OG_IMAGE = "/og.svg";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
