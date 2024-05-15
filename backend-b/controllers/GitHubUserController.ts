import { Request, Response } from 'express';
import { GitHubUserService } from '../services/GitHubUserService';

export class GitHubUserController {
  private gitHubUserService: GitHubUserService;

  constructor() {
    this.gitHubUserService = new GitHubUserService();
  }

  async searchUsers(req: Request, res: Response) {
    try {
      const query: string = req.query.query as string;

      if (!query) {
        return res.status(400).json({ error: 'Parâmetro de consulta ausente' });
      }

      const users = await this.gitHubUserService.searchUsers(query);

      return res.json(users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}