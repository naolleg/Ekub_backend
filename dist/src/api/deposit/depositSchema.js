import { z } from 'zod';
export const depositSchema = {
    register: z.object({
        lotId: z.number().int().positive(),
        userId: z.number().int().positive(),
        amount: z.number().positive(),
        commition: z.number().positive(),
        remaining: z.number().positive(),
    }),
    update: z.object({
        amount: z.number().positive().optional(),
        commition: z.number().positive().optional(),
        remaining: z.number().positive().optional(),
    }),
};
