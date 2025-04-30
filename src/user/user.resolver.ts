import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Public } from '../auth/public.decorator';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/login-response.dto';

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
  @Mutation(() => LoginResponse)
  async loginUserWithPassword(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<LoginResponse> {
    const user = await this.userService.findByEmail(email);

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    const isPasswordValid = (await bcrypt.compare(
      password,
      user.passwordHash,
    )) as boolean;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    const token = await this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      token,
      user: {
        id: user.id,
        name: user.name ?? undefined,
        email: user.email,
        image: user.image ?? undefined,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
