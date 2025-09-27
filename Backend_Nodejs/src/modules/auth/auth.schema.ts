import z from "zod";

export const authSchema = {
  signup: z.object({
    email: z.email().min(6).max(150),
    username: z.string().min(6).max(150),
    name: z.string().min(4).max(150),
    password: z.string().min(6).max(150),
  }),
  signin: z.object({
    email_or_username: z.string().min(6).max(150),
    password: z.string().min(6).max(150),
  }),
};
