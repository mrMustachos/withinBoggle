const { defaultBoard, defaultSize, defaultDice } = require('./settings');

const randomNum = (val) => {
  return Math.floor(Math.random() * val);
};

const shuffle = (array) => {
  array = array.slice();
  for (let counter = array.length; counter > 0;) {
    const index = randomNum(counter);
    --counter;
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
};

const randomBoard = (size = defaultSize, dice = defaultDice) => {
  size *= size;
  dice = shuffle(dice);
  const board = [];
  for (let i = 0; i < size; ++i) {
    const die = dice[i];
    board[i] = die[randomNum(die.length)];
  }
  return board;
};

const generateBoardMatrix = (board) => {
  let result = [];
  for (let i = 0; i < defaultSize; i++) {
    result.push([]);
    for (let j = 0; j < defaultSize; j++) {
      result[i].push(board[defaultSize * i + j].toLowerCase());
    }
  }
  return result;
};

exports.init = (test = false) => {
  if (test) return generateBoardMatrix(defaultBoard);
  return generateBoardMatrix(randomBoard());
};