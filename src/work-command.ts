import { CommandInfo, BotCommandEvent, Logger, AttachmentTemplate, MessageAttachment, AttachmentType, TemplateAttachment } from "@akaiv/core";
import PixivAppApi from "pixiv-app-api";
import requestPromise = require("request-promise");
import { writeFileSync } from "fs";
import { PixivModule } from "./pixiv-module";

/*
 * Created on Thu Jan 16 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class WorkCommand implements CommandInfo {

    private app: PixivModule;

    constructor(app: PixivModule) {
        this.app = app;
    }

    get CommandList() {
        return [ 'id' ];
    }

    get Description() {
        return '해당 id 일러스트를 가져옵니다';
    }

    get Usage() {
        return 'pix/id <id>';
    }

    async onCommand(e: BotCommandEvent, logger: Logger) {
        if (e.RawArgument.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }

        let id = -1;

        try {
            id = Number.parseInt(e.RawArgument);
        } catch(ex) {
            e.Channel.sendText(`올바른 id를 입력해주세요.`);
            return;
        }

        try {
            let api = await this.app.getAccessApi();

            let detail = await api.illustDetail(id);
            let illust = detail.illust;

            let url = illust.imageUrls.medium;

            let buffer = await requestPromise(url, {
                headers: {
                    Referer: 'http://www.pixiv.net/'
                },
                encoding: null
            });

            e.Channel.sendRichTemplate(new AttachmentTemplate(`${illust.title}\nby ${illust.user.name}\n\n${illust.tags.map((tag) => `#${tag.name}`).join(', ')}\n\nhttps://www.pixiv.net/artworks/${illust.id}`, new TemplateAttachment(AttachmentType.IMAGE, 'illust.jpg', buffer)));
        } catch(ex) {
            e.Channel.sendText(`해당 일러스트를 찾을수 없거나 에러가 발생했습니다. ${ex}`);
        }
        
    }

}