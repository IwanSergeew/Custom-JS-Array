import CustomArray from '../src';

describe('entries', () => {
  it('entries', () => {
    const customArray = new CustomArray<number>(3, 2);

    const iterator = customArray.entries();

    expect(iterator.next()).toStrictEqual({
      value: [0, 3],
      done: false,
    });

    expect(iterator.next()).toStrictEqual({
      value: [1, 2],
      done: false,
    });

    expect(iterator.next()).toStrictEqual({
      value: undefined,
      done: true,
    });
  });
});
