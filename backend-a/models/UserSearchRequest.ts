import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Repository } from './Repository';

@Entity()
export class UserSearchRequest {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  query: string = '';

  @OneToMany(() => Repository, repository => repository.userSearchRequest, { cascade: true })
  repositories: Repository[] = [];
}
