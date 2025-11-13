/**
 * Local Storage Utilities
 *
 * Safe wrappers around localStorage with error handling
 * and type safety support
 */

/**
 * Safely get an item from localStorage
 * @param key - The key to retrieve
 * @param defaultValue - Optional default value if key doesn't exist
 * @returns The value or null/defaultValue if not found
 */
export function getStorageItem<T = string>(
  key: string,
  defaultValue?: T
): T | null {
  try {
    const item = localStorage.getItem(key);

    if (item === null) {
      return defaultValue ?? null;
    }

    // Try to parse as JSON, if it fails return as string
    try {
      return JSON.parse(item) as T;
    } catch {
      return item as T;
    }
  } catch (error) {
    console.error(`Error reading from localStorage (key: ${key}):`, error);
    return defaultValue ?? null;
  }
}

/**
 * Safely set an item in localStorage
 * @param key - The key to set
 * @param value - The value to store (will be JSON stringified if object)
 * @returns true if successful, false otherwise
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  try {
    const serializedValue =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (key: ${key}):`, error);
    return false;
  }
}

/**
 * Safely remove an item from localStorage
 * @param key - The key to remove
 * @returns true if successful, false otherwise
 */
export function removeStorageItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (key: ${key}):`, error);
    return false;
  }
}

/**
 * Clear all items from localStorage
 * @returns true if successful, false otherwise
 */
export function clearStorage(): boolean {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
}

/**
 * Check if localStorage is available
 * @returns true if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get all keys from localStorage
 * @returns Array of all keys
 */
export function getAllStorageKeys(): string[] {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error("Error getting localStorage keys:", error);
    return [];
  }
}
