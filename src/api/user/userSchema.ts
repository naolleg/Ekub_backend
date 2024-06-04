import { GENDER } from '@prisma/client';
import { z } from 'zod';

const userSchema = {
  register: z.object({
    password: z.string().min(6),
    email: z.string().email(),
    firstName: z.string().min(1),
    middleName: z.string().min(1),
    lastName: z.string().min(1),
    gender: z.nativeEnum(GENDER),
    image_url:z.string(),
    subcity: z.string().min(1).max(255),
    woreda: z.string().min(1).max(255),
    city: z.string().min(1).max(255),
    housenumber: z.number().int().positive(),

  }),
  login: z.object({
    password: z.string().min(6),
    email: z.string().email(),
  }),
  changePassword:z.object({
    password: z.string().min(6),
    cpassword: z.string().min(6),
    
  }),
};

export default userSchema;