# Refactoring Guide - ASCEP Admin Application

## Overview
This document outlines the refactoring and optimization work completed on the ASCEP Admin React application.

## What Was Refactored

### 1. Configuration & Environment Variables ✅
**Before:**
```typescript
// src/api/baseUrl.ts
const baseUrl = "https://lens1.anambrastate.gov.ng";
export const frontendURL = "http://localhost:5173";
```

**After:**
```typescript
// src/api/baseUrl.ts - Now uses environment variables
const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://lens1.anambrastate.gov.ng";
export const frontendURL = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";
```

**New Files Created:**
- `.env.example` - Template for environment variables
- `.env` - Local environment configuration
- Updated `.gitignore` to exclude `.env` files

### 2. Centralized Axios Instance ✅
**Problem:** Axios interceptors were being set up inside React components, causing re-initialization on every render.

**Solution:** Created `/src/lib/axios.ts` with:
- Centralized axios instance with base configuration
- Request interceptor for automatic token injection
- Response interceptor for error handling
- Proper timeout configuration (30 seconds)
- Development mode logging

**Usage:**
```typescript
import { apiClient } from "@/lib/axios";

// Instead of axios.post(...)
await apiClient.post("/endpoint", data);
```

### 3. React Query Optimization ✅
**Before:**
```typescript
const queryClient = new QueryClient(); // Using defaults
```

**After:**
Created `/src/lib/react-query.ts` with:
- Optimized cache configuration
- Stale time: 5 minutes
- Cache time: 10 minutes
- Smart retry logic (don't retry 4xx errors)
- Query key factory for consistency
- Default error handlers

**Usage:**
```typescript
import { queryClient, queryKeys } from "@/lib/react-query";

// Use predefined query keys
const { data } = useQuery(queryKeys.users.detail(userId), fetchUser);
```

### 4. Utility Functions ✅

#### Storage Utilities (`/src/utils/storage.ts`)
Safe wrappers around localStorage with error handling:
- `getStorageItem<T>(key, defaultValue?)` - Safe get with type safety
- `setStorageItem<T>(key, value)` - Safe set with automatic JSON serialization
- `removeStorageItem(key)` - Safe remove
- `clearStorage()` - Clear all storage
- `isStorageAvailable()` - Check if localStorage works

**Before:**
```typescript
localStorage.setItem("key", value); // No error handling
const data = localStorage.getItem("key");
```

**After:**
```typescript
import { getStorageItem, setStorageItem } from "@/utils/storage";

setStorageItem("key", value); // With error handling
const data = getStorageItem("key", defaultValue);
```

#### Constants (`/src/utils/constants.ts`)
Centralized constants to avoid magic numbers/strings:
- `PAGINATION` - Page sizes and defaults
- `TIMEOUTS` - API timeouts, debounce delays
- `STORAGE_KEYS` - localStorage key names
- `HTTP_STATUS` - Status code constants
- `DATE_FORMATS` - Date format strings
- `FILE_UPLOAD` - File size limits, accepted types
- `QUERY_KEYS` - React Query key patterns
- `VALIDATION` - Validation rules
- `ROUTES` - Route paths
- `PERMISSIONS` - Permission names
- `REGEX_PATTERNS` - Common regex patterns

**Usage:**
```typescript
import { PAGINATION, STORAGE_KEYS } from "@/utils/constants";

const token = getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
const perPage = PAGINATION.DEFAULT_PAGE_SIZE; // 10
```

#### Logger (`/src/utils/logger.ts`)
Centralized logging that only logs in development:
- `logger.info(message, metadata?, context?)`
- `logger.warn(message, metadata?, context?)`
- `logger.error(message, error?, context?)`
- `logger.debug(message, metadata?, context?)`
- `logger.group(label, callback)`
- `logger.apiRequest/apiResponse/apiError()` - Specialized API logging

**Usage:**
```typescript
import logger from "@/utils/logger";

logger.info("User logged in", { userId: 123 }, "Auth");
logger.error("Failed to fetch data", error, "API");
```

### 5. Error Boundary ✅
Created `/src/components/ErrorBoundary.tsx`:
- Catches React component errors
- Prevents app crashes
- Shows user-friendly error UI
- Displays error details in development
- Logs errors for monitoring
- Provides recovery options (Try Again, Reload, Go Home)

**Implementation:**
```typescript
// Already added to src/App.tsx
<ErrorBoundary>
  <QueryClientProvider client={queryClient}>
    {/* Rest of app */}
  </QueryClientProvider>
</ErrorBoundary>
```

### 6. Updated Components ✅
- `src/App.tsx` - Uses new queryClient, added ErrorBoundary
- `src/providers/AuthProvider.tsx` - Uses storage utilities and logger
- `src/api/config.ts` - Uses storage utilities and constants
- `src/components/Democracy/debates/RelatedDebates.tsx` - Uses logger instead of console.log

---

## Migration Tasks

### Remaining Console.log Replacements
The following files still have console.log statements that should be replaced with the logger utility:

1. **src/components/Response/CreateSurveyQuestion.tsx:29**
   ```typescript
   // Replace:
   console.log("Submitted data:", data);
   // With:
   import logger from "@/utils/logger";
   logger.debug("Survey question submitted", data, "Survey");
   ```

2. **src/components/Response/CreateReportModal.tsx:45**
   ```typescript
   // Replace:
   console.log(values);
   // With:
   logger.debug("Report created", values, "Reports");
   ```

3. **src/components/Response/DownloadReport.tsx:41**
   ```typescript
   // Replace:
   console.error("Error loading image:", error);
   // With:
   logger.error("Failed to load image", error, "Reports");
   ```

4. **src/components/Landing/ContactFormSection.tsx:19**
   ```typescript
   // Replace:
   console.log(e);
   // With:
   logger.debug("Contact form submitted", e, "Contact");
   ```

5. **src/components/Settings/ApiIntegrations/NewApi.tsx:28-29**
   ```typescript
   // Replace:
   console.log(data);
   console.log(setActiveIntegrationStep);
   // With:
   logger.debug("API integration data", data, "Settings");
   logger.debug("Active integration step", { setActiveIntegrationStep }, "Settings");
   ```

6. **src/components/Democracy/initiatives/InitiativeMeetingLink.tsx:13,21,24**
   ```typescript
   // Replace all console.log/error with logger
   logger.error("Clipboard API not available", undefined, "Initiatives");
   logger.info("Text copied to clipboard", { text }, "Initiatives");
   logger.error("Failed to copy to clipboard", error, "Initiatives");
   ```

7. **src/pages/Democracy/proposals/start-proposal.tsx**
   - Check and replace any console.log statements

### API Layer Migration
Consider migrating API calls to use the new `apiClient` from `/src/lib/axios.ts`:

**Current pattern:**
```typescript
import axios from "axios";
import baseUrl from "@/api/baseUrl";

axios.post(`${baseUrl}/endpoint`, data);
```

**Recommended pattern:**
```typescript
import { apiClient } from "@/lib/axios";

apiClient.post("/endpoint", data); // Base URL already configured
```

**Benefits:**
- Automatic token injection
- Centralized error handling
- Consistent timeout configuration
- Better logging in development

### TypeScript Type Safety
The codebase has 36 instances of `any` type. These should be gradually typed:

**Files to review:**
- Check type definitions in `/src/types/*.d.ts`
- Enable `@typescript-eslint/no-explicit-any` in ESLint
- Use proper TypeScript types instead of `any`

### Code Splitting Recommendations
Implement lazy loading for routes to reduce initial bundle size:

```typescript
import { lazy, Suspense } from "react";

// Instead of:
import DashboardPage from "./pages/Main/Dashboard";

// Use:
const DashboardPage = lazy(() => import("./pages/Main/Dashboard"));

// Wrap routes in Suspense:
<Suspense fallback={<LoadingSpinner />}>
  <DashboardPage />
</Suspense>
```

**Routes to lazy load:**
- Democracy module (debates, proposals, initiatives, budgets)
- Response module (surveys, reports)
- Users module
- Settings module
- Dialogue module

---

## ESLint Configuration Updates

Add to `.eslintrc.cjs`:

```javascript
rules: {
  // Prevent console.log in production
  "no-console": ["warn", { allow: ["warn", "error"] }],

  // Prevent any types
  "@typescript-eslint/no-explicit-any": "warn", // Change from "off" to "warn"

  // Enforce consistent return types
  "@typescript-eslint/explicit-function-return-type": ["warn", {
    allowExpressions: true,
    allowTypedFunctionExpressions: true,
  }],
}
```

---

## Performance Optimizations

### 1. Memoization
Add `useMemo` and `useCallback` where appropriate:

```typescript
import { useMemo, useCallback } from "react";

// Memoize expensive calculations
const filteredData = useMemo(
  () => data.filter(item => item.status === "active"),
  [data]
);

// Memoize callbacks passed to child components
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);
```

### 2. Context Optimization
Consider splitting large contexts into smaller, focused contexts to reduce re-renders.

### 3. Bundle Analysis
Run bundle analysis to identify large dependencies:

```bash
npm install -D vite-plugin-bundle-visualizer

# Add to vite.config.ts
import { visualizer } from "rollup-plugin-visualizer";

plugins: [
  react(),
  visualizer({ open: true })
]
```

---

## Testing Recommendations

Currently, there are **0 test files** in the codebase. Consider adding:

### 1. Unit Tests
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

Test utility functions:
- `/src/utils/storage.ts`
- `/src/utils/logger.ts`
- Custom hooks

### 2. Integration Tests
Test React components:
- Form components
- API integration hooks
- Context providers

### 3. E2E Tests
```bash
npm install -D @playwright/test
```

Test critical user flows:
- Login/logout
- Creating proposals/debates
- Submitting surveys
- User management

---

## Security Improvements

### 1. Token Storage
**Current:** Tokens stored in localStorage (XSS vulnerable)

**Recommendation:** Consider:
- httpOnly cookies (backend support required)
- Secure session storage
- Token refresh mechanism

### 2. CSRF Protection
Implement CSRF tokens for state-changing requests.

### 3. Input Validation
All forms use Zod validation ✅ (Good!)

Ensure server-side validation as well.

---

## Documentation Updates

### README.md
Should include:
1. Project overview
2. Prerequisites
3. Installation instructions
4. Environment variable setup
5. Development workflow
6. Build and deployment
7. Project structure
8. Contributing guidelines

### API Documentation
Consider adding JSDoc comments to API hooks:

```typescript
/**
 * Hook to fetch user profile data
 * @returns User profile data or undefined
 * @throws {Error} If user is not authenticated
 */
export const useUserProfile = () => {
  return useQuery(queryKeys.auth.profile(), fetchUserProfile);
};
```

---

## Git Hooks Setup

Install Husky for pre-commit hooks:

```bash
npm install -D husky lint-staged

# Setup
npx husky-init
npm pkg set scripts.prepare="husky install"

# Add pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

Add to `package.json`:
```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## Monitoring & Error Tracking

Consider integrating:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **PostHog** - Analytics

Example Sentry setup:
```bash
npm install @sentry/react

# In src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV,
});
```

---

## Next Steps

### Priority 1 (High)
1. ✅ Environment variables setup
2. ✅ Centralized axios instance
3. ✅ React Query configuration
4. ✅ Error boundary
5. ✅ Logger utility
6. 🔄 Replace remaining console.log statements (6 files)
7. ⏳ Migrate API calls to use apiClient

### Priority 2 (Medium)
1. ⏳ Implement code splitting/lazy loading
2. ⏳ Fix TypeScript `any` types
3. ⏳ Add ESLint rules
4. ⏳ Update README.md

### Priority 3 (Low)
1. ⏳ Add unit tests
2. ⏳ Setup git hooks
3. ⏳ Bundle size analysis
4. ⏳ Add monitoring/error tracking

---

## Files Created

### New Utility Files
- `/src/lib/axios.ts` - Centralized axios instance
- `/src/lib/react-query.ts` - React Query configuration
- `/src/utils/storage.ts` - localStorage utilities
- `/src/utils/constants.ts` - Application constants
- `/src/utils/logger.ts` - Logging utility

### New Component Files
- `/src/components/ErrorBoundary.tsx` - Error boundary component

### Configuration Files
- `/.env.example` - Environment variable template
- `/.env` - Local environment config (gitignored)

### Documentation
- `/REFACTORING_GUIDE.md` - This file

---

## Breaking Changes

### ⚠️ Important
The following changes may require updates to existing code:

1. **Environment Variables Required**
   - Create `.env` file based on `.env.example`
   - Set `VITE_API_BASE_URL` and `VITE_FRONTEND_URL`

2. **Import Changes**
   - QueryClient now imported from `/src/lib/react-query.ts`
   - ErrorBoundary added to App.tsx

3. **Storage API**
   - Recommended to use new storage utilities instead of direct localStorage access
   - Backward compatible but should migrate over time

---

## Questions?

For questions about this refactoring:
1. Check this guide first
2. Review the created utility files
3. Check the inline code documentation

## Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query)
- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
