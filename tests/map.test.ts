import CustomArray from '../src';

describe('map', () => {
  it('map indexes', () => {
    const customArray = new CustomArray(6, 4, 6, 7);

    const newArray = customArray.map((_item, index) => {
      return index;
    });

    expect(newArray.length).toBe(customArray.length);
  });
});
