import axios from 'axios';
import { getRepository } from 'typeorm';
import { UserSearchRequest } from '../models/UserSearchRequest';
import { Repository as RepositoryEntity } from '../models/Repository';

export class UserSearchService {
  async searchUsers(query: string) {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${query}`);

      const users = await Promise.all(response.data.items.map(async (item: any) => {
        const userData = {
          id: item.id,
          login: item.login,
          avatarUrl: item.avatar_url,
          profileUrl: item.html_url
        };
        
        const reposResponse = await axios.get(item.repos_url);
        const repositories: RepositoryEntity[] = reposResponse.data.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          htmlUrl: repo.html_url,
          userSearchRequest: null
        }));

        const userSearchRequest = new UserSearchRequest();
        userSearchRequest.query = query;  
        userSearchRequest.repositories = repositories;

        const userSearchRequestRepository = getRepository(UserSearchRequest);
        await userSearchRequestRepository.save(userSearchRequest);

        return {
          ...userData,
          repositories: repositories
        };
      }));

      return users;
    } catch (error) {
      console.error('Erro ao buscar usuários no GitHub:', error);
      throw new Error('Erro ao buscar usuários no GitHub');
    }
  }

  async removeRepository(repositoryId: number): Promise<void> {
    try {
      if (!repositoryId || repositoryId <= 0) {
        throw new Error('ID do repositório inválido');
      }
  
      const repositoryRepository = getRepository(RepositoryEntity);
      const repository = await repositoryRepository.findOne({ where: { id: repositoryId } });

      if (!repository) {
        throw new Error('Repositório não encontrado');
      }
  
      await repositoryRepository.remove(repository);
  
      console.log(`Repositório ${repositoryId} removido com sucesso.`);
    } catch (error) {
      console.error('Erro ao remover repositório:', error);
      throw new Error('Erro ao remover repositório');
    }
  }
}