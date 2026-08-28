/**
 * Build a URL for files in public/data/.
 * Works in dev, production build, and VPS subpath deploys (via Vite BASE_URL).
 */
export function getPublicDataUrl(filename) {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedFile = String(filename).replace(/^\//, "");
  return `${normalizedBase}data/${normalizedFile}`;
}
