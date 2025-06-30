import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prazo } from './entities/prazo.entity';
import { PrazosController } from './prazos.controller';
import { PrazosService } from './prazos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Prazo])],
  controllers: [PrazosController],
  providers: [PrazosService],
  exports: [PrazosService],
})
export class PrazosModule {}
