/**
 * React Query Configuration
 *
 * Centralized configuration for React Query with optimized defaults
 */

import { QueryClient, DefaultOptions } from "react-query";
import { toast } from "@/components/ui/use-toast";
import logger from "@/utils/logger";

/**
 * Default options for React Query
 */
const queryConfig: DefaultOptions = {
  queries: {
    // Retry failed requests
    retry: (failureCount, error: any) => {
      // Don't retry on 4xx errors (client errors)
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },

    // Refetch on window focus (good for keeping data fresh)
    refetchOnWindowFocus: true,

    // Refetch on reconnect
    refetchOnReconnect: true,

    // Don't refetch on mount if data is fresh
    refetchOnMount: false,

    // Stale time: Data is fresh for 5 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes

    // Cache time: Keep unused data in cache for 10 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes (gcTime in v4+, cacheTime in v3)

    // Default error handler
    onError: (error: any) => {
      logger.error("Query Error", error, "ReactQuery");
    },
  },

  mutations: {
    // Default error handler for mutations
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || "An error occurred";

      // Only show toast if not handled by the mutation itself
      if (!error?.handled) {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      }

      logger.error("Mutation Error", error, "ReactQuery");
    },

    // Retry mutations once
    retry: 1,
  },
};

/**
 * Create and export Query Client instance
 */
export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

/**
 * Query key factory for consistent key management
 * This helps avoid typos and makes refactoring easier
 */
export const queryKeys = {
  // Auth
  auth: {
    profile: () => ["user-profile"] as const,
    permissions: () => ["user-permissions"] as const,
  },

  // Users
  users: {
    all: () => ["users"] as const,
    list: (filters?: any) => ["users", "list", filters] as const,
    detail: (id: string) => ["users", "detail", id] as const,
    permissions: (id: string) => ["users", "permissions", id] as const,
    roles: (id: string) => ["users", "roles", id] as const,
  },

  // Roles
  roles: {
    all: () => ["roles"] as const,
    list: (filters?: any) => ["roles", "list", filters] as const,
    detail: (id: string) => ["roles", "detail", id] as const,
    permissions: (id: string) => ["roles", "permissions", id] as const,
  },

  // Permissions
  permissions: {
    all: () => ["permissions"] as const,
    list: (filters?: any) => ["permissions", "list", filters] as const,
  },

  // SDGs
  sdgs: {
    all: () => ["sdgs"] as const,
    targets: () => ["sdg-targets"] as const,
    detail: (id: string) => ["sdgs", "detail", id] as const,
  },

  // Categories
  categories: {
    all: () => ["categories"] as const,
    detail: (id: string) => ["categories", "detail", id] as const,
  },

  // Wards
  wards: {
    all: () => ["wards"] as const,
    detail: (id: string) => ["wards", "detail", id] as const,
  },

  // Authorities
  authorities: {
    all: () => ["authorities"] as const,
    list: (filters?: any) => ["authorities", "list", filters] as const,
    detail: (id: string) => ["authorities", "detail", id] as const,
  },

  // Democracy - Debates
  debates: {
    all: () => ["debates"] as const,
    list: (filters?: any) => ["debates", "list", filters] as const,
    detail: (id: string) => ["debates", "detail", id] as const,
    comments: (id: string) => ["debates", "comments", id] as const,
  },

  // Democracy - Proposals
  proposals: {
    all: () => ["proposals"] as const,
    list: (filters?: any) => ["proposals", "list", filters] as const,
    detail: (id: string) => ["proposals", "detail", id] as const,
    comments: (id: string) => ["proposals", "comments", id] as const,
  },

  // Democracy - Initiatives
  initiatives: {
    all: () => ["initiatives"] as const,
    list: (filters?: any) => ["initiatives", "list", filters] as const,
    detail: (id: string) => ["initiatives", "detail", id] as const,
    comments: (id: string) => ["initiatives", "comments", id] as const,
  },

  // Democracy - Budgets
  budgets: {
    all: () => ["budgets"] as const,
    list: (filters?: any) => ["budgets", "list", filters] as const,
    detail: (id: string) => ["budgets", "detail", id] as const,
  },

  // Democracy - Voting
  votes: {
    all: () => ["votes"] as const,
    byProposal: (proposalId: string) => ["votes", "proposal", proposalId] as const,
    byDebate: (debateId: string) => ["votes", "debate", debateId] as const,
  },

  // Dialogue
  dialogue: {
    requests: {
      all: () => ["dialogue-requests"] as const,
      list: (filters?: any) => ["dialogue-requests", "list", filters] as const,
      detail: (id: string) => ["dialogue-requests", "detail", id] as const,
      comments: (id: string) => ["dialogue-requests", "comments", id] as const,
    },
    categories: {
      all: () => ["dialogue-categories"] as const,
    },
  },

  // Response
  response: {
    surveys: {
      all: () => ["surveys"] as const,
      list: (filters?: any) => ["surveys", "list", filters] as const,
      detail: (id: string) => ["surveys", "detail", id] as const,
      responses: (id: string) => ["surveys", "responses", id] as const,
    },
    reports: {
      all: () => ["reports"] as const,
      list: (filters?: any) => ["reports", "list", filters] as const,
      detail: (id: string) => ["reports", "detail", id] as const,
    },
    categories: {
      all: () => ["response-categories"] as const,
    },
  },
} as const;

export default queryClient;
