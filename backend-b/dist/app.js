"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const GitHubUserController_1 = require("./controllers/GitHubUserController");
class App {
    app;
    gitHubUserController;
    constructor() {
        this.app = (0, express_1.default)();
        this.gitHubUserController = new GitHubUserController_1.GitHubUserController();
        this.setupRoutes();
    }
    setupRoutes() {
        this.app.get('/search-users', this.gitHubUserController.searchUsers.bind(this.gitHubUserController));
    }
    start(port) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
exports.App = App;
const app = new App();
const PORT = parseInt(process.env.PORT, 10) || 3000;
app.start(PORT);
