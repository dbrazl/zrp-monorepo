import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '@/infrastructure/server/app.module.js';

describe('SitcomController', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('(GET) /sitcom/episodes', () => {
    it('should return 200', () => {
      return request(app.getHttpServer())
        .get('/sitcom/episodes')
        .expect(200);
    });
  });

  describe('(GET) /sitcom/characters/:ids', () => {
    it('should return 200 with one character', () => {
      return request(app.getHttpServer())
        .get('/sitcom/characters/1')
        .expect(200)
        .expect([
          {
            "id": 1,
            "name": "Rick Sanchez",
            "status": "Alive",
            "gender": "Male",
            "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
          }
        ]);
    });

    it('should return 200 with \"n\" character', () => {
      return request(app.getHttpServer())
        .get('/sitcom/characters/1,2')
        .expect(200)
        .expect([
          {
            "id": 1,
            "name": "Rick Sanchez",
            "status": "Alive",
            "gender": "Male",
            "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
          },
          {
            "id": 2,
            "name": "Morty Smith",
            "status": "Alive",
            "gender": "Male",
            "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
          }
        ]);
    });

    it('should return 400 cause incorrect ids format', () => {
      return request(app.getHttpServer())
        .get('/sitcom/characters/as')
        .expect(400)
        .expect({
          "message": "Parameter must have the format \"number,number,...\"",
          "error": "Bad Request",
          "statusCode": 400
        });
    });
  });
});
