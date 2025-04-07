import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TaskService {
  findAll() {
    return prisma.task.findMany();
  }

  create(data: { title: string; description?: string; status?: string }) {
    return prisma.task.create({ data });
  }
}
