function createAbbreviations(input) {
    return input.split(' ').map(word => {
        if (word.length > 3) {
            return word[0] + (word.length - 2) + word[word.length - 1];
        }
        return word;
    }).join(' ');
}

// Example usage:
const input = "Every Developer likes to make Nodejs and Reactjs";
const result = createAbbreviations(input);
console.log(result);
