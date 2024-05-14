import { Request, Response } from 'express';
import { UserSearchService } from '../services/UserSearchService.ts';

export class UserSearchController {
  private userSearchService: UserSearchService;

  constructor() {
    this.userSearchService = new UserSearchService();
  }

  async searchUsers(req: Request, res: Response) {
    try {
      // Extrair parâmetros da solicitação (se necessário)
      const { query } = req.query;

      // Verificar se o parâmetro de consulta está presente
      if (!query) {
        return res.status(400).json({ error: 'Parâmetro de consulta ausente' });
      }

      // Chamar o serviço para buscar os usuários no GitHub
      const users = await this.userSearchService.searchUsers(query);

      // Retornar a lista de usuários encontrados
      return res.json(users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}