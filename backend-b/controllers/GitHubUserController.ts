import { Request, Response } from 'express';
import { RabbitMQService } from '../services/RabbitMQService';

export class GitHubUserController {
  private rabbitMQService: RabbitMQService;

  constructor() {
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
}