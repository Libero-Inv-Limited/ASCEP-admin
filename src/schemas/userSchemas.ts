import { z } from "zod";

export const assignRoleSchema = z.object({
  currentRole: z.string({ required_error: "Current Role is required" }),
});

export const reasonSchema = z.object({
  reason: z
    .string({ required_error: "Reason is required" })
    .min(1, "Reason is required"),
});

export const changeRoleSchema = z.object({
  roleId: z
    .string({ required_error: "Role is required" })
    .min(1, "Role is required"),
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
  start_date: z
    .string({ required_error: "Start date is required" })
    .min(1, "Start-End date is required"),
  end_date: z
    .string({ required_error: "End date is required" })
    .min(1, "Start-End date is required"),
});

export const updateReportSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description is required"),
});

export const resetUserPasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .regex(
        /((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)\w.{6,18}\w)/,
        "Password should have at least one upper and lowercase, a number and a special character"
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );
