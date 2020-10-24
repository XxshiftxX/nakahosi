import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const jwtModule = JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    });

    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PassportModule, jwtModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
