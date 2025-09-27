import { Request, Response } from "express";
import { userService } from "./user.service";
import { UserParamsId, UserUpdate } from "./user.types";

export const userController = {
  async AllUsers(req: Request, res: Response) {
    const users = await userService.findAll();
    return res.json({
      success: true,
      message: "success get all users data",
      data: users,
    });
  },
  async FindUserById(req: Request, res: Response) {
    const { id } = req.params as UserParamsId;
    const user = await userService.findByid(id);
    return res.json(200).json({
      success: true,
      message: "success get user data by id",
      data: user,
    });
  },
  async UpdateUserById(req: Request, res: Response) {
    const { id } = req.params as UserParamsId;
    const data = req.body as UserUpdate;
    const updatedUser = await userService.updateUserById(id, data);
    return res.json(200).json({
      success: true,
      message: "success update user data by id",
      data: updatedUser,
    });
  },
  async DeleteUserById(req: Request, res: Response) {
    const { id } = req.params as UserParamsId;
    const deletedUser = await userService.deleteUserById(id);
    return res.status(200).json({
      success: true,
      message: "success delete user data by id",
      data: deletedUser,
    });
  },
};
