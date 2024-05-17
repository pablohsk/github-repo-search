import { useState, useEffect } from 'react';
import axios from 'axios';
import { Repository } from '../models/Repository';

export const UserRepositoryController = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      setLoading(true);
      try {
        // Substitua a URL pela rota adequada para buscar os repositórios do usuário
        const response = await axios.get<Repository[]>('/api/user/repositories');
        setRepositories(response.data);
      } catch (error) {
        setError('Erro ao buscar repositórios do usuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  const removeRepository = async (repositoryId: number) => {
    try {
      // Substitua a URL pela rota adequada para remover um repositório
      await axios.delete(`/api/user/repositories/${repositoryId}`);
      // Atualize a lista de repositórios após a remoção bem-sucedida
      setRepositories(repositories.filter(repo => repo.id !== repositoryId));
    } catch (error) {
      console.error('Erro ao remover repositório:', error);
      setError('Erro ao remover repositório.');
    }
  };

  return { repositories, loading, error, removeRepository };
};