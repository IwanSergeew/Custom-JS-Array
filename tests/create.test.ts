import CustomArray from '../src';

describe('create', () => {
  it('new with [numbers] array', () => {
    const customArray = new CustomArray(6, 4, 6, 7);

    expect(customArray.length).toBe(4);
  });

  it('new with [number | string | null] array', () => {
    const customArray = new CustomArray(5, '3444', null);

    expect(customArray.length).toBe(3);
  });

  it('new with size', () => {
    const customArray = new CustomArray(5);

    expect(customArray.length).toBe(5);
  });

  it('new from [numbers]', () => {
    const customArray = CustomArray.from<number>(new CustomArray(5, 3, 4, 5));

    expect(customArray?.length).toBe(4);
  });

  it('new from non object', () => {
    const customArray = CustomArray.from<number>(null);

    expect(customArray).toBe(null);
  });

  it('new of CustomArray', () => {
    const customArray = CustomArray.of<number>(0, 1, 2, 3, 4);

    expect(customArray.length).toBe(5);
  });
});
