import express, { Application, Request, Response } from 'express';
import { UserSearchController } from './controllers/UserSearchController';

class App {
  private app: Application;
  private userSearchController: UserSearchController;

  constructor() {
    this.app = express();
    this.userSearchController = new UserSearchController();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.get('/search-users', this.userSearchController.searchUsers.bind(this.userSearchController));
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

const app = new App();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
app.start(PORT);