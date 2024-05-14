var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSearchService = void 0;
const axios_1 = __importDefault(require("axios"));
class UserSearchService {
    async searchUsers(query) {
        try {
            // Realizar a busca de usuários na API do GitHub
            const response = await axios_1.default.get(`https://api.github.com/search/users?q=${query}`);
            // Extrair os dados relevantes da resposta
            const users = response.data.items.map((item) => ({
                id: item.id,
                login: item.login,
                avatarUrl: item.avatar_url,
                profileUrl: item.html_url
                // Adicione outros campos relevantes conforme necessário
            }));
            // Retornar os usuários encontrados
            return users;
        }
        catch (error) {
            console.error('Erro ao buscar usuários no GitHub:', error);
            throw new Error('Erro ao buscar usuários no GitHub');
        }
    }
}
exports.UserSearchService = UserSearchService;
