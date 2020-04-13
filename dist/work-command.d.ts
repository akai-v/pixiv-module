import { CommandInfo, BotCommandEvent, Logger } from "@akaiv/core";
import PixivAppApi from "pixiv-app-api";
export declare class WorkCommand implements CommandInfo {
    private api;
    constructor(api: PixivAppApi);
    readonly CommandList: string[];
    readonly Description: string;
    readonly Usage: string;
    onCommand(e: BotCommandEvent, logger: Logger): Promise<void>;
}
export declare class RecommendPicCommand implements CommandInfo {
    private api;
    constructor(api: PixivAppApi);
    readonly CommandList: string[];
    readonly Description: string;
    readonly Usage: string;
    onCommand(e: BotCommandEvent, logger: Logger): Promise<void>;
}
export declare class RecommendNovelCommand implements CommandInfo {
    private api;
    constructor(api: PixivAppApi);
    readonly CommandList: string[];
    readonly Description: string;
    readonly Usage: string;
    onCommand(e: BotCommandEvent, logger: Logger): Promise<void>;
}
