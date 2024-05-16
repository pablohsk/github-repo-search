import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Repository } from './Repository';

@Entity()
export class UserSearchRequest {
  @PrimaryGeneratedColumn()
  id: number = 0; // Inicializador para 'id'

  @Column()
  query: string = ''; // Inicializador para 'query'

  @OneToMany(() => Repository, repository => repository.userSearchRequest)
  repositories: Repository[] = []; // Inicializador para 'repositories'
}