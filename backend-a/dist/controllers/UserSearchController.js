"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSearchController = void 0;
const UserSearchService_1 = require("../services/UserSearchService");
const RabbitMQService_1 = require("../services/RabbitMQService");
class UserSearchController {
    userSearchService;
    rabbitMQService;
    constructor() {
        this.userSearchService = new UserSearchService_1.UserSearchService();
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
    async removeRepository(req, res) {
        try {
            const repositoryId = parseInt(req.params.repositoryId);
            if (!repositoryId) {
                return res.status(400).json({ error: 'ID do repositório ausente' });
            }
            await this.userSearchService.removeRepository(repositoryId);
            return res.status(200).json({ message: 'Repositório removido com sucesso' });
        }
        catch (error) {
            console.error('Erro ao remover repositório:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}
exports.UserSearchController = UserSearchController;
