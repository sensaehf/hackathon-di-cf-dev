import { LOGGER_PROVIDER } from '@island.is/logging'
import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Counter } from 'prom-client'
import { Consent } from './consent.model'
import { ConsentDto } from './dto/consent.dto'
import type { Logger } from '@island.is/logging'

@Injectable()
export class ConsentService {
  applicationsRegistered = new Counter({
    name: 'apps_registered',
    labelNames: ['resource'],
    help: 'Number of applications',
  })

  constructor(
    @InjectModel(Consent)
    private consentModel: typeof Consent,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}
  
  async findByNationalId(nationalId: string): Promise<Consent | null> {
    this.logger.debug(`Finding resource for nationalId - "${nationalId}"`)
    return this.consentModel.findOne({
      where: { nationalId },
    })
  }

  async create(consent: ConsentDto): Promise<Consent> {
    this.logger.debug(
      `Creating resource with nationalId - ${consent.nationalId}`,
    )
    this.applicationsRegistered.labels('res1').inc()
    return this.consentModel.create(consent)
  }
}
