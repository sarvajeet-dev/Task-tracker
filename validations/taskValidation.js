import { z } from "zod";

export const taskSchema =
  z.object({
    title: z
      .string()
      .min(
        3,
        "Title is required"
      ),

    description:
      z.string().optional(),

    priority: z.enum([
      "LOW",
      "MEDIUM",
      "HIGH",
    ]),

    assignee:
      z.string(),

    dueDate: z
      .string()
      .optional(),
  });