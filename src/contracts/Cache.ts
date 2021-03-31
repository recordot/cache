export default abstract class Cache {
    abstract set<T>(key: string, target: T): Promise<boolean>;
    abstract get(key: string): Promise<any>;
    abstract release(): any;
}
