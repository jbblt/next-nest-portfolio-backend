import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Public } from '../auth/public.decorator';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  @Public()
  @Mutation(() => String)
  async loginUser(@Args('email') email: string): Promise<string> {
    const user = await this.userService.ensureUser(email);

    const payload = { sub: user.id, email: user.email };

    return await this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
    });
  }

  @Public()
  @Mutation(() => String)
  async loginUserWithPassword(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    const user = await this.userService.findByEmail(email);

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    return await this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
