import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';

import { ProductService } from './services/product.service';

@Module({
  imports: [PrismaModule],
  providers: [ProductService],
})
export class ProductModule {}
