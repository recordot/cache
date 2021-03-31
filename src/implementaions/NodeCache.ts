import NC from 'node-cache';
import Cache from '../contracts/Cache';

export default class NodeCache extends Cache {
    release(): any {
        this.cache.close();
    }

    protected cache: NC;

    constructor() {
        super();
        this.cache = new NC();
    }

    set(key: string, target: any): Promise<boolean> {
        return new Promise((resolve) => {
            const r = this.cache.set(key, target);
            resolve(r);
        });
    }

    get(key: string): Promise<any> {
        return new Promise((resolve) => {
            const r = this.cache.get(key);
            resolve(r);
        });
    }
}
