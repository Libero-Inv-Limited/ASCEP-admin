/**
 * Application Constants
 *
 * Centralized constants to avoid magic numbers and strings
 */

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [2, 5, 10, 20, 50, 100] as const,
  SMALL_PAGE_SIZE: 2,
  MEDIUM_PAGE_SIZE: 10,
  LARGE_PAGE_SIZE: 20,
} as const;

// Timeouts and Delays
export const TIMEOUTS = {
  API_TIMEOUT: 30000, // 30 seconds
  DEBOUNCE_DELAY: 300, // 300ms
  TOAST_DURATION: 5000, // 5 seconds
  OTP_EXPIRY: 300000, // 5 minutes
  SESSION_CHECK_INTERVAL: 60000, // 1 minute
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
  THEME: "theme",
  LOGOUT_TIMESTAMP: "logoutTimestamp",
  PERMISSIONS: "permissions",
} as const;

// API Response Status
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY_DATE: "MMM dd, yyyy",
  DISPLAY_DATETIME: "MMM dd, yyyy HH:mm",
  DISPLAY_TIME: "HH:mm",
  ISO_DATE: "yyyy-MM-dd",
  ISO_DATETIME: "yyyy-MM-dd'T'HH:mm:ss",
  LONG_DATE: "MMMM dd, yyyy",
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
  ACCEPTED_DOCUMENT_TYPES: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
} as const;

// Query Keys (for React Query)
export const QUERY_KEYS = {
  USER_PROFILE: "user-profile",
  USERS: "users",
  ROLES: "roles",
  PERMISSIONS: "permissions",
  SDGS: "sdgs",
  SDG_TARGETS: "sdg-targets",
  CATEGORIES: "categories",
  WARDS: "wards",
  AUTHORITIES: "authorities",
  // Democracy
  DEBATES: "debates",
  PROPOSALS: "proposals",
  INITIATIVES: "initiatives",
  BUDGETS: "budgets",
  VOTES: "votes",
  // Dialogue
  DIALOGUE_REQUESTS: "dialogue-requests",
  DIALOGUE_CATEGORIES: "dialogue-categories",
  // Response
  SURVEYS: "surveys",
  SURVEY_RESPONSES: "survey-responses",
  REPORTS: "reports",
  RESPONSE_CATEGORIES: "response-categories",
} as const;

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 50,
  OTP_LENGTH: 6,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 5000,
  MIN_TITLE_LENGTH: 3,
  MAX_TITLE_LENGTH: 200,
} as const;

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  FORGOT_PASSWORD: "/auth/forgot-password",
  DASHBOARD: "/main/dashboard",
  USERS: "/users",
  SETTINGS: "/settings",
  NOT_FOUND: "/404",
} as const;

// Permissions
export const PERMISSIONS = {
  ACCESS_DASHBOARD: "access dashboard module",
  ACCESS_USERS: "access users module",
  ACCESS_DIALOGUE: "access dialogue module",
  ACCESS_DEMOCRACY: "access democracy module",
  ACCESS_RESPONSE: "access response module",
  ACCESS_SETTINGS: "access settings module",
} as const;

// Status Values
export const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: "#FFC334",
  SUCCESS: "#22C55E",
  ERROR: "#EF4444",
  WARNING: "#F59E0B",
  INFO: "#3B82F6",
  PURPLE: "#A855F7",
  PINK: "#EC4899",
} as const;

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  URL: /^https?:\/\/.+/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;

export default {
  PAGINATION,
  TIMEOUTS,
  STORAGE_KEYS,
  HTTP_STATUS,
  DATE_FORMATS,
  FILE_UPLOAD,
  QUERY_KEYS,
  VALIDATION,
  ROUTES,
  PERMISSIONS,
  STATUS,
  CHART_COLORS,
  REGEX_PATTERNS,
};
