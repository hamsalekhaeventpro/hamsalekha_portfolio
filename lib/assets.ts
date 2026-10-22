import assetManifest from "./asset-manifest.json";

/**
 * Returns a versioned asset URL for cache invalidation.
 * Appends ?v=<hash> based on the content hash in lib/asset-manifest.json.
 * 
 * When the file in public/images/ changes, running `npm run update-images`
 * updates the content hash in asset-manifest.json, ensuring browsers and
 * Next.js image optimization caches immediately fetch and optimize the new image.
 * 
 * @param rawPath Relative path starting with /images/ (e.g., "/images/services/furniture.jpg")
 * @returns Versioned URL (e.g., "/images/services/furniture.jpg?v=b1e05941")
 */
export function getAssetUrl(rawPath: string): string {
  if (!rawPath || typeof rawPath !== "string") return rawPath;
  
  // External URLs or data URIs remain untouched
  if (rawPath.startsWith("http://") || rawPath.startsWith("https://") || rawPath.startsWith("data:")) {
    return rawPath;
  }

  // Separate path from any existing query parameter
  const [cleanPath] = rawPath.split("?");
  const normalizedPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;

  const version = (assetManifest as Record<string, string>)[normalizedPath];
  if (version) {
    return `${normalizedPath}?v=${version}`;
  }

  return rawPath;
}

export const asset = getAssetUrl;
export default getAssetUrl;
