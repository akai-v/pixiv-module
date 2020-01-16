import { BotModule } from "@akaiv/core";

/*
 * Created on Thu Jan 16 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class PixivModule extends BotModule {

    constructor({ username, password }: {
        username: string,
        password: string
    }) {
        super();
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

}