import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { Server } from './app.js';

describe('Server', () => {
  let app: Pick<NestApplication, 'setGlobalPrefix' | 'listen'>;

  beforeEach(() => {
    app = {
      setGlobalPrefix: vi.fn(),
      listen: vi.fn().mockResolvedValue(undefined),
    };

    vi.spyOn(NestFactory, 'create').mockResolvedValue(
      app as NestApplication,
    );
  });

  afterEach(() => {
    delete process.env.PORT;
    vi.restoreAllMocks();
  });

  it('should initialize the application using the default port', async () => {
    // Arrange
    delete process.env.PORT;
    const server = new Server();

    // Act
    await server.init();

    // Assert
    expect(NestFactory.create).toHaveBeenCalledOnce();
    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(app.setGlobalPrefix).toHaveBeenCalledOnce();
    expect(app.setGlobalPrefix).toHaveBeenCalledWith('api/v0');
    expect(app.listen).toHaveBeenCalledOnce();
    expect(app.listen).toHaveBeenCalledWith(3000);
  });

  it('should initialize the application using the configured port', async () => {
    // Arrange
    process.env.PORT = '4000';
    const server = new Server();

    // Act
    await server.init();

    // Assert
    expect(NestFactory.create).toHaveBeenCalledOnce();
    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(app.setGlobalPrefix).toHaveBeenCalledOnce();
    expect(app.setGlobalPrefix).toHaveBeenCalledWith('api/v0');
    expect(app.listen).toHaveBeenCalledOnce();
    expect(app.listen).toHaveBeenCalledWith('4000');
  });
});
