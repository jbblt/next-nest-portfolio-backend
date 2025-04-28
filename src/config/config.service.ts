import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from './env.schema';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  get app() {
    return {
      nodeEnv: this.config.get<EnvVars['NODE_ENV']>('NODE_ENV'),
      isProd: this.config.get('NODE_ENV') === 'production',
      isDev: this.config.get('NODE_ENV') === 'development',
      port: (this.config.get('PORT') as string) ?? '8080',
    };
  }

  get auth() {
    return {
      jwtSecret: this.config.get<EnvVars['JWT_SECRET']>('JWT_SECRET'),
    };
  }
  get database() {
    return {
      url: this.config.get<EnvVars['DATABASE_URL']>('DATABASE_URL'),
    };
  }
  get frontend() {
    return {
      url: this.config.get<EnvVars['FRONTEND_URL']>('FRONTEND_URL'),
    };
  }
}
