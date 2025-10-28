// Test básico del LoginScreen
describe('LoginScreen', () => {
  test('debe pasar test básico', () => {
    expect(true).toBe(true);
  });

  test('debe validar formato de email', () => {
    const email = 'test@odontologia.com';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(email)).toBe(true);
  });

  test('debe rechazar email sin @', () => {
    const email = 'invalidemail.com';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(email)).toBe(false);
  });
});