"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@akaiv/core");
const work_command_1 = require("./work-command");
const PixivApp = require('pixiv-app-api');
class PixivModule extends core_1.BotModule {
    constructor({ username, password }) {
        super();
        this.lastLogin = 0;
        this.api = new PixivApp(username, password);
        this.CommandManager.addCommand(new work_command_1.WorkCommand(this));
    }
    get Name() {
        return 'Pixiv';
    }
    get Description() {
        return 'Illusts from pixiv';
    }
    get Namespace() {
        return 'pix';
    }
    get Api() {
        return this.api;
    }
    async getAccessApi() {
        if (!this.api.auth || this.lastLogin + this.api.auth.expiresIn < Date.now())
            await this.api.login();
        return this.api;
    }
    async loadModule() {
    }
}
exports.PixivModule = PixivModule;
//# sourceMappingURL=pixiv-module.js.map