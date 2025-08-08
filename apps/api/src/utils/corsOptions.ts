import { CorsOptions } from "cors";
import { env } from "../app/config";

export const corsOptions: CorsOptions = {
  origin: env.FRONTEND_URL,
  credentials: true,
};
