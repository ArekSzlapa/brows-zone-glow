export default function openBooksy() {
  //   const appLink =
  //     "booksy://pl-pl/312248_brows-zone-aleksandra-szlapa_brwi-i-rzesy_12710_czaniec";
  const webLink = "http://brows-zone.booksy.com/a/";

  // Try to open Booksy app
  window.location.href = webLink;

  // Fallback after 1.5s if app not installed
  //   setTimeout(() => {
  //     window.location.href = webLink;
  //   }, 1500);
}
