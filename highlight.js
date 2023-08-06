/**
 * Strips the prefix from the keys of the given key-value pairs
 * @param {string} htmlContent - HTML content which needs to be highlighted 
 * @param {string} plainText - This plain text is extracted from htmlContent
 * @param {array} plainTextPositions - Array of Objects with start and end positions of words in plainText (Not the positions in HTML)
 * @returns {string} Using the positions in plainText, find the appropriate positions in htmlContent, highlight the content and return it
 */
function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
    let result = htmlContent;//making a copy of htmlContent to modify
    let offset = 0;//keeps the index from where the next searching should start
    for (let i = 0; i < plainTextPositions.length; i++) { //iterating through the plainText positions
        let start = plainTextPositions[i].start;
        let end = plainTextPositions[i].end;
        if (start >= end || start < 0 || start > plainText.length || end > plainText.length) {//various edge cases 
            continue;
        }
        let textToHighlight = plainText.slice(start, end);//finding the word that will be highlighted
        let indexInHtml = result.indexOf(textToHighlight, offset);//finding the occurence of the word after the offset
        let minDistance = Infinity;
        let closestIndex = -1;
        //next while loop finds out the compares the index of the word to be highlighted in htmlContent with the index of the word in plainText that is given in the plainTextPosition and the word with the minimum distance will be the most approximate location of the word that will be highlighted in the result
        while (indexInHtml !== -1) {
            let distance = Math.abs(indexInHtml - start);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = indexInHtml;
            }
            indexInHtml = result.indexOf(textToHighlight, indexInHtml + 1);
        }
        if (closestIndex !== -1) {
            result =
                result.slice(0, closestIndex) +
                "<mark>" +
                textToHighlight +
                "</mark>" +
                result.slice(closestIndex + textToHighlight.length);//adding the mark before and after the highlited text
            offset = closestIndex + textToHighlight.length + 13;//settig offset after the highlighted text and also the 13 characters of <mark></mark>
        }
    }
    return result;
}

module.exports = highlightHTMLContent;

