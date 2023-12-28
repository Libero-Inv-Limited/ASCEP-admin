import { z } from "zod";

export const createSDGSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description is required" }),
  img: z.string().optional(),
});

export const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answerType: z.enum(["Text", "Option"]),
  options: z.array(z.string().min(1, "This is required")).nullable(),
});
