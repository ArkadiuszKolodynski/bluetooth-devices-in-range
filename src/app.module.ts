import { Module } from '@nestjs/common';
import { DevicesModule } from './devices/devices.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './devices/entities/device.entity';
import path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.resolve(__dirname, '..', 'db', 'devices.sqlite'),
      entities: [Device],
      logging: true,
      synchronize: true,
    }),
    DevicesModule,
  ],
})
export class AppModule {}
