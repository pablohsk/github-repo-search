import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserSearchRequest } from './UserSearchRequest';

@Entity()
export class Repository {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = '';

  @Column()
  fullName: string = '';

  @Column()
  description: string = '';

  @Column()
  htmlUrl: string = '';

  @ManyToOne(() => UserSearchRequest, userSearchRequest => userSearchRequest.repositories)
  userSearchRequest?: UserSearchRequest;
}