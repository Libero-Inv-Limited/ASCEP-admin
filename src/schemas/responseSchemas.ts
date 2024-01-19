import { z } from "zod";

export const surveyQuestionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  response_type: z.enum(["text", "multiple_choice", "single_choice"]),
  options: z.array(z.string().min(1, "This is required")).nullable(),
});
