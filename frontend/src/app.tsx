import React, { useState } from 'react';
import UserSearchBar from './components/UserSearchBar';
import RepositoryTable from './components/RepositoryTable';
import axios from 'axios';
import './App.css';

// Interface para o tipo do repositório
interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  htmlUrl: string;
}

const App: React.FC = () => {
  // Estado para os repositórios e para o estado de carregamento
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  // Estado para a query de pesquisa
  const [searchQuery, setSearchQuery] = useState("");

  // Função para buscar os repositórios
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

  // Função para lidar com a pesquisa
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/search-users?query=${searchQuery}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para remover um repositório
  const handleRemove = async (repositoryId: string) => {
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
    <div className="app-container">
      {/* Título centralizado */}
      <h1 className="app-title">GitHub Repository Search</h1>
      {/* Barra de pesquisa e botão de pesquisa */}
      <div className="search-container">
        <UserSearchBar onSearch={handleSearch} setSearchQuery={setSearchQuery} />
      </div>
      {/* Componente de tabela de repositórios */}
      <div className="repository-container">
        {loading ? <p>Loading...</p> : <RepositoryTable repositories={repositories} onRemove={handleRemove} />}
      </div>
    </div>
  );
}

export default App;