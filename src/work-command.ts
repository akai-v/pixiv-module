import { CommandInfo, BotCommandEvent, Logger, AttachmentTemplate, MessageAttachment, AttachmentType, TemplateAttachment } from "@akaiv/core";
import PixivAppApi from "pixiv-app-api";
import requestPromise = require("request-promise");
import { writeFileSync } from "fs";

/*
 * Created on Thu Jan 16 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class WorkCommand implements CommandInfo {

    private api: PixivAppApi;

    constructor(api: PixivAppApi) {
        this.api = api;
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
            if (!this.api.auth || this.api.auth.expiresIn < Date.now()) {
                await this.api.login();
            }

            let detail = await this.api.illustDetail(id);
            let illust = detail.illust;

            let url = illust.imageUrls.medium;

            let buffer = await requestPromise(url, {
                headers: {
                    Referer: 'http://www.pixiv.net/'
                },
                encoding: null
            });

            e.Channel.sendRichTemplate(new AttachmentTemplate(`${illust.title}\nby ${illust.user.name}\n\n${illust.tags.map((tag) => `#${tag.name}`).join(', ')}\n\nhttps://www.pixiv.net/artworks/${id}`, new TemplateAttachment(AttachmentType.IMAGE, 'illust.jpg', buffer)));
        } catch(ex) {
            e.Channel.sendText(`해당 일러스트를 찾을수 없거나 에러가 발생했습니다. ${ex}`);
        }
        
    }

}

export class RecommendPicCommand implements CommandInfo {

    private api: PixivAppApi;

    constructor(api: PixivAppApi) {
        this.api = api;
    }

    get CommandList() {
        return [ 'recpic' ];
    }

    get Description() {
        return '오늘의 추천 일러';
    }

    get Usage() {
        return 'pix/recpic';
    }

    async onCommand(e: BotCommandEvent, logger: Logger) {
        try {
            if (!this.api.auth || this.api.auth.expiresIn < Date.now()) {
                await this.api.login();
            }

            let detail = await this.api.illustRecommendedNologin();
            let illust = detail.illusts[Math.min(Math.floor(detail.illusts.length * Math.random()), detail.illusts.length - 1)];

            console.log(JSON.stringify(illust));

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

export class RecommendNovelCommand implements CommandInfo {

    private api: PixivAppApi;

    constructor(api: PixivAppApi) {
        this.api = api;
    }

    get CommandList() {
        return [ 'recnovel' ];
    }

    get Description() {
        return '추천 소설';
    }

    get Usage() {
        return 'pix/recnovel';
    }

    async onCommand(e: BotCommandEvent, logger: Logger) {
        try {
            if (!this.api.auth || this.api.auth.expiresIn < Date.now()) {
                await this.api.login();
            }

            let detail = await this.api.novelRecommendedNologin();
            let novel = detail.novels[Math.min(Math.floor(detail.novels.length * Math.random()), detail.novels.length - 1)];

            let url = novel.imageUrls.medium;

            let buffer = await requestPromise(url, {
                headers: {
                    Referer: 'http://www.pixiv.net/'
                },
                encoding: null
            });

            e.Channel.sendRichTemplate(new AttachmentTemplate(`${novel.title}\nby ${novel.user.name}\n\n${novel.tags.map((tag) => `#${tag.name}`).join(', ')}\n\nhttps://www.pixiv.net/artworks/${novel.id}`, new TemplateAttachment(AttachmentType.IMAGE, 'illust.jpg', buffer)));
        } catch(ex) {
            e.Channel.sendText(`에러가 발생했습니다. ${ex}`);
        }
        
    }

}