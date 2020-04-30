import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { DeviceDto } from './dto/device.dto';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly devicesRepository: Repository<Device>,
  ) {}

  async create(deviceDto: CreateDeviceDto): Promise<void> {
    await this.devicesRepository.insert(deviceDto);
  }

  async update(updateDeviceDto: UpdateDeviceDto): Promise<void> {
    await this.devicesRepository.update(updateDeviceDto.uuid, updateDeviceDto);
  }

  async findOne(uuid: string): Promise<DeviceDto> {
    const device: DeviceDto = await this.devicesRepository.findOne(uuid);
    if (device) return device;
    throw new HttpException('Device not found!', HttpStatus.NOT_FOUND);
  }

  async findAll(): Promise<DeviceDto[]> {
    return await this.devicesRepository.find();
  }

  async findInRange(uuids: string[]): Promise<DeviceDto[]> {
    return await this.devicesRepository.findByIds(uuids);
  }
}
