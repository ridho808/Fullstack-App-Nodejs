import { Prisma } from "@prisma/client";
import prisma from "src/utils/prisma";

export const userRepository = {
  async findAllUser() {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });
  },
  async findUserById(id: string) {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    });
  },
  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });
  },
  async findByUsername(username: string) {
    return await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });
  },
  async findByEmailOrUsername(email_or_username: string) {
    return await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: email_or_username,
          },
          {
            username: email_or_username,
          },
        ],
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        password: true,
      },
    });
  },
  async createUser(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    });
  },
  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });
  },
  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  },
};
