const { initMock } = vi.hoisted(() => ({
  initMock: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/infrastructure/server/app.js', () => ({
  Server: vi.fn(function MockServer() {
    return { init: initMock };
  }),
}));

describe('main', () => {
  it('should create and initialize the server', async () => {
    // Arrange
    const { Server } = await import('@/infrastructure/server/app.js');

    // Act
    await import('./main.js');

    // Assert
    expect(Server).toHaveBeenCalledOnce();
    expect(Server).toHaveBeenCalledWith();
    expect(initMock).toHaveBeenCalledOnce();
    expect(initMock).toHaveBeenCalledWith();
  });
});
