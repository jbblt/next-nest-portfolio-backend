import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor() {
        const secret = process.env.JWT_SECRET;
        console.log("🧪 JwtStrategy > Clé utilisée pour décoder :", secret);

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret ?? '',
        });
    }

    async validate(payload: any) {
        console.log("✅ JwtStrategy > Token validé !");
        console.log("🟢 JwtStrategy > Payload reçu :", payload);
        return { userId: payload.sub, email: payload.email };
    }
}

