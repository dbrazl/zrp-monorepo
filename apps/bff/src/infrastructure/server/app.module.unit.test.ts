import { TestingModule, Test } from '@nestjs/testing';
import { AbstractSitcom } from '@/application/ports/services/sitcom.port.js';
import { GetAllEpisodesUseCase } from '@/application/use-cases/get-all-episodes.use-case.js';
import { SitcomRickAndMortyAdapter } from '@/infrastructure/adapters/services/sitcom.rick-and-morty.adapter.js';
import { SitcomEndpoints } from '@/infrastructure/http/endpoints/sitcom.endpoints.js';
import { SitcomController } from '@/presentation/controllers/sitcom.controller.js';
import { AppModule } from '@/infrastructure/server/app.module.js';
import { GetCharactersUseCase } from '@/application/use-cases/get-characters.use-case.js';

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
    const endpoints = module.get(SitcomEndpoints);
    const controller = module.get(SitcomController);
    const useCase1 = module.get(GetAllEpisodesUseCase);
    const useCase2 = module.get(GetCharactersUseCase);
    const sitcom = module.get(AbstractSitcom);

    // Assert
    expect(endpoints).toBeInstanceOf(SitcomEndpoints);
    expect(controller).toBeInstanceOf(SitcomController);
    expect(useCase1).toBeInstanceOf(GetAllEpisodesUseCase);
    expect(useCase2).toBeInstanceOf(GetCharactersUseCase);
    expect(sitcom).toBeInstanceOf(SitcomRickAndMortyAdapter);
  });

  it('should wire the endpoint to the sitcom provider', async () => {
    // Arrange
    const endpoints = module.get(SitcomEndpoints);
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
