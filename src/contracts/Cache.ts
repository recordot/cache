export default abstract class Cache {
    abstract set(key: string, target: any): Promise<boolean>;
    abstract get(key: string): Promise<any>;
    abstract release():any;
}