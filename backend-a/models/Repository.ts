import { UserSearchRequest } from './UserSearchRequest';

export class Repository {
  id: number;
  name: string;
  fullName: string;
  description: string;
  htmlUrl: string;
  userSearchRequest?: UserSearchRequest;

  constructor(
    id: number = 0,
    name: string = '',
    fullName: string = '',
    description: string = '',
    htmlUrl: string = '',
    userSearchRequest?: UserSearchRequest
  ) {
    this.id = id;
    this.name = name;
    this.fullName = fullName;
    this.description = description;
    this.htmlUrl = htmlUrl;
    this.userSearchRequest = userSearchRequest;
  }
}
