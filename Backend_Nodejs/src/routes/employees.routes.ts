import { Router } from "express";
import { authAccessGuard } from "src/middleware/authGuard";
import { normalizeMultipartJson } from "src/middleware/normalizeMultipart";
import { uploadEmployeePhoto } from "src/middleware/upload";
import { validate } from "src/middleware/validate";
import { employeesController } from "src/modules/employees/employees.controller";
import { employeesSchema } from "src/modules/employees/employees.schema";

const r = Router();

r.use(authAccessGuard);
r.get("/", employeesController.findAllEmployees);

r.post(
  "/",
  uploadEmployeePhoto.single("photo"),
  normalizeMultipartJson(),
  validate({ body: employeesSchema.createEmployee }),
  employeesController.createEmployees
);

r.get(
  "/get",
  validate({ query: employeesSchema.employeesQueryByName }),
  employeesController.findEmployeeByName
);

r.get(
  "/id/:id",
  validate({ params: employeesSchema.employeesParamsById }),
  employeesController.findEmployeeById
);

r.patch(
  "/id/:id",
  uploadEmployeePhoto.single("photo"),
  normalizeMultipartJson(),
  validate({
    params: employeesSchema.employeesParamsById,
    body: employeesSchema.updateEmployee,
  }),
  employeesController.updateEmployeeById
);

r.delete(
  "/id/:id",
  validate({ params: employeesSchema.employeesParamsById }),
  employeesController.deleteEmployeeById
);

export default r;
