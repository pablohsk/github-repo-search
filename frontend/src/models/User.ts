import { Repository } from "./Repository";

export interface User {
    id: number;
    login: string;
    avatarUrl: string;
    profileUrl: string;
    repositories: Repository[];
  }