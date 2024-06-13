import { z } from 'zod';

export const winnerSchema = {
  register: z.object({
    lotId: z.number().int().positive(),
    //registeredBy: z.number().int().positive(),
  }),
};