import { Cache, MemoryStore } from 'react-native-cache';
import { name } from '../../app.json';

export default class CacheService {
  private static instance: CacheService;
  private static cache: Cache;

  private constructor() {
    CacheService.cache = new Cache({
      backend: MemoryStore,
      namespace: name,
      policy: {
        maxEntries: 5,
      },
    });
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }

    return CacheService.instance;
  }

  public setAsync<T>(key: string, value: T): Promise<void> {
    return CacheService.cache.set(key, JSON.stringify(value));
  }

  public async getAsync<T>(key: string): Promise<T | undefined> {
    console.log('cached');
    const value: string | undefined = await CacheService.cache.get(key);
    return value ? JSON.parse(value) : undefined;
  }

  public getAllAsync(): Promise<{ [key: string]: any }> {
    return CacheService.cache.getAll();
  }

  public removeAsync(key: string): Promise<void> {
    return CacheService.cache.remove(key);
  }

  public clearAllAsync(): Promise<void> {
    return CacheService.cache.clearAll();
  }
}
