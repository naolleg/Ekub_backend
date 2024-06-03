import { z } from 'zod';
import { GENDER } from '@prisma/client';
export const lotSchema = {
    register: z.object({
        categoryId: z.number().int().positive(),
        remaingDay: z.number().int().positive(),
        remaingAmount: z.number().positive(),
        firstName: z.string().min(1).max(255),
        middleName: z.string().min(1).max(255),
        lastName: z.string().min(1).max(255),
        gender: z.nativeEnum(GENDER),
        city: z.string().min(1).max(255),
        street: z.string().min(1).max(255),
    }),
    update: z.object({
        isCompleted: z.boolean().optional(),
        remaingDay: z.number().int().positive().optional(),
        remaingAmount: z.number().positive().optional(),
    }),
    updateProfile: z.object({
        firstName: z.string().min(1).max(255).optional(),
        middleName: z.string().min(1).max(255).optional(),
        lastName: z.string().min(1).max(255).optional(),
        gender: z.nativeEnum(GENDER).optional(),
        city: z.string().min(1).max(255).optional(),
        street: z.string().min(1).max(255).optional(),
    }),
};
