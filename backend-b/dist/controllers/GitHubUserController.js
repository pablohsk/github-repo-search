"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubUserController = void 0;
const RabbitMQService_1 = require("../services/RabbitMQService");
class GitHubUserController {
    rabbitMQService;
    constructor() {
        this.rabbitMQService = new RabbitMQService_1.RabbitMQService('search-request', 'rabbitmq_url'); // Substitua 'rabbitmq_url' pela URL do seu servidor RabbitMQ
    }
    async searchUsers(req, res) {
        try {
            const query = req.query.query;
            if (!query) {
                return res.status(400).json({ error: 'Parâmetro de consulta ausente' });
            }
            // Enviar solicitação para o Backend B via RabbitMQ
            await this.rabbitMQService.sendMessage({ query });
            return res.status(202).json({ message: 'Solicitação de busca enviada' });
        }
        catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}
exports.GitHubUserController = GitHubUserController;
