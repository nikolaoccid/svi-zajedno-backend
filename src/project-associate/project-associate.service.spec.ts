import { Test, TestingModule } from '@nestjs/testing';
import { ProjectAssociateService } from './project-associate.service';

describe('ProjectAssociateService', () => {
  let service: ProjectAssociateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectAssociateService],
    }).compile();

    service = module.get<ProjectAssociateService>(ProjectAssociateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
