"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSearchService = void 0;
const axios_1 = __importDefault(require("axios"));
const typeorm_1 = require("typeorm"); // Importe a função getRepository
const UserSearchRequest_1 = require("../models/UserSearchRequest");
const Repository_1 = require("../models/Repository");
class UserSearchService {
    async searchUsers(query) {
        try {
            const response = await axios_1.default.get(`https://api.github.com/search/users?q=${query}`);
            const users = await Promise.all(response.data.items.map(async (item) => {
                const userData = {
                    id: item.id,
                    login: item.login,
                    avatarUrl: item.avatar_url,
                    profileUrl: item.html_url
                };
                const reposResponse = await axios_1.default.get(item.repos_url);
                const repositories = reposResponse.data.map((repo) => ({
                    id: repo.id,
                    name: repo.name,
                    fullName: repo.full_name,
                    description: repo.description,
                    htmlUrl: repo.html_url
                }));
                // Criar uma nova instância de UserSearchRequest com os dados
                const userSearchRequest = new UserSearchRequest_1.UserSearchRequest();
                // Salvar a instância de UserSearchRequest no banco de dados usando o repositório correspondente
                const userSearchRequestRepository = (0, typeorm_1.getRepository)(UserSearchRequest_1.UserSearchRequest);
                await userSearchRequestRepository.save(userSearchRequest);
                return {
                    ...userData,
                    repositories: repositories
                };
            }));
            return users;
        }
        catch (error) {
            console.error('Erro ao buscar usuários no GitHub:', error);
            throw new Error('Erro ao buscar usuários no GitHub');
        }
    }
    async removeRepository(repositoryId) {
        try {
            if (!repositoryId || repositoryId <= 0) {
                throw new Error('ID do repositório inválido');
            }
            const repositoryRepository = (0, typeorm_1.getRepository)(Repository_1.Repository);
            const repository = await repositoryRepository.findOne({ where: { id: repositoryId } });
            if (!repository) {
                throw new Error('Repositório não encontrado');
            }
            await repositoryRepository.remove(repository);
            console.log(`Repositório ${repositoryId} removido com sucesso.`);
        }
        catch (error) {
            console.error('Erro ao remover repositório:', error);
        }
    }
}
exports.UserSearchService = UserSearchService;
