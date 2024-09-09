import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Validate the user by comparing the hashed password
  async validateUser(username: string, password: string): Promise<any> {
    console.log('validating user ' + username + ' ' + password);
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // Exclude password
      return result;
    }
    // if (user) {
    //   console.log('user '+ user.email + ' found')
    //   const { password, ...result } = user; // Exclude password
    //   return result;
    // }
    return null;
  }

  // Login logic: validate user and return JWT token
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
