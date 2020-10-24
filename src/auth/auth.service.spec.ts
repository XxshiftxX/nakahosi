import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { UserModule } from '../user/user.module';

import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const jwtModule = JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    });

    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PassportModule, jwtModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
