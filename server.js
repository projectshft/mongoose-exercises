/*=====================================================
Our Setup -
we are going to send requests to another API
so we need a bit more than usual!
=======================================================*/
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const request = require('request');
const mongoose = require('mongoose');
const Book = require('./models/BookModel');
const Person = require('./models/PersonModel');

mongoose.connect('mongodb://localhost/mongoose-exercises');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*=====================================================
Create books Collection
=======================================================*/
const isbns = [
	9780156012195, 9780743273565, 9780435905484, 9780140275360, 9780756404741,
	9780756407919, 9780140177398, 9780316769488, 9780062225672, 9780143130154,
	9780307455925, 9781501143519,
];

const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';

const loadFromAPI = (apiURL) => {
	request(apiURL, function (error, response, body) {
		const result = JSON.parse(body);

		if (result.totalItems && !error && response.statusCode == 200) {
			const resBook = JSON.parse(body).items[0].volumeInfo;

			const book = new Book({
				title: resBook.title,
				author: resBook.authors ? resBook.authors[0] : null,
				pages: resBook.pageCount,
				genres: resBook.categories || ['Other'],
				rating: resBook.averageRating || 5,
			});

			//Only save if the book doesn't exist yet
			Book.findOne({ title: book.title }).then((foundBook) => {
				if (!foundBook) {
					book.save();
				}
			});
		}
	});
};

isbns.forEach((i) => {
	const apiURL = url + i;
	/*=====================================================
  the first time you run your code, uncomment the function below.
  for subsequent runs, re-comment it so that it runs only once!
  that said, there is a fail-safe to avoid duplicates below
  =======================================================*/
	loadFromAPI(apiURL);
});

/*=====================================================
Create People Collection
=======================================================*/
const colors = ['brown', 'black', 'red', 'yellow', 'green', 'grey'];

const getColor = () => {
	return colors[Math.floor(Math.random() * colors.length)];
};

const getWeight = () => getRandIntBetween(50, 120);

const getHeight = () => getRandIntBetween(120, 230);

const getSalary = () => getRandIntBetween(20000, 50000);

const getNumKids = () => Math.floor(Math.random() * 3);

const getRandIntBetween = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const getKids = (numKids) => {
	let kids = [];
	for (let i = 0; i < numKids; i++) {
		kids.push({
			hair: getColor(),
			eyes: getColor(),
			weight: getWeight(),
			height: getHeight(),
		});
	}
	return kids;
};

/*=====================================================
the below code always makes sure
you don't have over 100 people and
adds new people and their kids until you do have 100

try to understand how this code works
could you write it differently?
=======================================================*/

// the below two loops could be changed to a simple:
// for (var i = count; i < 100; i++) {}
Person.countDocuments({})
	.then((count) => {
		if (count < 100) {
			let promises = [];
			for (let i = 0; i < 100 - count; i++) {
				let numKids = getNumKids();
				let p = new Person({
					hair: getColor(),
					eyes: getColor(),
					weight: getWeight(),
					height: getHeight(),
					salary: getSalary(),
					numKids: numKids,
					kids: getKids(numKids),
				});
				promises.push(p.save());
			}
			return Promise.all(promises);
		}
	})
	.then(() => console.log('All people saved.'))
	.catch((err) => console.error('Error during saving people:', err));

/*=====================================================
Start the server:
=======================================================*/

app.listen(3000, () => {
	console.log('Server up and running on port 3000');
});

/*=====================================================
Exercises - now that your databases are full
and your server is running do the following:
=======================================================*/

/*Books
----------------------*/
//1. Find books with fewer than 500 but more than 200 pages

//2. Find books whose rating is less than 5, and sort by the author's name

//3. Find all the Fiction books, skip the first 2, and display only 3 of them

/*People
----------------------*/
//1. Find all the people who are tall (>180) AND rich (>30000)

//2. Find all the people who are tall (>180) OR rich (>30000)

//3. Find all the people who have grey hair or eyes, and who's weight (<70)

//4. Find people who have at least 1 kid with grey hair

//5. Find all the people who have at least one kid who's weight is >100 and themselves' weight is >100
