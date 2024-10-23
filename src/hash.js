export const simpleHash = (input) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash += input.charCodeAt(i);
    }
    return hash.toString(16); // Convert to hexadecimal
  };
  