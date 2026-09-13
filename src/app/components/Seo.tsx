import { useEffect } from 'react';

/**
 * Canonical site origin. Must match the canonical URLs already used across
 * the site and the sitemap/robots files in /public.
 */
export const SITE_URL = 'https://www.dikshacp.com.np';

export const SITE_NAME = 'Diksha Consulting and Projects Pvt. Ltd.';

/** Default social preview image — must exist at /og-image.webp (see /public). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.webp`;

export interface JsonLdObject {
  [key: string]: unknown;
}

export interface SeoProps {
  /** Page title. Rendered as-is (do not repeat the brand in most cases). */
  title: string;
  description?: string;
  /**
   * Canonical path (e.g. "/about") or absolute URL. Defaults to pathname
   * with any query string stripped.
   */
  canonicalPath?: string;
  /**
   * For dynamic pages: canonical should keep the content, not filter params.
   * Pass false to skip canonical output entirely.
   */
  noCanonical?: boolean;
  /** "index, follow" (default) or "noindex, follow" etc. */
  robots?: string;
  /** Open Graph type; defaults to "website". */
  ogType?: 'website' | 'article' | 'profile';
  /** Absolute image URL for OG/Twitter cards. */
  image?: string;
  /** JSON-LD structured data objects (single object, or @graph array). */
  jsonLd?: JsonLdObject | JsonLdObject[];
  /** Stable script id for JSON-LD so re-renders replace instead of duplicate. */
  jsonLdId?: string;
}

const toAbsolute = (pathOrUrl: string) =>
  pathOrUrl.startsWith('http') ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;

function upsertMeta(
  attr: 'name' | 'property',
  key: string,
  content: string,
): void {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  if (tag.getAttribute('content') !== content) {
    tag.setAttribute('content', content);
  }
}

function upsertLink(rel: string, href: string): void {
  let tag = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`,
  );
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  if (tag.getAttribute('href') !== href) {
    tag.setAttribute('href', href);
  }
}

/**
 * Sets the document title and upserts description/robots/canonical/OG/Twitter
 * meta tags. Unlike react-helmet-async (which appends duplicates instead of
 * replacing the static tags in index.html), this updates existing tags in
 * place so exactly one of each tag exists at any time.
 *
 * JSON-LD blocks are injected as a single script (with @graph when multiple
 * objects are given) using a stable id, so StrictMode double-invocation and
 * client-side navigation never leave stale or duplicate schema behind.
 */
export function Seo({
  title,
  description,
  canonicalPath,
  noCanonical = false,
  robots = 'index, follow',
  ogType = 'website',
  image = DEFAULT_OG_IMAGE,
  jsonLd,
  jsonLdId,
}: SeoProps) {
  useEffect(() => {
    const canonicalHref = noCanonical
      ? null
      : toAbsolute(canonicalPath || `${window.location.pathname}`);

    document.title = title;

    if (description) upsertMeta('name', 'description', description);
    if (robots) upsertMeta('name', 'robots', robots);

    if (canonicalHref) upsertLink('canonical', canonicalHref);

    // Open Graph
    upsertMeta('property', 'og:title', title);
    if (description) upsertMeta('property', 'og:description', description);
    if (canonicalHref) upsertMeta('property', 'og:url', canonicalHref);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    if (image) upsertMeta('property', 'og:image', toAbsolute(image));
    upsertMeta('property', 'og:image:alt', title);
    upsertMeta('property', 'og:locale', 'en_US');

    // Twitter/X card
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    if (description) upsertMeta('name', 'twitter:description', description);
    if (image) upsertMeta('name', 'twitter:image', toAbsolute(image));

    // Structured data
    const scriptId = jsonLdId || 'page-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    const jsonLdItems = jsonLd
      ? Array.isArray(jsonLd)
        ? jsonLd
        : [jsonLd]
      : [];
    if (jsonLdItems.length > 0) {
      const payload =
        jsonLdItems.length === 1
          ? { '@context': 'https://schema.org', ...jsonLdItems[0] }
          : { '@context': 'https://schema.org', '@graph': jsonLdItems };
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(payload);
    } else if (script) {
      script.remove();
    }
  }, [
    title,
    description,
    canonicalPath,
    noCanonical,
    robots,
    ogType,
    image,
    jsonLd,
    jsonLdId,
  ]);

  return null;
}
