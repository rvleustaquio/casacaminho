import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadosCivisModule } from './features/estados-civis/estados-civis.module';
import { PrazosModule } from './features/prazos/prazos.module';
import { ServicosModule } from './features/servicos/servicos.module';
import { SitAssistidosModule } from './features/sit-assistidos/sit-assistidos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    EstadosCivisModule,
    SitAssistidosModule,
    PrazosModule,
    ServicosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
