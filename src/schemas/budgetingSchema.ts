import * as z from "zod";

export const addBudgetSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string({ required_error: "Description is required" }).min(3, {
    message: "Description must be at least 3 characters.",
  }),
  start_date: z.string({ required_error: "Start date is required" }).min(3, {
    message: "Start date must be at least 3 characters.",
  }),
  end_date: z.string({ required_error: "End date is required" }).min(3, {
    message: "End date must be at least 3 characters.",
  }),
  total_amount: z
    .string({ required_error: "Total amount is required" })
    .min(1, {
      message: "Total amount is required",
    }),
  fiscal_year: z.string({ required_error: "Fiscal year is required" }).min(1, {
    message: "Fiscal year is required",
  }),
});

export const addBudgetPhaseSchema = z.object({
  phase_name: z.string().optional(),
  phase_module_code: z
    .string({ required_error: "Phase module code is required" })
    .min(3, {
      message: "Phase module code must be at least 3 characters.",
    }),
  start_date: z.string({ required_error: "Start date is required" }).min(3, {
    message: "Start date must be at least 3 characters.",
  }),
  end_date: z.string({ required_error: "End date is required" }).min(3, {
    message: "End date must be at least 3 characters.",
  }),
});

export const updateBudgetStatusSchema = z.object({
  status: z.enum(["proposed", "rejected", "approved"], {
    required_error: "Status is required",
  }),
});

export const searchUserSchema = z.object({
  search: z.string({ required_error: "Search term is required" }).min(4, {
    message: "Search term must be at least 4 characters.",
  }),
});

export type AddBudgetSchema = z.infer<typeof addBudgetSchema>;
export type UpdateBudgetStatusSchema = z.infer<typeof updateBudgetStatusSchema>;
export type AddBudgetPhaseSchema = z.infer<typeof addBudgetPhaseSchema>;
export type SearchUserSchema = z.infer<typeof searchUserSchema>;
