import { z } from "zod";

export const assignRoleSchema = z.object({
  currentRole: z.string({ required_error: "Current Role is required" }),
});

export const reasonSchema = z.object({
  reason: z
    .string({ required_error: "Reason is required" })
    .min(1, "Reason is required"),
});

export const importSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
});

export const createSurveySchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description is required"),
  dateRange: z
    .string({ required_error: "Start-End date is required" })
    .min(1, "Start-End date is required"),
});
