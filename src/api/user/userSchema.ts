import { z } from 'zod';

const userSchema = {
  register: z.object({
    password: z.string().min(6),
    email: z.string().email(),
    firstName: z.string().min(1),
    middleName: z.string().min(1),
    lastName: z.string().min(1),
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