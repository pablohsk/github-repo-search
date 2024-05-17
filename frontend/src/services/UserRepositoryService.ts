import axios from 'axios';

export class UserRepositoryService {
  async searchUsers(query: string): Promise<any[]> {
    try {
      const response = await axios.get(`/search-users?query=${query}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw new Error('Erro ao buscar usuários');
    }
  }

  async removeRepository(repositoryId: number): Promise<void> {
    try {
      await axios.delete(`/remove-repository/${repositoryId}`);
      console.log(`Repositório ${repositoryId} removido com sucesso.`);
    } catch (error) {
      console.error('Erro ao remover repositório:', error);
      throw new Error('Erro ao remover repositório');
    }
  }
}