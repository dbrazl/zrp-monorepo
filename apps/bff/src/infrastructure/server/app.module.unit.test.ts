import { TestingModule, Test } from '@nestjs/testing';
import { AbstractSitcom } from '@/application/ports/services/sitcom.port.js';
import { GetAllEpisodesUseCase } from '@/application/use-cases/get-all-episodes.use-case.js';
import { SitcomRickAndMortyAdapter } from '@/infrastructure/adapters/services/sitcom.rick-and-morty.adapter.js';
import { EpisodesEndpoints } from '@/infrastructure/http/endpoints/episodes.endpoints.js';
import { EpisodesController } from '@/presentation/controllers/episodes.controller.js';
import { AppModule } from '@/infrastructure/server/app.module.js';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterEach(async () => {
    await module.close();
    vi.restoreAllMocks();
  });

  it('should register the server dependencies', () => {
    // Act
    const endpoints = module.get(EpisodesEndpoints);
    const controller = module.get(EpisodesController);
    const useCase = module.get(GetAllEpisodesUseCase);
    const sitcom = module.get(AbstractSitcom);

    // Assert
    expect(endpoints).toBeInstanceOf(EpisodesEndpoints);
    expect(controller).toBeInstanceOf(EpisodesController);
    expect(useCase).toBeInstanceOf(GetAllEpisodesUseCase);
    expect(sitcom).toBeInstanceOf(SitcomRickAndMortyAdapter);
  });

  it('should wire the endpoint to the sitcom provider', async () => {
    // Arrange
    const endpoints = module.get(EpisodesEndpoints);
    const sitcom = module.get(AbstractSitcom);
    vi.spyOn(sitcom, 'getAllEpisodes').mockResolvedValue([]);

    // Act
    const result = await endpoints.getAllEpisodes();

    // Assert
    expect(sitcom.getAllEpisodes).toHaveBeenCalledOnce();
    expect(sitcom.getAllEpisodes).toHaveBeenCalledWith();
    expect(result).toEqual([]);
  });
});
