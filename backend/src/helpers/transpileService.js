const transpileService = (service) => {
  switch (service) {
    case "laminacja-brwi":
      return "Laminacja brwi";
    case "laminacja-brwi-koloryzacja":
      return "Laminacja brwi z koloryzacją";
    case "geometria-brwi-koloryzacja":
      return "Geometria brwi z koloryzacją";
    case "lifting-rzes":
      return "Lifting rzęs";
    case "lifting-rzes-koloryzacja":
      return "Lifting rzęs z koloryzacją";
    case "laminacja-brwi-rzes":
      return "Lifting brwi i rzęs";
    case "laminacja-brwi-rzes-koloryzacja":
      return "Lifting brwi i rzęs z koloryzacją";
  }
};

module.exports = transpileService;
