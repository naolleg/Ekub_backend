import { z } from 'zod';

export const categorySchema = {
  register: z.object({
    name: z.string().min(1).max(255),
    amount: z.number().positive(),
    commition: z.number().positive(),
    totalCount: z.number().int().optional(),
  }),
  update: z.object({
    name: z.string().min(1).max(255).optional(),
    amount: z.number().positive().optional(),
    commition: z.number().positive().optional(),
    totalCount: z.number().int().optional(),
  }),
};