import { z } from "zod";

export const usersSchema = {
  userUpdateSchema: z.object({
    email: z.email().optional(),
    username: z.string().optional(),
    role: z.enum(["USER", "ADMIN"]).optional(),
  }),
  usersQueryEmailSchema: z.object({
    email: z.email().max(120).optional(),
    username: z.string().max(120).optional(),
  }),
  userParamsId: z.object({
    id: z.string().max(150),
  }),
};
