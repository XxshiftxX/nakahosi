import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const jwtModule = JwtModule.register({});

    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PassportModule, jwtModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('auth.login', () => {
    it('should return login data', async () => {
      const authData = { accessToken: 'testtoken' };
      jest.spyOn(service, 'login').mockResolvedValue(authData);

      const user = { userId: 1, username: 'testuser' };
      const result = await controller.login({ user } as any);

      const expected = { access_token: 'testtoken' };
      expect(result).toEqual(expected);
      expect(service.login).toBeCalledWith(user);
    });
  });

  describe('auth.self', () => {
    it('should return user info', async () => {
      const user = { userId: 1, username: 'testuser' };
      const result = await controller.getProfile({ user } as any);

      expect(result).toEqual(user);
    })
  });
});
