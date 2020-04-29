import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { DeviceDto } from './dto/device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly devicesRepository: Repository<Device>,
  ) {}

  async create(deviceDto: DeviceDto): Promise<void> {
    await this.devicesRepository.insert(deviceDto);
  }

  async update(deviceDto: DeviceDto): Promise<void> {
    await this.devicesRepository.update(deviceDto.uuid, {
      name: deviceDto.name,
    });
  }

  async findAll(): Promise<Device[]> {
    return await this.devicesRepository.find();
  }

  async findInRange(uuids: string[]): Promise<Device[]> {
    return await this.devicesRepository.findByIds(uuids);
  }
}
