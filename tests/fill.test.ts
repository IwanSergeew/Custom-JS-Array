import CustomArray from '../src';

describe('fill', () => {
  it('fill', () => {
    const customArray = new CustomArray<number>(5);

    expect(customArray[0]).toBe(undefined);

    customArray.fill(1);

    expect(customArray[0]).toBe(1);
    expect(customArray[2]).toBe(1);
  });
});
