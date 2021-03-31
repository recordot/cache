import asyncRedis from "async-redis";
import redis, { Commands, RedisClient, ClientOpts } from 'redis';
import Cache from "../contracts/Cache";

export interface ConstructConfig{
    host: string;
    port?: number;
    auth_pass?: string;
}

type Omitted = Omit<RedisClient, keyof Commands<boolean>>;

interface Promisified<T = RedisClient>
    extends Omitted,
        Commands<Promise<boolean>> {}

export default class NodeCache extends Cache {

    protected redisClient: RedisClient;
    protected asyncRedisClient: Promisified<redis.RedisClient>;

    constructor(config: ConstructConfig){
        super();
        this.redisClient = redis.createClient({
            host: config.host,
            port: config.port || 6379,
            auth_pass: config.auth_pass,
        });
        this.asyncRedisClient = asyncRedis.decorate(this.redisClient);
    }

    set(key: string, target: any): Promise<boolean> {
        return this.asyncRedisClient.set(key, JSON.stringify(target));
    }

    async get(key: string): Promise<any> {
        const ret = await this.asyncRedisClient.get(key);
        return new Promise(resolve => {
            if(typeof(ret) === "string")
                resolve(JSON.parse(ret));
            else
                resolve(undefined);
        });
    }

    release(): any {this.redisClient.quit(); }
}