import { Controller, Get, Param } from '@nestjs/common'

import { VehicleService } from './vehicle.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Vehicle } from './vehicle.model'
import { VehicleResponse } from './dto/vehicleResponse';
import { VehicleViewModel } from './dto/vehicleViewModel.dto';


@ApiTags('Vehicle')
@Controller('v1/tax-submissions/:taxSubmissionId/vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOkResponse({type: VehicleResponse})
  @Get()
  async getByTaxSubmissionId(@Param('taxSubmissionId')taxSubmissionId: number) {
    let subsidies : Vehicle[] | null = [];
    await this.vehicleService.findByTaxSubmissionId(taxSubmissionId)
    .then((e) =>
    {
      subsidies = e
    })
    
    return new VehicleResponse(subsidies?.map(o => new VehicleViewModel(o)) ?? []);
    
    
  }
}
