import { z } from "zod";

export const statusUpdateSchema = z.object({
  update: z.string({ required_error: "Current Role is required" }),
});
export const createAuthoritySchema = z.object({
  name: z.string({ required_error: "Title  is required" }),
  description: z.string({ required_error: "Description  is required" }),
  contact_info: z.string({ required_error: "Contact info  is required" }),
});

export const searchRequestSchema = z.object({
  text: z.string().optional(),
  authority: z.number().optional(),
  privacy: z.string().optional(),
  datetimeRange: z
    .object({
      startDate: z.coerce
        .date({
          invalid_type_error: "That's not a date!",
        })
        .optional(),
      endDate: z.coerce
        .date({
          invalid_type_error: "That's not a date!",
        })
        .optional(),
    })
    .optional(),
  status: z.string().optional(),
});

export const getFioRequestsSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  filter: z.object({
    text: z.string().optional(),
    status: z.string().optional(),
    authority: z.number().optional(),
    privacy: z.string().optional(),

    datetimeRange: z
      .object({
        startDate: z.coerce
          .date({
            invalid_type_error: "That's not a date!",
          })
          .optional(),
        endDate: z.coerce
          .date({
            invalid_type_error: "That's not a date!",
          })
          .optional(),
      })
      .optional(),
  }),
});

export type GetFIORequestsFilters = z.infer<typeof getFioRequestsSchema>;
export type CreateAuthoritySchema = z.infer<typeof createAuthoritySchema>;
