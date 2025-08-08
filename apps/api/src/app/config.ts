import dotenv from "dotenv";
import { resolve } from "path";
import { z } from "zod";

export const NODE_ENV = process.env.NODE_ENV || "development";
export const envFile = NODE_ENV === "development" ? ".env.development" : ".env.production";

if (NODE_ENV === "development") {
  dotenv.config({ path: resolve(__dirname, `../../.env.development.local`) });
} else {
  dotenv.config({ path: resolve(__dirname, `../../.env.production.local`) });
}

export const PORT = process.env.PORT;

export const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  NODE_ENV: z.union([z.literal("development"), z.literal("testing"), z.literal("production")]).default("development"),
  DATABASE_URL: z.url(),
  BACKEND_URL: z.url(),
  FRONTEND_URL: z.url(),
  DOMAIN: z.string(),
});

export const env = envSchema.parse(process.env);

export type Environment = {
  Bindings: z.infer<typeof envSchema>;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}