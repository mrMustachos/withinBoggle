const { minWordLength, cardinalDirection, diagonalDirection } = require('./settings');
const trie = require('./trie');
const { tallyPoints } = require('./points');
const board = require('./board');

let wordListObj = [];
let wordList = [];
const boardMatrix = board.init(true);

const inArray = (arr, item) => {
  return (arr.indexOf(item) !== -1);
};

const arrayMatch = (first, second) => {
  return first.some((item) => {
    return item.every((x, index) => {
      return x === second[index];
    });
  });
};

const noDuplicateLetters = (word) => {
  const arr = word.split('');
  let hash = {};
  for (let i = 0; i < arr.length; i++) {
    if (hash.hasOwnProperty(arr[i])) {
      return false;
    } else {
      hash[arr[i]] = true;
    }
  }
  return true;
};

const boggleTest = (word, minLength) => {
  return (
    word.length >= minLength
    && trie.containsWord(word)
    && !inArray(wordList, word)
    && noDuplicateLetters(word)
  );
};

const solveBoard = (currentWord, currentPosition, coords, usedPositions, move) => {
  const [row, col] = currentPosition;
  const positions_copy = usedPositions.slice();
  const coords_copy = coords.slice();
  coords_copy.push(currentPosition);

  if (boggleTest(currentWord, minWordLength)) {
    wordList.push(currentWord);
    wordListObj.push({
      word: currentWord,
      coords: {
        word: coords_copy,
      },
    });
    coords = [];
  }

  const adjacents = getAdjacentLetters(currentWord, currentPosition, usedPositions, move);
  move = !move;

  adjacents.forEach(adjacent => {
    positions_copy.push(currentPosition);
    const [x, y] = adjacent;
    const letter = boardMatrix[x][y];
    const word = currentWord + letter;
    solveBoard(word, adjacent, coords_copy, positions_copy, move);
  });
  return;
};

const getAdjacentLetters = (currentWord, position, usedPositions, move) => {
  const [row, col] = position;
  let _directions;

  const _cardinalDirection = cardinalDirection.slice(0);
  const _diagonalDirection = diagonalDirection.slice(0);
  if (move) {
    _directions = _cardinalDirection;
  } else {
    _directions = _diagonalDirection;
  }

  return _directions.reduce((acc, direction, idx) => {
    const [x, y] = direction;
    let rowSum = false;
    let colSum = false;
    if (!!boardMatrix[row + x] && !!boardMatrix[row + x][col + y]) {
      rowSum = row + x;
      colSum = col + y;
    }
    if (typeof rowSum === 'number' && typeof colSum === 'number') {
      let adjacent = [rowSum, colSum];
      let adjacentWord = currentWord + boardMatrix[rowSum][colSum];
      if (!arrayMatch(usedPositions, adjacent) && trie.isPartWord(adjacentWord)) {
        acc.push(adjacent);
      }
    }
    return acc;
  }, []);
};

module.exports = (() => {

  const getWordCount = () => wordList.length;
  const getTotalPoints = () => wordListObj.reduce((acc, { totalScore }) => acc + totalScore, 0);
  const getWordList = () => wordList;
  const returnObj = () => wordListObj;
  const returnBoardMatrix = () => boardMatrix;

  const returnBoardView = () => {
    let result = []
    let newRow = `+----+----+----+----+----+`;
    boardMatrix.forEach((row) => {
      let newBox = `|`;
      result.push(newRow);
      row.forEach((item) => {
        if (item.length !== 1) {
          newBox += ` ${item} |`;
        } else {
          newBox += `  ${item} |`;
        }
      });
      result.push(newBox);
    });
    result.push(`+----+----+----+----+----+`);
    return result;
  };

  const init = () => {
    boardMatrix.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        solveBoard(boardMatrix[rowIndex][colIndex], [rowIndex, colIndex], [], [], true);
      });
    });

    if (wordList.length) {
      wordListObj = tallyPoints(wordListObj);
      wordList = wordList.sort((a, b) => b.length - a.length);
    }

    return wordListObj;
  };

  return {
    init,
    getWordCount,
    getTotalPoints,
    getWordList,
    returnObj,
    returnBoardView,
    returnBoardMatrix,
  };
})();
