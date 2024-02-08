import { z } from "zod";

export const taskSchema = z.object({
  listId: z.number().int().positive().optional(),
  content: z.string({
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

export type TaskParams = z.infer<typeof taskSchema>;
export type Task = TaskParams & { id: number };
export const editTaskSchema = taskSchema;
