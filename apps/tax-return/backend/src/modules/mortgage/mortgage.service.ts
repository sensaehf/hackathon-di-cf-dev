import { Injectable } from '@nestjs/common'
import { CreateMortgageDto } from './dto/create-mortgage.dto'
import { UpdateMortgageDto } from './dto/update-mortgage.dto'

@Injectable()
export class MortgageService {
  create(createMortgageDto: CreateMortgageDto) {
    return 'This action adds a new mortgage'
  }

  findAll() {
    return `This action returns all mortgage`
  }

  findOne(id: number) {
    return `This action returns a #${id} mortgage`
  }

  update(id: number, updateMortgageDto: UpdateMortgageDto) {
    return `This action updates a #${id} mortgage`
  }

  remove(id: number) {
    return `This action removes a #${id} mortgage`
  }
}
