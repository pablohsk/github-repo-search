import express, { Application, Request, Response } from 'express';
import { GitHubUserController } from './controllers/GitHubUserController';

export class App {
  private app: Application;
  private gitHubUserController: GitHubUserController;

  constructor() {
    this.app = express();
    this.gitHubUserController = new GitHubUserController();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.get('/search-users', this.gitHubUserController.searchUsers.bind(this.gitHubUserController));
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