import express, { Application } from 'express';
import { UserSearchController } from './controllers/UserSearchController';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

class App {
  private app: Application;
  private userSearchController: UserSearchController;

  constructor() {
    this.app = express();
    this.userSearchController = new UserSearchController();
    this.setupRoutes();
    this.initializeDatabase();
  }

  private setupRoutes(): void {
    this.app.get('/search-users', this.userSearchController.searchUsers.bind(this.userSearchController));
    this.app.delete('/remove-repository/:repositoryId', this.userSearchController.removeRepository.bind(this.userSearchController));
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await createConnection();
      console.log('Conectado ao banco de dados');
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados', error);
    }
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