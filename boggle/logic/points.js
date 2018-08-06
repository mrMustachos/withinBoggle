const { coordsAdd2, coordsAdd3, coordsDouble } = require('./settings');

const getWordScore = (word) => {
  switch (word) {
    case 3:
      return 1;
      break;
    case 4:
      return 1;
      break;
    case 5:
      return 2;
      break;
    case 6:
      return 3;
      break;
    case 7:
      return 5;
      break;
    default:
      return 11;
      break;
  }
};

const pointsAdded = (coords, test) => {
  return coords.filter((point) => test[`${JSON.stringify(point)}`] === JSON.stringify(point));
};

const totalScore = ({ add2, add3, wordScore, isDouble }) => {
  const total = wordScore + add3 + add2;
  return isDouble ? (total * 2) : total;
};

exports.tallyPoints = (wordListObj) => {
  wordListObj = wordListObj.sort((a, b) => b.word.length - a.word.length);
  wordListObj.forEach((info) => {
    const { word, coords } = info;
    const wordScore = getWordScore(word.length);
    const add2 = pointsAdded(coords.word, coordsAdd2);
    const add3 = pointsAdded(coords.word, coordsAdd3);
    const isDouble = !!pointsAdded(coords.word, coordsDouble);

    info.coords.add3 = add3;
    info.coords.add2 = add2;
    info.points = {
      add2: add2.length * 2,
      add3: add3.length * 3,
      wordScore,
      isDouble,
    };
    info.totalScore = totalScore(info.points);
  });

  return wordListObj
};
