const transpileService = (service) => {
  switch (service) {
    case "laminacja-brwi":
      return "LAMINACJA BRWI • ODŻYWKA";
    case "laminacja-brwi-koloryzacja":
      return "LAMINACJA BRWI • FARBKA • ODŻYWKA";
    case "geometria-brwi-koloryzacja":
      return "GEOMETRIA BRWI • FARBKA • ODŻYWKA";
    case "geometria-brwi":
      return "GEOMETRIA BRWI • ODŻYWKA";
    case "lifting-rzes":
      return "LIFTING RZĘS • ODŻYWKA";
    case "lifting-rzes-koloryzacja":
      return "LIFTING RZĘS • FARBKA • ODŻYWKA";
    case "laminacja-brwi-rzes":
      return "PAKIET LAMINACJI • ODŻYWKA";
    case "laminacja-brwi-rzes-koloryzacja":
      return "PAKIET LAMINACJI • FARBKA • ODŻYWKA";
  }
};

module.exports = transpileService;
