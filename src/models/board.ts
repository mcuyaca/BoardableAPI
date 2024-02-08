import { z } from "zod";

export const boardSchema = z.object({
  userId: z.number().int().positive().optional(),
  title: z.string({
    required_error: "Content es requerido.",
    invalid_type_error: "Content debe ser un string.",
  }),
  color: z
    .string({ invalid_type_error: "Se asigno un tipo invalido." })
    .refine(
      (value) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value),
      "Debe ser un color hexadecimal válido en el formato #RRGGBB o #RGB"
    )
    .default("#E1E7EF"),
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

export type BoardParams = z.infer<typeof boardSchema>;
export type Board = BoardParams & { id: number };
export const editBoardSchema = boardSchema;
