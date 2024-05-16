import { Request, Response } from 'express';
import { UserSearchService } from '../services/UserSearchService';
import { RabbitMQService } from '../services/RabbitMQService';

export class UserSearchController {
  private userSearchService: UserSearchService;
  private rabbitMQService: RabbitMQService;

  constructor() {
    this.userSearchService = new UserSearchService();
    this.rabbitMQService = new RabbitMQService('search-request', 'rabbitmq_url'); // Substitua 'rabbitmq_url' pela URL do seu servidor RabbitMQ
  }

  async searchUsers(req: Request, res: Response) {
    try {
      const query: string = req.query.query as string;

      if (!query) {
        return res.status(400).json({ error: 'Parâmetro de consulta ausente' });
      }

      // Enviar solicitação para o Backend B via RabbitMQ
      await this.rabbitMQService.sendMessage({ query });

      return res.status(202).json({ message: 'Solicitação de busca enviada' });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
  
  async removeRepository(req: Request, res: Response) {
    try {
      const repositoryId: number = parseInt(req.params.repositoryId);

      if (!repositoryId) {
        return res.status(400).json({ error: 'ID do repositório ausente' });
      }

      await this.userSearchService.removeRepository(repositoryId);

      return res.status(200).json({ message: 'Repositório removido com sucesso' });
    } catch (error) {
      console.error('Erro ao remover repositório:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}