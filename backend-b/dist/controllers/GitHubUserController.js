"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubUserController = void 0;
const GitHubUserService_1 = require("../services/GitHubUserService");
class GitHubUserController {
    gitHubUserService;
    constructor() {
        this.gitHubUserService = new GitHubUserService_1.GitHubUserService();
    }
    async searchUsers(req, res) {
        try {
            const query = req.query.query;
            if (!query) {
                return res.status(400).json({ error: 'Parâmetro de consulta ausente' });
            }
            const users = await this.gitHubUserService.searchUsers(query);
            return res.json(users);
        }
        catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}
exports.GitHubUserController = GitHubUserController;
