import CustomArray from './CustomArray';

export type ArrayDataObject<T> = { [n: number]: T };

export type ArrayIteratorResult = {
  value: any;
  done: boolean;
};

export type EntriesReturn = { next: () => ArrayIteratorResult };
export type VlauesReturn = { next: () => ArrayIteratorResult };

export type ForEachCallback<T> = (item: T, index: number, array: CustomArray<T>) => void;
export type ForEachAsyncCallback<T> = (item: T, index: number, array: CustomArray<T>) => Promise<void>;

export type MapCallback<T> = (item: T, index: number, array: CustomArray<T>) => any;
export type MapAsyncCallback<T> = (item: T, index: number, array: CustomArray<T>) => Promise<any>;

export type FilterCallback<T> = (item: T, index: number, array: CustomArray<T>) => boolean;
export type FilterAsyncCallback<T> = (item: T, index: number, array: CustomArray<T>) => Promise<boolean>;

export type SortCallback<T> = (a: T, b: T, index: number, array: CustomArray<T>) => number;

export type SomeCallback<T> = (item: T, index: number, array: CustomArray<T>) => boolean;

export type ReduceCallback<T> = (prev: any, item: T, index: number, array: CustomArray<T>) => unknown;
