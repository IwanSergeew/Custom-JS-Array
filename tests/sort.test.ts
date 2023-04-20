import CustomArray from '../src';

describe('sort', () => {
  it('sort', () => {
    const customArray = new CustomArray<number>(3, 2, 1, 4);

    const newArray = customArray.sort((a, b) => {
      return a - b;
    });

    expect(newArray[0]).toBe(1);
    expect(newArray[1]).toBe(2);
    expect(newArray[2]).toBe(3);
    expect(newArray[3]).toBe(4);
  });
});
