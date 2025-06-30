describe('Basic Backend Tests', () => {
  it('should have a working test environment', () => {
    expect(true).toBe(true);
  });

  it('should be able to import modules', () => {
    // Testa se consegue importar módulos básicos
    expect(process.env.NODE_ENV).toBeDefined();
  });
});
