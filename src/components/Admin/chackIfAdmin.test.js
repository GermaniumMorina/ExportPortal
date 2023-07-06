import { checkIfAdmin } from './checkIfAdmin'; // Replace 'your-module' with the actual module path

describe('checkIfAdmin', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('returns true if user is an admin', () => {
    localStorage.setItem('isAdmin', 'true');
    const isAdmin = checkIfAdmin();

    expect(isAdmin).toBe(true);
  });

  test('returns false if user is not an admin', () => {
    const isAdmin = checkIfAdmin();

    expect(isAdmin).toBe(false);
  });
});
