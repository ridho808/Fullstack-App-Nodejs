import { Prisma } from "@prisma/client";
import createHttpError from "http-errors";
import { getParamsId } from "src/modules/employees/employees.type";
import prisma from "src/utils/prisma";

export const employeesRepository = {
  async findAllEmployees() {
    return await prisma.employee.findMany();
  },
  async findEmployeesById(id: string) {
    return await prisma.employee.findUnique({
      where: {
        id,
      },
    });
  },
  async findEmployeesByEmail(email: string) {
    return await prisma.employee.findFirst({
      where: {
        email,
      },
    });
  },
  async findEmployeesByname(name: string) {
    return await prisma.employee.findMany({
      where: {
        name: { contains: name },
      },
    });
  },
  async createEmployee(data: Prisma.EmployeeCreateInput) {
    const existingEmployee = await this.findEmployeesByEmail(data.email);
    if (existingEmployee) {
      throw createHttpError(409, {
        message: "Employee with same email already exists",
        code: "ALREADY_EXIST",
      });
    }
    return await prisma.employee.create({
      data,
    });
  },
  async updateEmployee(id: string, data: Prisma.EmployeeUpdateInput) {
    return await prisma.employee.update({
      where: {
        id,
      },
      data,
    });
  },
  async deleteEmployee(id: string) {
    return await prisma.employee.delete({
      where: {
        id,
      },
    });
  },
};
