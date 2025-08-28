import type { MessageRole } from "./generated/prisma/enums";
import { prisma } from "./prisma";
import type { User } from "./defenitions";

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

export async function getUserMessages(userId: string) {
  return await prisma.message.findMany({
    where: { telegramId: userId },
    orderBy: { createdAt: "asc" },
  });
}

export async function saveMessage(
  userId: string,
  role: MessageRole,
  content: string
) {
  return await prisma.message.create({
    data: {
      telegramId: userId,
      role: role,
      content: content,
    },
  });
}
