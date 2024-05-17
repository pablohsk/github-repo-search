"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
class Repository {
    id;
    name;
    fullName;
    description;
    htmlUrl;
    userSearchRequest;
    constructor(id = 0, name = '', fullName = '', description = '', htmlUrl = '', userSearchRequest) {
        this.id = id;
        this.name = name;
        this.fullName = fullName;
        this.description = description;
        this.htmlUrl = htmlUrl;
        this.userSearchRequest = userSearchRequest;
    }
}
exports.Repository = Repository;
