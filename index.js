"use strict";
exports.__esModule = true;
var book_list_1 = require("./config/book_list");
var ranking = function (Books) {
    var outputBookList = [];
    var bookDetails;
    for (var i = 1; i < Books.length; i++) {
        bookDetails = Books[i].split(',');
        // Validate regular expression
        var validRegex = new RegExp(/^\d{10}$/);
        if (!validRegex.test(bookDetails[0]) && !bookDetails[3].endsWith('X')) {
            var invalidISBNs = outputBookList.filter(function (b) { return b.publisherName === bookDetails[3]; }).length +
                1;
            outputBookList.push({
                publisherName: bookDetails[3],
                invalidISBNs: invalidISBNs
            });
            continue;
        }
        // Validate specific Conditions
        var sum = 0;
        var arrWord = bookDetails[0].split('');
        for (var i_1 = 0; i_1 < arrWord.length - 1; i_1++) {
            sum += +arrWord[i_1] * (i_1 + 1);
        }
        if (arrWord[9] === 'X') {
            sum += 10 * 10;
        }
        else {
            sum += +arrWord[9] * 10;
        }
        if (sum % 11 !== 0) {
            var index = outputBookList.findIndex(function (elem) { return elem.publisherName === bookDetails[3]; });
            if (index !== -1) {
                outputBookList[index] = {
                    publisherName: bookDetails[3],
                    invalidISBNs: outputBookList[index].invalidISBNs + 1
                };
            }
            else {
                outputBookList.push({
                    publisherName: bookDetails[3],
                    invalidISBNs: 1
                });
            }
        }
    }
    // Sort data based on invalid count
    var compareFunc = function (a, b) {
        return b.invalidISBNs - a.invalidISBNs ||
            a.publisherName.localeCompare(b.publisherName);
    };
    outputBookList.sort(compareFunc);
    console.log('OUTPUT>>', outputBookList);
    return outputBookList;
};
ranking(book_list_1["default"]);
