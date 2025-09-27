import z from "zod";
import { employeesSchema } from "./employees.schema";

export type CreateEmployeesInput = z.infer<
  (typeof employeesSchema)["createEmployee"]
>;
export type getParamsId = z.infer<
  (typeof employeesSchema)["employeesParamsById"]
>;
export type getQueryName = z.infer<
  (typeof employeesSchema)["employeesQueryByName"]
>;
export type updateEmployeesInput = z.infer<
  (typeof employeesSchema)["updateEmployee"]
>;
