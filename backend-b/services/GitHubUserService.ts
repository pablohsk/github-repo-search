import axios from 'axios';
import { GitHubUser } from '../models/GitHubUser';

export class GitHubUserService {
  async searchUsers(query: string): Promise<GitHubUser[]> {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
      return response.data.items;
    } catch (error) {
      console.error('Erro ao buscar usuários no GitHub:', error);
      throw new Error('Erro ao buscar usuários no GitHub');
    }
  }
}