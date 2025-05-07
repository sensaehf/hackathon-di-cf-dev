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
  update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(id);
  }
}