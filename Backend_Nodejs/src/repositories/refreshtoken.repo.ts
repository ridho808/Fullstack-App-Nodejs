import prisma from "src/utils/prisma";

export const refreshTokenRepository = {
  async create(refreshToken: string, userId: string) {
    return await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userId,
      },
    });
  },
  async findByToken(token: string) {
    return await prisma.refreshToken.findFirst({
      where: {
        token,
      },
    });
  },
  async updateNewTokenByuseId(userId: string, newToken: string) {
    return await prisma.refreshToken.update({
      where: {
        userId,
      },
      data: {
        token: newToken,
      },
    });
  },
  async updateEmptyTokenByUserId(userId: string) {
    return await prisma.refreshToken.update({
      where: {
        userId,
      },
      data: {
        token: "",
      },
    });
  },
};
