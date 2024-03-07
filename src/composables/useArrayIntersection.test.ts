import { ref } from 'vue';
import {
  describe, expect, it,
} from 'vitest';
import { useArrayIntersection } from './useArrayIntersection';

describe('useArrayIntersection', () => {
  it('should be defined', () => {
    expect(useArrayIntersection).toBeDefined();
  });
  it('should return the intersection of two array', () => {
    const list1 = ref([
      1,
      2,
      3,
      4,
      5,
    ]);
    const list2 = ref([
      4,
      5,
      6,
    ]);

    const result = useArrayIntersection(list1, list2);
    expect(result.value).toEqual([
      4,
      5,
    ]);

    list2.value = [
      1,
      2,
      3,
    ];
    expect(result.value).toEqual([
      1,
      2,
      3,
    ]);

    list1.value = [
      4,
      5,
    ];
    expect(result.value).toEqual([]);
  });

  it('should return the intersection of two array with iteratee', () => {
    const list1 = ref([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ]);
    const list2 = ref([
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ]);

    const result = useArrayIntersection(list1, list2, (value, othVal) => value.id === othVal.id);
    expect(result.value).toEqual([
      { id: 4 },
      { id: 5 },
    ]);

    list2.value = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];
    expect(result.value).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);

    list1.value = [
      { id: 4 },
      { id: 5 },
    ];
    expect(result.value).toEqual([]);
  });

  it('should return the intersection of two array with key', () => {
    const list1 = ref([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ]);
    const list2 = ref([
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ]);

    const result = useArrayIntersection(list1, list2, 'id');
    expect(result.value).toEqual([
      { id: 4 },
      { id: 5 },
    ]);

    list2.value = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];
    expect(result.value).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);

    list1.value = [
      { id: 4 },
      { id: 5 },
    ];
    expect(result.value).toEqual([]);
  });
});
