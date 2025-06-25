import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoCivil } from './entities/estado-civil.entity';
import { EstadosCivisController } from './estados-civis.controller';
import { EstadosCivisService } from './estados-civis.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoCivil])],
  controllers: [EstadosCivisController],
  providers: [EstadosCivisService],
  exports: [EstadosCivisService],
})
export class EstadosCivisModule {}
