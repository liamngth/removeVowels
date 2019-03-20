const removeVowels = require('../RemoveVowels');

describe("Remove vowels", () => {
  it("should work", () => {
    expect(removeVowels('This website is for losers LOL!')).toBe('Ths wbst s fr lsrs LL!')
  })
});