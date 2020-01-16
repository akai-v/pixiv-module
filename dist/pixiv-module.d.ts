import { BotModule } from "@akaiv/core";
export declare class PixivModule extends BotModule {
    private api;
    constructor({ username, password }: {
        username: string;
        password: string;
    });
    readonly Name: string;
    readonly Description: string;
    readonly Namespace: string;
    readonly Api: any;
    protected loadModule(): Promise<void>;
}
