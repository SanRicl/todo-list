// eslint-disable-next-line prettier/prettier
import { PrismaService } from '@infra/data/client/prisma.service'  
import { Global, Module } from '@nestjs/common'

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export default class DataModule {}
