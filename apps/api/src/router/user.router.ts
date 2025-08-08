import { Router } from "express";
import { UserController } from "../controller/user.controller";

export class UserRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", UserController.getUsers);
  }

  public getRouter(): Router {
    return this.router;
  }
}
