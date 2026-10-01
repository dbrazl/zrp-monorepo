import { FactoryProvider, Module, Type } from '@nestjs/common';
import { GetAllEpisodesUseCase } from '@/application/use-cases/get-all-episodes.use-case.js';
import { SitcomRickAndMortyAdapter } from '@/infrastructure/adapters/services/sitcom.rick-and-morty.adapter.js';
import { AbstractSitcom } from '@/application/ports/services/sitcom.port.js';
import { EpisodesEndpoints } from '@/infrastructure/http/endpoints/episodes.endpoints.js';
import { EpisodesController } from '@/presentation/controllers/episodes.controller.js';

const buildProvider = <T>(
  Class: Type<T>,
  inject: FactoryProvider<T>['inject'] = [],
): FactoryProvider<T> => ({
  provide: Class,
  inject,
  useFactory: (...params: ConstructorParameters<Type<T>>) =>
    new Class(...params),
});

@Module({
  imports: [],
  controllers: [EpisodesEndpoints],
  providers: [
    // presentation
    buildProvider(EpisodesController, [GetAllEpisodesUseCase]),

    // application
    {
      provide: AbstractSitcom,
      useClass: SitcomRickAndMortyAdapter,
    },
    buildProvider(GetAllEpisodesUseCase, [AbstractSitcom]),
  ],
})
export class AppModule {}
