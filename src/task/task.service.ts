import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TaskService {
  findAll(userId: string) {
    return prisma.task.findMany({ where: { userId }});
  }

  create(data: {
    title: string;
    description?: string;
    status?: string;
    userId: string
  }) {
    return prisma.task.create({ data  });
  }

  async update(id: number, p: {
    description: string | undefined;
    title: string | undefined;
    status: string | undefined
  }, data: { title?: string; description?: string; status?: string; userId: string }) {
    try {
      return await prisma.task.update({
        where: { id, userId: data.userId },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error(`Task with id ${id} not found`);
        }
      }
      throw error;
    }
  }

  delete(id: number, userId: string) {
    return prisma.task.delete({
      where: { id, userId },
    });
  }
}
