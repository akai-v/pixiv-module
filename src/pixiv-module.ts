import { BotModule } from "@akaiv/core";
import PixivAppApi from "pixiv-app-api";
import { PixivClient } from "pixiv-app-api/dist/PixivTypes";

/*
 * Created on Thu Jan 16 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class PixivModule extends BotModule {

    private api: PixivAppApi;
    private info: PixivClient | null;

    private loaded: boolean;

    constructor({ username, password }: {
        username: string,
        password: string
    }) {
        super();

        this.api = new PixivAppApi(username, password);
        this.info = null;
        this.loaded = false;

        this.login();
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

    get Loaded() {
        return this.loaded;
    }

    protected async login() {
        let client = await this.api.login();

        this.info = client;

        this.loaded = true;
    }

}