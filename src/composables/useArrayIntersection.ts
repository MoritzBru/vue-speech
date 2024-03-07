import type {
  ComputedRef,
} from 'vue';
import { computed } from 'vue';

import type { MaybeRefOrGetter } from '@vueuse/core';
import { toValue } from '@vueuse/core';

function defaultComparator<T>(value: T, othVal: T) {
  return value === othVal;
}

export function useArrayIntersection<T>(list: MaybeRefOrGetter<T[]>, values: MaybeRefOrGetter<T[]>, key?: keyof T): ComputedRef<T[]>;
export function useArrayIntersection<T>(list: MaybeRefOrGetter<T[]>, values: MaybeRefOrGetter<T[]>, compareFn?: (value: T, othVal: T) => boolean): ComputedRef<T[]>;

/**
 * Reactive get array intersection of two array
 * @returns - the intersection of two array
 * @param args
 */
export function useArrayIntersection<T>(...args: any[]): ComputedRef<T[]> {
  const list: MaybeRefOrGetter<T[]> = args[0];
  const values: MaybeRefOrGetter<T[]> = args[1];
  let compareFn = args[2] ?? defaultComparator;

  if (typeof compareFn === 'string') {
    const key = compareFn as keyof T;
    compareFn = (value: T, othVal: T) => value[key] === othVal[key];
  }

  return computed(() => toValue(list).filter((x) => toValue(values).findIndex((y) => compareFn(x, y)) >= 0));
}
