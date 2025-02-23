import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export default class PrismaService extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
}
