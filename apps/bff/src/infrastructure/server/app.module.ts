import { FactoryProvider, Module, Type } from '@nestjs/common';
import { AbstractSitcom } from '@/application/ports/services/sitcom.port.js';
import { GetAllEpisodesUseCase } from '@/application/use-cases/get-all-episodes.use-case.js';
import { GetCharactersUseCase } from '@/application/use-cases/get-characters.use-case.js';
import { SitcomController } from '@/presentation/controllers/sitcom.controller.js';
import { SitcomEndpoints } from '@/infrastructure/http/endpoints/sitcom.endpoints.js';
import { SitcomRickAndMortyAdapter } from '@/infrastructure/adapters/services/sitcom.rick-and-morty.adapter.js';

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
  controllers: [SitcomEndpoints],
  providers: [
    // presentation
    buildProvider(SitcomController, [
      GetAllEpisodesUseCase,
      GetCharactersUseCase,
    ]),

    // application
    {
      provide: AbstractSitcom,
      useClass: SitcomRickAndMortyAdapter,
    },
    buildProvider(GetAllEpisodesUseCase, [AbstractSitcom]),
    buildProvider(GetCharactersUseCase, [AbstractSitcom]),
  ],
})
export class AppModule {}
