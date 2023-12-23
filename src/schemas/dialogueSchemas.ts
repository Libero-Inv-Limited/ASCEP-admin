import { z } from "zod";

export const statusUpdateSchema = z.object({
  update: z.string({ required_error: "Current Role is required" }),
});
export const createAuthoritySchema = z.object({
  authority: z.string({ required_error: "Authority  is required" }),
});
