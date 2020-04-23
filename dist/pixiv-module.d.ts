import { BotModule } from "@akaiv/core";
import PixivAppType from "pixiv-app-api";
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
    readonly Api: PixivAppType<true>;
    getAccessApi(): Promise<PixivAppType<true>>;
    protected loadModule(): Promise<void>;
}
