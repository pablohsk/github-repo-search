import axios from 'axios';

export class UserSearchService {
  async searchUsers(query: string) {
    try {
      // Realizar a busca de usuários na API do GitHub
      const response = await axios.get(`https://api.github.com/search/users?q=${query}`);

      // Extrair os dados relevantes da resposta
      const users = response.data.items.map((item: any) => ({
        id: item.id,
        login: item.login,
        avatarUrl: item.avatar_url,
        profileUrl: item.html_url
        // Adicione outros campos relevantes conforme necessário
      }));

      // Retornar os usuários encontrados
      return users;
    } catch (error) {
      console.error('Erro ao buscar usuários no GitHub:', error);
      throw new Error('Erro ao buscar usuários no GitHub');
    }
  }
}
