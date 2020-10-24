import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const jwtModule = JwtModule.register({});

    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PassportModule, jwtModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user when login succeed', async () => {
      const user = { userId: 1, username: 'testuser', password: 'testpw' };
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      const result = await service.validateUser('testuser', 'testpw');

      expect(result).toEqual({ userId: 1, username: 'testuser' });
    });

    it('should return null when user with given username not exist', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      const result = await service.validateUser('testuser', 'testpw');

      expect(result).toBeNull();
    });

    it('should return null when password is wrong', async () => {
      const user = { userId: 1, username: 'testuser', password: 'testpw' };
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      const result = await service.validateUser('testuser', 'wrongpw');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return auth data', async () => {
      const token = 'testtoken';
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

      const user = { userId: 1, username: 'testuser', password: 'testpw' };
      const result = await service.login(user);

      const expected = { accessToken: token };
      expect(result).toEqual(expected);
      const authData = { sub: 1, username: 'testuser' };
      expect(jwtService.signAsync).toBeCalledWith(authData);
    });
  });
});
