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
    
  }),
  login: z.object({
    password: z.string().min(6),
    email: z.string().email(),
  }),
  changePassword:z.object({
    password: z.string().min(6),
    cpassword: z.string().min(6),
    
  }),
  updateUserInfo: z.object({
    firstName: z.string().min(1),
    middleName: z.string().min(1),
    lastName: z.string().min(1),
    gender: z.nativeEnum(GENDER),
  
  }),
};

export default userSchema;