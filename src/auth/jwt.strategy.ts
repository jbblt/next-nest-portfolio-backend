import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {AppConfigService} from "../config/config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(config: AppConfigService) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.auth.jwtSecret ?? '',
        });
    }

    async validate(payload: any) {
        console.log("✅ Payload validé :", payload);
        return { userId: payload.sub, email: payload.email };
    }
}

