import {z} from "zod";

export const databaseSchema = z.object({
    DATABASE_URL: z.string({
        required_error: "DATABASE_URL is required",
        invalid_type_error: "DATABASE_URL must be a string",
    }).url("DATABASE_URL must be a valid URL"),
});
