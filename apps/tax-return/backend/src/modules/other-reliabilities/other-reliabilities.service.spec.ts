import { Test, TestingModule } from '@nestjs/testing';
import { OtherReliabilitiesService } from './other-reliabilities.service';
import { OtherReliabilities } from './other-reliabilities.model';
import { getModelToken } from '@nestjs/sequelize';
import { LOGGER_PROVIDER } from '@island.is/logging';

describe('OtherReliabilitiesService', () => {
  let service: OtherReliabilitiesService;
  let reliabilitiesMock: { findAll: jest.Mock; create: jest.Mock };
  let loggerMock: { debug: jest.Mock };

  beforeEach(async () => {
    reliabilitiesMock = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    loggerMock = {
      debug: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OtherReliabilitiesService,
        {
          provide: getModelToken(OtherReliabilities),
          useValue: reliabilitiesMock,
        },
        {
          provide: LOGGER_PROVIDER,
          useValue: loggerMock,
        },
      ],
    }).compile();

    service = module.get<OtherReliabilitiesService>(OtherReliabilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});