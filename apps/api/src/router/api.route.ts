import { Router } from "express";
import { UserRouter } from "./user.router";

export class APIRouter {
  private router: Router;
  private userRouter: UserRouter;

  constructor() {
    this.router = Router();
    this.userRouter = new UserRouter();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use("/users", this.userRouter.getRouter());
  }

  public getRouter(): Router {
    return this.router;
  }
}
