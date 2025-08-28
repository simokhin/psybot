import { prisma } from "./prisma";
import type { User } from "./types";

export async function createUser(user: User) {
  return await prisma.user.upsert({
    where: { telegramId: user.telegramId },
    update: {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    create: {
      telegramId: user.telegramId,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
}
