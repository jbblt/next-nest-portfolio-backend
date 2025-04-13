import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {GqlExecutionContext} from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard("jwt") {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        console.log("📥 GqlAuthGuard > Header Authorization reçu :", req.headers.authorization);

        return req;
    }

    handleRequest(err, user, info) {
        if (err) {
            console.error("❌ handleRequest > Erreur Passport :", err.message);
        }

        if (!user) {
            console.warn("🚫 handleRequest > Auth échouée. Info :", info?.message || info);
        }

        console.log("👤 handleRequest > Utilisateur auth :", user);

        if (err || !user) {
            throw err || new UnauthorizedException();
        }

        return user;
    }
}
