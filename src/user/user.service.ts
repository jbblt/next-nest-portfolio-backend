import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async ensureUser(email: string, name?: string, image?: string) {
    return this.prisma.user.upsert({
      where: { email },
      update: {
        name,
        image,
      },
      create: {
        email,
        name,
        image,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });
  }
}
