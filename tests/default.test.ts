import { Cache, NodeCache } from '../src';

test('node cache test', async () => {
    const key = Math.random().toString(36);
    const value = Math.random().toString(36);
    const cache: Cache = new NodeCache();
    await cache.set(key, value);
    const rv = await cache.get(key);
    expect(rv).toEqual(value);
});
