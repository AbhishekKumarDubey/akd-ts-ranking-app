import Books from './config/book_list';
import { CommonEntityTypes } from './models/books.infc';

const ranking = (Books: string[]) => {
  const outputBookList: Array<CommonEntityTypes.IInvalidResponseObject> = [];

  let bookDetails: string[];
  for (let i = 1; i < Books.length; i++) {
    bookDetails = Books[i].split(',');

    // Validate regular expression
    const validRegex = new RegExp(/^\d{10}$/);
    if (!validRegex.test(bookDetails[0]) && !bookDetails[3].endsWith('X')) {
      let invalidISBNs =
        outputBookList.filter(b => b.publisherName === bookDetails[3]).length +
        1;
      outputBookList.push({
        publisherName: bookDetails[3],
        invalidISBNs
      });
      continue;
    }

    // Validate specific Conditions
    let sum: number = 0;
    const arrWord = bookDetails[0].split('');
    for (let i = 0; i < arrWord.length - 1; i++) {
      sum += +arrWord[i] * (i + 1);
    }

    if (arrWord[9] === 'X') {
      sum += 10 * 10;
    } else {
      sum += +arrWord[9] * 10;
    }

    if (sum % 11 !== 0) {
      let index = outputBookList.findIndex(
        elem => elem.publisherName === bookDetails[3]
      );
      if (index !== -1) {
        outputBookList[index] = {
          publisherName: bookDetails[3],
          invalidISBNs: outputBookList[index].invalidISBNs + 1
        };
      } else {
        outputBookList.push({
          publisherName: bookDetails[3],
          invalidISBNs: 1
        });
      }
    }
  }

  // Sort data based on invalid count
  outputBookList.sort(
    (a, b) =>
      b.invalidISBNs - a.invalidISBNs ||
      a.publisherName.localeCompare(b.publisherName)
  );

  console.log('OUTPUT>>', outputBookList);
  return outputBookList;
};

ranking(Books);
