import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Query,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { DeviceDto } from './dto/device.dto';
import { DevicesService } from './devices.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@ApiTags('devices')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @ApiOperation({
    description: 'Creates device object',
    summary: 'Creates device object',
  })
  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto): Promise<any> {
    await this.devicesService.create(createDeviceDto);
    return {};
  }

  @ApiOperation({
    description: 'Updates device name with specified name by specified uuid',
    summary: 'Updates device name with specified name by specified uuid',
  })
  @Put()
  async update(@Body() updateDeviceDto: UpdateDeviceDto): Promise<any> {
    await this.devicesService.update(updateDeviceDto);
    return {};
  }

  @ApiOperation({
    description: 'Returns a device by uuid',
    summary: 'Returns a device by uuid',
  })
  @ApiResponse({
    status: 404,
    description: '{\n\t"statusCode": 404,\n\t"message": "Device not found!"\n}',
  })
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const device: DeviceDto = await this.devicesService.findOne(uuid);
    return device;
  }

  @ApiOperation({
    description: 'Returns a list of all registered devices',
    summary: 'Returns a list of all registered devices',
  })
  @Get()
  async findAll(): Promise<DeviceDto[]> {
    const devices: DeviceDto[] = await this.devicesService.findAll();
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
  async findInRange(@Query('uuid') uuids: string[]): Promise<DeviceDto[]> {
    const devicesInRange: DeviceDto[] = await this.devicesService.findInRange(uuids);
    return devicesInRange;
  }
}
