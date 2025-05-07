import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicle } from './vehicle.model';
import { LOGGER_PROVIDER } from '@island.is/logging';
import type { Logger } from '@island.is/logging';
import { UniqueConstraintError } from 'sequelize';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle)
    private vehicle: typeof Vehicle,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  async findByTaxSubmissionId(taxSubmissionId: number): Promise<Vehicle[] | null> {

    const result = await this.vehicle.findAll({
      where: { taxSubmissionId: taxSubmissionId },
    });

    return result || [];
  }

  async create(vehicleDto: CreateVehicleDto, taxSubmissionId: number): Promise<Vehicle> {
    try {
      return await this.vehicle.create({ ...vehicleDto, taxSubmissionId });
    } catch (error) {
      this.logger.debug('Error creating vehicle', error);
      if (error instanceof UniqueConstraintError) {
        throw new ConflictException('An entry for this plate number already exists.');
      }
      throw error;
    }
  }

  findAll() {
    return this.vehicle.findAll();
  }

  findOne(id: string) {
    return this.vehicle.findByPk(id);
  }

  async update(updateVehicleDto: UpdateVehicleDto) {
    const { id, ...rest } = updateVehicleDto;
    this.vehicle.update(rest, {
      where: { id: updateVehicleDto.id },
    });
    return await this.vehicle.findByPk(id);
  }
  
  remove(id: string) {
    return this.vehicle.destroy({
      where: { id },
    });
  }
}