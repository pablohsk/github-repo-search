Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSearchController = void 0;
const UserSearchService_ts_1 = require("../services/UserSearchService");
class UserSearchController {
    userSearchService;
    constructor() {
        this.userSearchService = new UserSearchService_ts_1.UserSearchService();
    }
    async searchUsers(req, res) {
        try {
            // Extrair parâmetros da solicitação (se necessário)
            const query = req.query.query;
            // Verificar se o parâmetro de consulta está presente
            if (!query) {
                return res.status(400).json({ error: 'Parâmetro de consulta ausente' });
            }
            // Chamar o serviço para buscar os usuários no GitHub
            const users = await this.userSearchService.searchUsers(query);
            // Retornar a lista de usuários encontrados
            return res.json(users);
        }
        catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}
exports.UserSearchController = UserSearchController;
