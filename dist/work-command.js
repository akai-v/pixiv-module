"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@akaiv/core");
const requestPromise = require("request-promise");
class WorkCommand {
    constructor(api) {
        this.api = api;
    }
    get CommandList() {
        return ['id'];
    }
    get Description() {
        return '해당 id 일러스트를 가져옵니다';
    }
    get Usage() {
        return 'pix/id <id>';
    }
    async onCommand(e, logger) {
        if (e.RawArgument.length < 1) {
            e.Channel.sendText(`사용법: ${this.Usage}`);
            return;
        }
        let id = -1;
        try {
            id = Number.parseInt(e.RawArgument);
        }
        catch (ex) {
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
            e.Channel.sendRichTemplate(new core_1.AttachmentTemplate(`${illust.title}\nby ${illust.user.name}\n\n${illust.tags.map((tag) => `#${tag.name}`).join(', ')}\n\nhttps://www.pixiv.net/artworks/${illust.id}`, new core_1.TemplateAttachment(core_1.AttachmentType.IMAGE, 'illust.jpg', buffer)));
        }
        catch (ex) {
            e.Channel.sendText(`해당 일러스트를 찾을수 없거나 에러가 발생했습니다. ${ex}`);
        }
    }
}
exports.WorkCommand = WorkCommand;
//# sourceMappingURL=work-command.js.map