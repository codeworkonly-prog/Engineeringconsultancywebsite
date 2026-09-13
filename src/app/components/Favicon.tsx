/**
 * The favicon is now served statically from /public (see index.html),
 * so no runtime DOM manipulation is needed. Kept as a no-op component
 * to preserve the App tree shape; can be removed along with its usage
 * in App.tsx in a future cleanup.
 */
export function Favicon() {
  return null;
}
