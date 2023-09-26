import { instanceToPlain, plainToInstance, ClassConstructor } from 'class-transformer';

class StorageWrapper<T> {
  private static readonly APP_PREFIX = 'tinder';

  private readonly key: string;

  constructor(
    storageKey: string,
    private readonly classType: ClassConstructor<T>,
    private readonly storage: Storage = localStorage
  ) {
    this.key = `${StorageWrapper.APP_PREFIX}:${storageKey}`;
  }

  save = (data: T): void => {
    if (!data) {
      return this.storage.removeItem(this.key);
    }

    this.storage.setItem(this.key, JSON.stringify(instanceToPlain(data)));
  };

  restore = (): T => {
    const data: string = this.storage.getItem(this.key);

    if (!data) {
      return null;
    }

    return plainToInstance(this.classType, JSON.parse(data));
  };

  clear = (): void => {
    this.storage.removeItem(this.key);
  };
}

export default StorageWrapper;
