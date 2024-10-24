// huffman.js
class Node {
    constructor(char, freq) {
      this.char = char;
      this.freq = freq;
      this.left = null;
      this.right = null;
    }
  }
  
  const buildHuffmanTree = (freqMap) => {
    const nodes = Object.entries(freqMap).map(([char, freq]) => new Node(char, freq));
    
    while (nodes.length > 1) {
      nodes.sort((a, b) => a.freq - b.freq);
      const left = nodes.shift();
      const right = nodes.shift();
      const merged = new Node(null, left.freq + right.freq);
      merged.left = left;
      merged.right = right;
      nodes.push(merged);
    }
  
    return nodes[0]; // Root of the Huffman tree
  };
  
  const generateCodes = (node, prefix = '', codeMap = {}) => {
    if (node.left) {
      generateCodes(node.left, prefix + '0', codeMap);
    }
    if (node.right) {
      generateCodes(node.right, prefix + '1', codeMap);
    }
    if (!node.left && !node.right) {
      codeMap[node.char] = prefix;
    }
    return codeMap;
  };
  
  export const huffmanEncode = (text) => {
    const freqMap = {};
    for (const char of text) {
      freqMap[char] = (freqMap[char] || 0) + 1;
    }
    
    const huffmanTree = buildHuffmanTree(freqMap);
    const codeMap = generateCodes(huffmanTree);
    
    return codeMap;
  };
  