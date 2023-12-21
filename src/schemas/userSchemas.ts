import { z } from "zod";

export const assignRoleSchema = z.object({
  currentRole: z.string({ required_error: "Current Role is required" }),
  //   privilege: z.string({ required_error: "Privilege is required" }),
});

export const reasonSchema = z.object({
  reason: z
    .string({ required_error: "Reason is required" })
    .min(1, "Reason is required"),
});
