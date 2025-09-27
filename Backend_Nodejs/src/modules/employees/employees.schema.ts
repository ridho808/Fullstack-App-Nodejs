import z from "zod";

export const employeesSchema = {
  createEmployee: z.object({
    email: z.email().min(6).max(150),
    name: z.string().min(4).max(150),
    position: z.string().min(6).max(150),
  }),
  employeesParamsById: z.object({
    id: z.string().max(120),
  }),
  employeesQueryByName: z.object({
    name: z.string().max(150),
  }),
  updateEmployee: z.object({
    email: z.email().min(6).max(150),
    name: z.string().min(4).max(150),
    position: z.string().min(6).max(150),
    photoPath: z.string().min(6).max(150).optional(),
  }),
};
