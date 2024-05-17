import React from 'react';

interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  htmlUrl: string;
}

interface RepositoryTableProps {
  repositories: Repository[];
  onRemove: (id: string) => void;
}

const RepositoryTable: React.FC<RepositoryTableProps> = ({ repositories, onRemove }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Full Name</th>
          <th>Description</th>
          <th>URL</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {repositories.map(repository => (
          <tr key={repository.id}>
            <td>{repository.name}</td>
            <td>{repository.fullName}</td>
            <td>{repository.description}</td>
            <td><a href={repository.htmlUrl} target="_blank" rel="noreferrer">Link</a></td>
            <td>
              <button onClick={() => onRemove(repository.id)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RepositoryTable;