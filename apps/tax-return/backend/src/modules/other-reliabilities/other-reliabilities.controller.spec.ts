import { Test, TestingModule } from '@nestjs/testing';
import { OtherReliabilitiesController } from './other-reliabilities.controller';
import { OtherReliabilitiesService } from './other-reliabilities.service';

describe('OtherReliabilitiesController', () => {
  let controller: OtherReliabilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtherReliabilitiesController],
      providers: [
        {
          provide: OtherReliabilitiesService,
          useValue: {
            findAllBySubmissionId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OtherReliabilitiesController>(
      OtherReliabilitiesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});