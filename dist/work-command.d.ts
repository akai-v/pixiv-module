import { CommandInfo, BotCommandEvent, Logger } from "@akaiv/core";
import { PixivModule } from "./pixiv-module";
export declare class WorkCommand implements CommandInfo {
    private app;
    constructor(app: PixivModule);
    readonly CommandList: string[];
    readonly Description: string;
    readonly Usage: string;
    onCommand(e: BotCommandEvent, logger: Logger): Promise<void>;
}
