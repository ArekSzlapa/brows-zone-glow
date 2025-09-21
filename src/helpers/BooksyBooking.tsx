export default function openBooksy() {
  const appLink =
    "booksy://pl-pl/312248_brows-zone-aleksandra-szlapa_brwi-i-rzesy_12710_czaniec";
  const webLink =
    "https://booksy.com/pl-pl/312248_brows-zone-aleksandra-szlapa_brwi-i-rzesy_12710_czaniec#ba_s=seo";

  // Try to open Booksy app
  window.location.href = appLink;

  // Fallback after 1.5s if app not installed
  setTimeout(() => {
    window.location.href = webLink;
  }, 1500);
}
