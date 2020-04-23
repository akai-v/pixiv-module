import { BotModule } from "@akaiv/core";
import { WorkCommand } from "./work-command";
import PixivApp from "pixiv-app-api";

/*
 * Created on Thu Jan 16 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */


export class PixivModule extends BotModule {

    private api: PixivApp;

    private lastLogin: number;

    constructor({ username, password }: {
        username: string,
        password: string
    }) {
        super();

        this.lastLogin = 0;

        this.api = new PixivApp(username, password);

        this.CommandManager.addCommand(new WorkCommand(this));
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
        if (!this.api.auth || this.lastLogin + this.api.auth.expiresIn < Date.now()) await this.api.login();

        return this.api;
    }

    protected async loadModule(): Promise<void> {
        
    }

}