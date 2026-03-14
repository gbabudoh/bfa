/**
 * Utility to convert string to camelCase for consistent translation keys.
 * Handles accents, special characters, and multiple spaces.
 * Example: "Home Décor & Interior Items" -> "homeDecorAndInteriorItems"
 */
export const toCamelCase = (str: string): string => {
  if (!str) return '';
  
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents (e.g., é -> e)
    .replace(/ & /g, " and ") // Handle ampersands
    .replace(/[^a-zA-Z0-9 ]/g, " ") // Replace non-alphanumeric with spaces
    .split(" ")
    .filter(Boolean)
    .map((word, index) => {
      const cleaned = word.toLowerCase();
      // Capitalize every word except the first one
      return index === 0 ? cleaned : cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    })
    .join("");
};
