import { z } from "zod";

export const listSchema = z.object({
  userId: z.number().int().positive().optional(),
  boardId: z.number().int().positive(),
  title: z.string({
    required_error: "Content es requerido.",
    invalid_type_error: "Content debe ser un string.",
  }),
  createdAt: z
    .string({
      required_error: "CreatedAt es requerido.",
      invalid_type_error: "CreatedAt debe ser una cadena de fecha y hora.",
    })
    .optional(),
  updatedAt: z
    .string({
      required_error: "UpdatedAt es requerido.",
      invalid_type_error: "UpdatedAt debe ser una cadena de fecha y hora.",
    })
    .optional(),
});

export type ListParams = z.infer<typeof listSchema>;
export type List = ListParams & { id: number };
export const editListSchema = listSchema;
