import { z } from "zod";

export const createSDGSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" }),
  official_link: z
    .string({ required_error: "Official link is required" })
    .min(1, { message: "Official link is required" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description is required" }),
  img: z.string().optional(),
});

export const addSDGTargetSchema = z.object({
  code: z
    .string({ required_error: "Code is required" })
    .min(1, { message: "Code is required" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description is required" }),
});

export const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answerType: z.enum(["text", "multiple_choice", "single_choice"]),
  options: z.array(z.string().min(1, "This is required")).nullable(),
});

export type CreateSDGSchema = z.infer<typeof createSDGSchema>;
export type AddSDGTargetSchema = z.infer<typeof addSDGTargetSchema>;
