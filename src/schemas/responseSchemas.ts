import { z } from "zod";

export const surveyQuestionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  response_type: z.enum(["text", "multiple_choice", "single_choice"]),
  options: z.array(z.string().min(1, "This is required")).nullable(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  // type: z.enum(["any"]),
  description: z.string().min(1, "Description is required"),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
