import { Request, Response } from "express";
import { employeesService } from "./employees.service";
import {
  getParamsId,
  getQueryName,
  updateEmployeesInput,
} from "./employees.type";
import { verifyAccessToken } from "src/utils/jwt";

export const employeesController = {
  async findAllEmployees(req: Request, res: Response) {
    const employees = await employeesService.findAll();

    return res.status(200).json({
      success: true,
      message: "success get all employees",
      data: employees,
    });
  },
  async createEmployees(req: Request, res: Response) {
    const data = req.body;
    const photopath = req.file?.path;
    const { sub } = verifyAccessToken(req.cookies.accessToken);

    const employee = await employeesService.createEmployees({
      ...data,
      photoPath: photopath,
      createdBy: sub,
    });

    return res.status(201).json({
      success: true,
      message: "success create employee",
      data: employee,
    });
  },
  async findEmployeeById(req: Request, res: Response) {
    const { id } = req.params as getParamsId;
    const employee = await employeesService.getEmployeeById(id);

    return res.status(200).json({
      success: true,
      message: "success get employee by id",
      data: employee,
    });
  },
  async findEmployeeByName(req: Request, res: Response) {
    const { name } = req.query as getQueryName;
    const employee = await employeesService.getEmployeeByName(name);

    return res.status(200).json({
      success: true,
      message: "success get employee by name",
      data: employee,
    });
  },
  async updateEmployeeById(req: Request, res: Response) {
    const { id } = req.params as getParamsId;
    const body = req.body as updateEmployeesInput;
    const employee = await employeesService.updateEmployee(id, body);

    return res.status(200).json({
      success: true,
      message: `success update data employee id : ${id}`,
      data: employee,
    });
  },
  async deleteEmployeeById(req: Request, res: Response) {
    const { id } = req.params as getParamsId;
    const employee = await employeesService.deleteEmployee(id);

    return res.status(200).json({
      success: true,
      message: `success delete data employee id : ${id}`,
      data: employee,
    });
  },
};
