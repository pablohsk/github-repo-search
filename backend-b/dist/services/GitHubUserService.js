"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubUserService = void 0;
const axios_1 = __importDefault(require("axios"));
class GitHubUserService {
    async searchUsers(query) {
        try {
            const response = await axios_1.default.get(`https://api.github.com/search/users?q=${query}`);
            return response.data.items;
        }
        catch (error) {
            console.error('Erro ao buscar usuários no GitHub:', error);
            throw new Error('Erro ao buscar usuários no GitHub');
        }
    }
}
exports.GitHubUserService = GitHubUserService;
