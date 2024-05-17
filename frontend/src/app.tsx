import React, { useState, useEffect } from 'react';
import UserSearchBar from './components/UserSearchBar';
import RepositoryTable from './components/RepositoryTable';
import axios from 'axios';

// Definir o tipo para os repositórios
interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  // Adicione outras propriedades conforme necessário
}

const App = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/repositories');
      setRepositories(response.data);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/search-users?query=${query}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (repositoryId: number) => {
    try {
      setLoading(true);
      await axios.delete(`/api/remove-repository/${repositoryId}`);
      setRepositories(repositories.filter(repo => repo.id !== repositoryId));
    } catch (error) {
      console.error('Error removing repository:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>GitHub Repository Search</h1>
      <UserSearchBar onSearch={handleSearch} />
      {loading ? <p>Loading...</p> : <RepositoryTable repositories={repositories} onRemove={handleRemove} />}
    </div>
  );
}

export default App;