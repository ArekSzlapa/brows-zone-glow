/**
 * Service duration mapping in minutes
 * Centralized configuration for all service durations
 */
export const SERVICE_DURATIONS: Record<string, number> = {
  "laminacja-brwi": 60,
  "laminacja-brwi-koloryzacja": 90,
  "geometria-brwi-koloryzacja": 30,
  "geometria-brwi": 30,
  "lifting-rzes": 60,
  "lifting-rzes-koloryzacja": 90,
  "laminacja-brwi-rzes": 120,
  "laminacja-brwi-rzes-koloryzacja": 120,
} as const;

/**
 * Business hours configuration
 */
export const BUSINESS_HOURS = {
  START_HOUR: 8,
  END_HOUR: 18,
  SLOT_INTERVAL: 30, // minutes
} as const;

/**
 * Service categories for better organization
 */
export const SERVICE_CATEGORIES = {
  BROW_BAR: "Brow Bar",
  LASH_BAR: "Lash Bar",
  BROW_AND_LASH: "Brow & Lash",
} as const;
