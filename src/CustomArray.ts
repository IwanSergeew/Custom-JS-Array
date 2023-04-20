import util from 'util';
import {
  ArrayDataObject,
  ArrayIteratorResult,
  EntriesReturn,
  FilterCallback,
  FilterAsyncCallback,
  ForEachCallback,
  ForEachAsyncCallback,
  MapCallback,
  MapAsyncCallback,
  ReduceCallback,
  SomeCallback,
  SortCallback,
  VlauesReturn,
} from './types';

export default class CustomArray<T> implements ArrayLike<T> {
  #length: number;
  #size: number;

  [n: number]: T;

  constructor(...args: (T | typeof Symbol.iterator | number)[]) {
    this.#length = 0;
    this.#size = 0;

    if (args[0] !== undefined) {
      if (args[1] === undefined) {
        if (typeof args[0] === 'number') {
          this.#size = args[0];
          this.#length = args[0];
        } else if (typeof args[0] === typeof Symbol.iterator) {
          this.push(...(args[0] as T[]));
        } else {
          this.push(args[0] as T);
        }
      } else {
        this.push(...(args as T[]));
      }
    }
  }

  #getEntries() {
    const entries: ArrayDataObject<T> = {};
    for (let i = 0; i < this.#length; i++) {
      entries[i] = this[i];
    }
    return Object.values(entries);
  }

  *[Symbol.iterator]() {
    for (let i = 0, n = this.#length; i < n; ++i) yield this[i];
  }

  get length() {
    return this.#length;
  }
  set length(value: number) {
    if (value < this.#length) {
      for (let i = value; i < this.#length; i++) {
        delete this[i];
      }
    }
    this.#length = this.#size < value ? this.#size : value;
  }

  [util.inspect.custom](_depth: number, _opts: Object) {
    return this.#getEntries();
  }

  values(): VlauesReturn {
    let nextIndex = 0;
    return {
      next: () => {
        if (nextIndex >= this.#length) {
          return {
            value: undefined,
            done: true,
          };
        }
        const result = {
          value: this[nextIndex],
          done: false,
        };

        nextIndex++;

        return result;
      },
    };
  }

  keys(): VlauesReturn {
    let nextIndex = 0;
    return {
      next: () => {
        if (nextIndex >= this.#length) {
          return {
            value: undefined,
            done: true,
          };
        }
        const result = {
          value: nextIndex,
          done: false,
        };

        nextIndex++;

        return result;
      },
    };
  }

  copy() {
    const newArray = new CustomArray<T>(this.#size);

    const iterator = this.entries();
    let result: ArrayIteratorResult;
    while (!(result = iterator.next()).done) {
      newArray.push(result.value[1] as T);
    }

    return newArray;
  }

  push(...items: T[]) {
    for (let i = 0; i < items.length; i++) {
      if (this.#size > 0 && this.#length >= this.#size) return;

      this[this.#length] = items[i];
      this.#length++;
    }
    return this;
  }

  unshift(...items: T[]) {
    const count = this.#length + items.length > this.#size ? items.length - (this.#size - this.#length) : items.length;
    for (let i = this.#length; i > count; i--) {
      this[i] = this[i - count];
    }
    for (let i = 0; i < count; i++) {
      if (this.#size > 0 && this.#length >= this.#size) return;
      this[this.#length] = items[i];
    }
    this.#length += count;
    return this;
  }

  entries(): EntriesReturn {
    let nextIndex = 0;
    return {
      next: () => {
        if (nextIndex >= this.#length) {
          return {
            value: undefined,
            done: true,
          };
        }
        const result = {
          value: [nextIndex, this[nextIndex]],
          done: false,
        };

        nextIndex++;

        return result;
      },
    };
  }

  forEach(callback: ForEachCallback<T>) {
    for (let i = 0, n = this.#length; i < n; ++i) {
      callback(this[i], i, this);
    }
  }
  async forEachAsync(callback: ForEachAsyncCallback<T>) {
    for (let i = 0, n = this.#length; i < n; ++i) {
      await callback(this[i], i, this);
    }
  }

  map(callback: MapCallback<T>) {
    const newArray = new CustomArray<unknown>();
    for (let i = 0, n = this.#length; i < n; ++i) {
      newArray.push(callback(this[i], i, this));
    }
    return newArray;
  }
  async mapAsync(callback: MapAsyncCallback<T>) {
    const newArray = new CustomArray<unknown>();
    for (let i = 0, n = this.#length; i < n; ++i) {
      newArray.push(await callback(this[i], i, this));
    }
    return newArray;
  }

  filter(callback: FilterCallback<T>) {
    const newArray = new CustomArray<unknown>();
    for (let i = 0, n = this.#length; i < n; ++i) {
      if (callback(this[i], i, this)) {
        newArray.push(this[i]);
      }
    }
    return newArray;
  }
  async filterAsync(callback: FilterAsyncCallback<T>) {
    const newArray = new CustomArray<unknown>();
    for (let i = 0, n = this.#length; i < n; ++i) {
      if (await callback(this[i], i, this)) {
        newArray.push(this[i]);
      }
    }
    return newArray;
  }

  sort(callback: SortCallback<T>) {
    const newArray = this.copy();

    let i = 0;
    while (i < newArray.length - 1) {
      const itemA = newArray[i];
      const itemB = newArray[i + 1];
      if (callback(itemA, itemB, i, newArray) > 0) {
        newArray[i] = itemB;
        newArray[i + 1] = itemA;
        if (i > 0) {
          i--;
          continue;
        }
      }
      i++;
    }

    return newArray;
  }

  some(callback: SomeCallback<T>) {
    for (let i = 0, n = this.#length; i < n; ++i) {
      if (callback(this[i], i, this)) return true;
    }
    return false;
  }

  every(callback: SomeCallback<T>) {
    for (let i = 0, n = this.#length; i < n; ++i) {
      if (!callback(this[i], i, this)) return false;
    }
    return true;
  }

  fill(value: T, start?: number, end?: number) {
    if (start === undefined || start < -this.#length) start = 0;
    if (start >= this.#length) return this;

    if (end === undefined || end >= this.#length) end = this.#length;
    if (end < -this.#length) end = 0;
    if (end < start) return this;

    for (let i = start; i < end; i++) {
      this[i] = value;
    }

    return this;
  }

  pop() {
    if (!this.#length) return null;

    const item: T = this[this.#length - 1];
    delete this[this.#length - 1];
    this.#length--;
    return item;
  }

  shift() {
    if (!this.#length) return null;

    const item: T = this[0];
    for (let i = 0; i < this.#length - 1; i++) {
      this[i] = this[i + 1];
    }
    delete this[this.#length - 1];
    this.#length--;
    return item;
  }

  reduce(callback: ReduceCallback<T>, initialValue: unknown) {
    let current = initialValue;
    for (let i = 0, n = this.#length; i < n; ++i) {
      current = callback(current, this[i], i, this);
    }
    return current;
  }

  toString() {
    this.#getEntries().toString();
  }

  width(index: number, value: T) {
    const newArray = this.copy();
    newArray[index] = value;
    return newArray;
  }

  lastIndexOf(value: T, fromIndex = this.#length) {
    if (fromIndex < 0) return -1;
    if (fromIndex > this.#length) fromIndex = this.#length;
    for (let i = fromIndex; i >= 0; i--) {
      if (this[i] === value) return i;
    }
    return -1;
  }

  indexOf(value: T, fromIndex = 0) {
    if (fromIndex > this.#length) return -1;
    if (fromIndex < 0) fromIndex = 0;
    for (let i = fromIndex; i < this.#length; i++) {
      if (this[i] === value) return i;
    }
    return -1;
  }

  join(separator: string) {
    let str = '';
    for (let i = 0; i < this.#length; i++) {
      str += this[i] + (i !== this.#length ? separator : '');
    }
    return str;
  }

  includes(value: T, fromIndex = 0) {
    if (fromIndex > this.#length) return false;
    if (fromIndex < 0) fromIndex = 0;
    for (let i = fromIndex; i < this.#length; i++) {
      if (this[i] === value) return true;
    }
    return false;
  }

  static from<T>(arr: any) {
    if (!arr || typeof arr !== 'object') return null;

    const newArray = new CustomArray<T>();

    if (arr.length) {
      for (let i = 0; i < arr.length; i++) {
        newArray.push(arr[i]);
      }
    }

    return newArray;
  }

  static of<T>(...items: any[]) {
    const newArray = new CustomArray<T>();
    newArray.push(...items);
    return newArray;
  }

  static isArray(obj: any) {
    if (!obj) return false;
    if (typeof obj !== 'object') return false;
    if (obj.length === undefined) return false;
    return true;
  }
}
