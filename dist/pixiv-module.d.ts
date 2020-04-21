import { BotModule } from "@akaiv/core";
import PixivApp from "pixiv-app-api";
declare const PixivApp: any;
export declare class PixivModule extends BotModule {
    private api;
    private lastLogin;
    constructor({ username, password }: {
        username: string;
        password: string;
    });
    readonly Name: string;
    readonly Description: string;
    readonly Namespace: string;
    readonly Api: PixivApp<true>;
    getAccessApi(): PixivApp<true>;
    protected loadModule(): Promise<void>;
}
export {};
