import {z} from "zod";

export const authSchema = z.object({
    JWT_SECRET: z.string({
        required_error: "JWT_SECRET is required",
        invalid_type_error: "JWT_SECRET must be a string",
    }).min(1, "JWT_SECRET cannot be empty"),
});
