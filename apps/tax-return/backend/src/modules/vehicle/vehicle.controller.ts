import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Vehicle } from './vehicle.model';
import { VehicleResponse } from './dto/vehicleResponse';
import { VehicleViewModel } from './dto/vehicleViewModel.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { logger } from '@island.is/logging';
import { log } from 'console';

@ApiTags('Vehicle')
@Controller('v1/tax-submissions/:taxSubmissionId/vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOkResponse({ type: VehicleResponse })
  @Get()
  async getByTaxSubmissionId(
    @Param('taxSubmissionId') taxSubmissionId: number,
  ) {
    let vehicles: Vehicle[] | null = [];
    await this.vehicleService.findByTaxSubmissionId(taxSubmissionId).then((e) => {
      vehicles = e;
    });

    return new VehicleResponse(
      vehicles?.map((o) => new VehicleViewModel(o)) ?? [],
    );
  }

  @ApiCreatedResponse({ type: VehicleViewModel })
  @Post()
  async create(
    @Body() dto: CreateVehicleDto,
    @Param('taxSubmissionId', ParseIntPipe) taxSubmissionId: number,
  ) {
    const result = await this.vehicleService.create(dto, taxSubmissionId);

    return new VehicleViewModel(result);
  }

  @ApiOkResponse({ type: VehicleViewModel })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string, // used id in the dto, should use the one from the path but not time to fix now
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    const res = await this.vehicleService.update(updateVehicleDto);

    return res;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(id);
  }
}