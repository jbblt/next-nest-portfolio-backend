import { envSchema, EnvVars } from "./env.schema";

export function validateEnv(rawEnv: NodeJS.ProcessEnv): EnvVars {
    const parsed = envSchema.safeParse(rawEnv);

    if (!parsed.success) {
        console.error("❌ Invalid environment variables:");
        console.error(parsed.error.format());
        process.exit(1);
    }

    return parsed.data;
}
