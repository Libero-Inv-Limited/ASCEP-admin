/**
 * API Configuration
 *
 * Base URLs are loaded from environment variables to support
 * different configurations for dev, staging, and production.
 */

const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://lens1.anambrastate.gov.ng";
export const frontendURL = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";

// Validate environment variables in development
if (import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL) {
  console.warn(
    "VITE_API_BASE_URL is not defined. Using fallback URL. " +
    "Please create a .env file based on .env.example"
  );
}

export default baseUrl;
