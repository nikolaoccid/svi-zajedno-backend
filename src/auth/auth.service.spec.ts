import { HashService } from '../users/hash.service';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService.getUserByLoginCredentials', () => {
  const user = { id: 1, email: 'ana@example.com', passwordHash: 'stored-hash' };

  let usersService: { getByEmail: jest.Mock };
  let hashService: { isMatch: jest.Mock };
  let service: AuthService;

  beforeEach(() => {
    usersService = { getByEmail: jest.fn() };
    hashService = { isMatch: jest.fn() };
    service = new AuthService(
      usersService as unknown as UsersService,
      hashService as unknown as HashService,
    );
  });

  it('returns the user when the password matches', async () => {
    usersService.getByEmail.mockResolvedValue(user);
    hashService.isMatch.mockResolvedValue(true);

    await expect(
      service.getUserByLoginCredentials({
        email: user.email,
        password: 'right',
      }),
    ).resolves.toBe(user);
    expect(hashService.isMatch).toHaveBeenCalledWith('right', 'stored-hash');
  });

  it('returns undefined when the password is wrong', async () => {
    usersService.getByEmail.mockResolvedValue(user);
    hashService.isMatch.mockResolvedValue(false);

    await expect(
      service.getUserByLoginCredentials({
        email: user.email,
        password: 'wrong',
      }),
    ).resolves.toBeUndefined();
  });

  it('returns undefined for an unknown email without checking any password', async () => {
    usersService.getByEmail.mockResolvedValue(undefined);

    await expect(
      service.getUserByLoginCredentials({
        email: 'nobody@example.com',
        password: 'x',
      }),
    ).resolves.toBeUndefined();
    expect(hashService.isMatch).not.toHaveBeenCalled();
  });
});
