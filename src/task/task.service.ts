import { Injectable } from '@nestjs/common';
import {  Prisma } from '@prisma/client';
import {PrismaService} from "../prisma/prisma.service";


@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.task.findMany({ where: { userId }});
  }

  create(data: {
    title: string;
    description?: string;
    status?: string;
    userId: string
  }) {
    return this.prisma.task.create({ data  });
  }

  async update(id: number, p: {
    description: string | undefined;
    title: string | undefined;
    status: string | undefined
  }, data: { title?: string; description?: string; status?: string; userId: string }) {
    try {
      return await this.prisma.task.update({
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
    return this.prisma.task.delete({
      where: { id, userId },
    });
  }
}
