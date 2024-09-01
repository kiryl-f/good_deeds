import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConstants = {
  secret: 'your_jwt_secret_key', // Replace with your secret key
};

export const jwtConfig: JwtModuleOptions = {
  secret: jwtConstants.secret,
  signOptions: {
    expiresIn: '60m',
  },
};
