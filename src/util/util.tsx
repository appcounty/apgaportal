export const generateRandomCode = () => {
  const generatedNumbers = new Set();

  function generateUniqueRandomNumber() {
    let randomNumber;

    do {
      randomNumber = Math.floor(10000000 + Math.random() * 90000000); // Generates a random number between 10000000 and 99999999
    } while (generatedNumbers.has(randomNumber));

    generatedNumbers.add(randomNumber);
    return randomNumber;
  }

  return generateUniqueRandomNumber();

}