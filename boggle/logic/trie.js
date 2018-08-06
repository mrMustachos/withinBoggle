module.exports = (() => {
  const trie = {};

  return {
    get() {
      return trie;
    },

    add(word) {
      if(word == null || word === '') return;
      let currentNode = trie;
      word.toLowerCase().split('').forEach((letter, index) => {
        if(!currentNode[letter]) {
          currentNode[letter] = {};
        }
        // reached the end of the word?
        if(index === word.length - 1) {
          currentNode[letter].$ = 1;
        } else {
          currentNode = currentNode[letter];
        }
      });
    },

    containsWord(word) {
    	if(word == null || !word) return false;
      let currentNode = trie;
      return word.toLowerCase().split('').every((letter, index) => {
        if(!currentNode[letter]) return false;
        currentNode = currentNode[letter];
        if(index === word.length - 1) return currentNode.$ === 1;
      	return letter;
      });
    },

    isPartWord(prefix) {
      let currentNode = trie;
      return prefix.split('').every(letter => {
        if(!currentNode[letter]) return false;
        currentNode = currentNode[letter];
        return true;
      });
    }
  }
})();