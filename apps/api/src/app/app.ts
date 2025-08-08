import express, { Express, Request, Response, NextFunction, json, urlencoded } from "express";
import path from "node:path";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { env, envFile, PORT } from "./config";
import { APIRouter } from "../router/api.route";
import { corsOptions } from "../utils/corsOptions";
import errorMiddleware from "../middleware/error.handler";

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(json());
    this.app.use(cookieParser());
    this.app.use(urlencoded({ extended: true }));
    this.app.use("/public", express.static(path.join(__dirname, "../../public")));
  }

  private handleError(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes("/api/")) res.status(404).send("Not found !");
      next();
    });
    this.app.use(errorMiddleware);
  }

  private routes(): void {
    const apiRouter = new APIRouter();

    this.app.get("/", (req: Request, res: Response) => {
      res.send(`Welcome to PLN API ${env.NODE_ENV} api !`);
    });
    this.app.use("/api", apiRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] ${env.NODE_ENV} :   http://localhost:${PORT}/`);
      console.log(`  ➜  Enviroenment          : ${envFile}`);
    });
  }
}
