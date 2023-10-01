"use server";

import prisma from "@/lib/prisma";
import { createTaskSchemaType } from "@/schema/createTask";
import { currentUser } from "@clerk/nextjs";
import { Task } from "@prisma/client";

export async function createTask(data: createTaskSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  const { content, expiresAt, collectionId } = data;

  return await prisma.task.create({
    data: {
      userId: user.id,
      content,
      expiresAt,
      Collection: {
        connect: {
          id: collectionId,
        },
      },
    },
  });
}

export async function setTaskToDone({ task }: { task: Task }) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  return await prisma.task.update({
    where: {
      id: task.id,
      userId: user.id,
    },
    data: {
      done: !task.done,
    },
  });
}
