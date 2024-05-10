/**
 * Shuffle array code/concept taken from
 * https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
 */
export const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    //  Swap it with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
