import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitAssistido } from './entities/sit-assistido.entity';
import { SitAssistidosController } from './sit-assistidos.controller';
import { SitAssistidosService } from './sit-assistidos.service';

@Module({
  imports: [TypeOrmModule.forFeature([SitAssistido])],
  controllers: [SitAssistidosController],
  providers: [SitAssistidosService],
  exports: [SitAssistidosService],
})
export class SitAssistidosModule {}
