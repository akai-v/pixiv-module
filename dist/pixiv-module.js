"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@akaiv/core");
const work_command_1 = require("./work-command");
const PixivApp = require("pixiv-app-api");
class PixivModule extends core_1.BotModule {
    constructor({ username, password }) {
        super();
        this.api = new PixivApp(username, password);
        this.CommandManager.addCommand(new work_command_1.WorkCommand(this.api));
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
    async loadModule() {
        let client = await this.api.login();
    }
}
exports.PixivModule = PixivModule;
//# sourceMappingURL=pixiv-module.js.map