import { Controller, Post, Body, Get, Put, Query } from '@nestjs/common';
import { DeviceDto } from './dto/device.dto';
import { DevicesService } from './devices.service';
import { Device } from './entities/device.entity';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @ApiOperation({
    description: 'Creates device object',
    summary: 'Creates device object',
  })
  @Post()
  async create(@Body() deviceDto: DeviceDto): Promise<any> {
    await this.devicesService.create(deviceDto);
    return {};
  }

  @ApiOperation({
    description: 'Updates device name with specified name by specified uuid',
    summary: 'Updates device name with specified name by specified uuid',
  })
  @Put()
  async update(@Body() deviceDto: DeviceDto): Promise<any> {
    await this.devicesService.update(deviceDto);
    return {};
  }

  @ApiOperation({
    description: 'Returns a list of all registered devices',
    summary: 'Returns a list of all registered devices',
  })
  @Get()
  async findAll(): Promise<Device[]> {
    const devices: DeviceDto[] = (await this.devicesService.findAll()) as DeviceDto[];
    return devices;
  }

  @ApiOperation({
    description: 'Returns a list of registered devices in range',
    summary: 'Returns a list of registered devices in range',
  })
  @ApiQuery({
    name: 'uuid',
    description: '/api/v1/devices/in-range?uuid=XXXXX&uuid=YYYYY',
    isArray: true,
    type: 'string',
  })
  @Get('in-range')
  async findInRange(@Query('uuid') uuids: string[]): Promise<Device[]> {
    const devicesInRange: DeviceDto[] = (await this.devicesService.findInRange(
      uuids,
    )) as DeviceDto[];
    return devicesInRange;
  }
}
