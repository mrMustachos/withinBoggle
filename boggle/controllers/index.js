const fs = require('fs');
const trie = require('../logic/trie');
const filePath = './dictionary/officialScrabbleWords_2015.txt';
const solver = require('../logic/solver');
const {
	getWordCount,
	getTotalPoints,
	getWordList,
	returnObj,
	returnBoardView,
	returnBoardMatrix } = solver;

exports.getFiles = (req, res, next) => {
	const readFile = new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});

	readFile.then((data) => {
			const clean = data.toString().replace(/[\r]+/g, '').split('\n');
			res.locals.clean = clean;
		  next();
		})
	.catch((err) => console.log(err));
};

exports.buildDictionary = (req, res, next) => {
	const clean = req.res.locals.clean;
	clean.forEach((word) => trie.add(word));
	next();
};

exports.buildBoard = (req, res) => {
	solver.init();
	const results = {
		viewBoard: returnBoardView(),
		wordCount: getWordCount(),
		totalPoints: getTotalPoints(),
		wordList: getWordList(),
		boardMatrix: returnBoardMatrix(),
		dataObj: returnObj(),
	}
	res.json(results);
};