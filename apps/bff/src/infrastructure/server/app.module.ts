import { FactoryProvider, Module, Type } from '@nestjs/common';
import { GetAllEpisodesUseCase } from '@/application/use-cases/get-all-episodes.use-case.js';
import { SitcomRickAndMortyAdapter } from '@/infrastructure/adapters/services/sitcom.rick-and-morty.adapter.js';
import { AbstractSitcom } from '@/application/ports/services/sitcom.port.js';
import { SitcomEndpoints } from '@/infrastructure/http/endpoints/sitcom.endpoints.js';
import { SitcomController } from '@/presentation/controllers/sitcom.controller.js';

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
    buildProvider(SitcomController, [GetAllEpisodesUseCase]),

    // application
    {
      provide: AbstractSitcom,
      useClass: SitcomRickAndMortyAdapter,
    },
    buildProvider(GetAllEpisodesUseCase, [AbstractSitcom]),
  ],
})
export class AppModule { }
