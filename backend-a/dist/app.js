"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserSearchController_1 = require("./controllers/UserSearchController");
require("reflect-metadata");
class App {
    app;
    userSearchController;
    constructor() {
        this.app = (0, express_1.default)();
        this.userSearchController = new UserSearchController_1.UserSearchController();
        this.setupRoutes();
    }
    setupRoutes() {
        this.app.get('/search-users', this.userSearchController.searchUsers.bind(this.userSearchController));
        this.app.delete('/remove-repository/:repositoryId', this.userSearchController.removeRepository.bind(this.userSearchController));
    }
    start(port) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
const app = new App();
const PORT = parseInt(process.env.PORT, 10) || 3000;
app.start(PORT);
