import createHttpError from "http-errors";
import { employeesRepository } from "src/repositories/employees.repo";
import { CreateEmployeesInput } from "./employees.type";
import { Prisma } from "@prisma/client";

export const employeesService = {
  async findAll() {
    const employees = await employeesRepository.findAllEmployees();
    if (!employees) {
      throw createHttpError(404, {
        message: "Employees not found",
        code: "NOT_FOUND",
      });
    }
    return employees;
  },
  async createEmployees(data: CreateEmployeesInput) {
    const employee = await employeesRepository.createEmployee(data);
    return employee;
  },
  async getEmployeeById(id: string) {
    const employee = await employeesRepository.findEmployeesById(id);
    if (!employee) {
      throw createHttpError(404, {
        message: "Employee not found",
        code: "NOT_FOUND",
      });
    }
    return employee;
  },
  async getEmployeeByName(name: string) {
    const employee = await employeesRepository.findEmployeesByname(name);
    if (!employee) {
      throw createHttpError(404, {
        message: "Employee not found",
        code: "NOT_FOUND",
      });
    }
    return employee;
  },
  async updateEmployee(id: string, data: Prisma.UserUpdateInput) {
    const employee = await employeesRepository.findEmployeesById(id);
    if (!employee) {
      throw createHttpError(404, {
        message: "Employee not found",
        code: "NOT_FOUND",
      });
    }
    const updatedEmployee = await employeesRepository.updateEmployee(id, data);
    return updatedEmployee;
  },
  async deleteEmployee(id: string) {
    const employee = await employeesRepository.findEmployeesById(id);
    if (!employee) {
      throw createHttpError(404, {
        message: "Employee not found",
        code: "NOT_FOUND",
      });
    }
    const deletedEmployee = await employeesRepository.deleteEmployee(id);
    return deletedEmployee;
  },
};
