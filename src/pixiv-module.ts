import { BotModule } from "@akaiv/core";
import { WorkCommand } from "./work-command";

/*
 * Created on Thu Jan 16 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

const PixivApp = require("pixiv-app-api");

export class PixivModule extends BotModule {

    private api: any;

    constructor({ username, password }: {
        username: string,
        password: string
    }) {
        super();

        this.api = new PixivApp(username, password);

        this.CommandManager.addCommand(new WorkCommand(this.api));
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

    protected async loadModule(): Promise<void> {
        let client = await this.api.login();
    }

}