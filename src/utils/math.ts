export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateOptions = (correct: number, maxRange: number) => {
  const options = new Set<number>();
  options.add(correct);
  
  while (options.size < 4) {
    let wrong = getRandomInt(Math.max(0, correct - 10), Math.min(maxRange, correct + 10));
    if (wrong !== correct && wrong >= 0) {
      options.add(wrong);
    }
  }
  
  return Array.from(options).sort(() => Math.random() - 0.5);
};

export const generateAddQuestion = (max: number) => {
  const a = getRandomInt(1, max);
  const b = getRandomInt(1, max);
  const answer = a + b;
  return {
    text: `${a} + ${b} = ?`,
    answer,
    options: generateOptions(answer, max * 2)
  };
};

export const generateSubQuestion = (max: number) => {
  const a = getRandomInt(1, max);
  const b = getRandomInt(0, a); // Ensure non-negative result
  const answer = a - b;
  return {
    text: `${a} - ${b} = ?`,
    answer,
    options: generateOptions(answer, max)
  };
};

export const generateMulQuestion = (max: number) => {
  const a = getRandomInt(1, max);
  const b = getRandomInt(1, max);
  const answer = a * b;
  return {
    text: `${a} × ${b} = ?`,
    answer,
    options: generateOptions(answer, max * max)
  };
};
