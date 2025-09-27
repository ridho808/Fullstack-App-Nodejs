import { Prisma } from "@prisma/client";
import createHttpError from "http-errors";
import { userRepository } from "src/repositories/user.repo";

export const userService = {
  async findAll() {
    const users = await userRepository.findAllUser();
    return users;
  },
  async findByid(id: string) {
    const user = await userRepository.findUserById(id);
    if (!user) {
      throw createHttpError(404, {
        message: "user not found",
        code: "NOT_FOUND",
      });
    }
    return user;
  },
  async updateUserById(id: string, data: Prisma.UserUpdateInput) {
    const user = await userRepository.findUserById(id);
    if (!user) {
      throw createHttpError(404, {
        message: "user not found",
        code: "NOT_FOUND",
      });
    }
    const updatedUser = await userRepository.updateUser(id, data);
    return updatedUser;
  },
  async deleteUserById(id: string) {
    const user = await userRepository.findUserById(id);
    if (!user) {
      throw createHttpError(404, {
        message: "user not found",
        code: "NOT_FOUND",
      });
    }
    const deletedUser = await userRepository.deleteUser(id);
    return deletedUser;
  },
};
