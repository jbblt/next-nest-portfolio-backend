import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TaskService {
  findAll() {
    return prisma.task.findMany();
  }

  create(data: { title: string; description?: string; status?: string }) {
    return prisma.task.create({ data });
  }

  async update(id: number, data: { title?: string; description?: string; status?: string }) {
    try {
      return await prisma.task.update({
        where: { id },
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

  delete(id: number) {
    return prisma.task.delete({
      where: { id },
    });
  }
}
