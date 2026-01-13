import { z } from "zod";

export const orderSchema = z.object({
  userId: z.number(),
  total: z.number().min(1, "Total must be positive"),
  status: z.string().min(3),
});

export type OrderInput = z.infer<typeof orderSchema>;
