import CustomArray from '../src';

describe('forEach', () => {
  it('forEach', () => {
    const customArray = new CustomArray(6, 4, 6, 7);

    customArray.forEach((item, index, arr) => {
      expect(item).toStrictEqual(customArray[index]);
      expect(arr).toStrictEqual(customArray);
    });
  });

  it('forEach async', async () => {
    const customArray = new CustomArray(6, 4, 6, 7);

    let finished = false;
    await customArray
      .forEachAsync(async () => new Promise((resolve) => setTimeout(resolve, 1000)))
      .then(() => (finished = true));

    expect(finished).toBeTruthy();
  });
});
