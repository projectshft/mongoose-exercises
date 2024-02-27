// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// var personSchema = new Schema({
// 	hair: String,
// 	eyes: String,
// 	weight: Number,
// 	height: Number,
// 	salary: Number,
// 	numKids: Number,
// 	kids: [],
// });

// var Person = mongoose.model('Person', personSchema);

// module.exports = Person;

// var bookSchema = new Schema({
//   title: String,
//   author: String,
//   pages: Number,
//   genres: [String],
//   rating: String
// });

//Find books with fewer than 500 but more than 200 pages
//======================================================
//======================================================
//======================================================
//======================================================
Book.find({ pages: { $lt: 500, $gt: 200 } })
	.then((books) => {
		console.log(books);
	})
	.catch((err) => {
		console.error(err);
	});

//Find books whose rating is less than 5, and sort by the author's name
//======================================================
//======================================================
//======================================================
//======================================================
Book.find({ rating: { $lt: 5 } })
	.sort({ author: 1 })
	.then((books) => {
		console.log(books);
	})
	.catch((err) => {
		console.error(err);
	});

//Find all the Fiction books, skip the first 2, and display only 3 of them
//======================================================
//======================================================
//======================================================
//======================================================
Book.find({ genres: 'Fiction' })
	.skip(2)
	.limit(3)
	.then((books) => {
		console.log(books);
	})
	.catch((err) => {
		console.error(err);
	});

//Find all the people who are tall (>180) AND rich (>30000)
//======================================================
//======================================================
//======================================================
//======================================================
Person.find({
	$or: [{ height: { $gt: 180 } }, { salary: { $gt: 30000 } }],
})
	.then((people) => {
		console.log(people);
	})
	.catch((err) => {
		console.error(err);
	});
//Find all the people who are tall OR rich
//======================================================
//======================================================
//======================================================
//======================================================
Person.find({
	$or: [{ height: { $gt: 180 } }, { salary: { $gt: 30000 } }],
}).then((people) => {});

//Find all the people who have grey hair or eyes, and are skinny (<70)
//======================================================
//======================================================
//======================================================
//======================================================
Person.find({
	$and: [
		{ $or: [{ hair: 'grey' }, { eyes: 'grey' }] },
		{ weight: { $lt: 70 } },
	],
})
	.then((people) => {
		console.log(people);
	})
	.catch((err) => {
		console.error(err);
	});

//Find people who have at least 1 kid with grey hair
//======================================================
//======================================================
//======================================================
//======================================================
Person.find({ 'kids.hair': 'grey' })
	.then((people) => {
		people.forEach((person) => {
			console.log('Person has kids:', person.kids);
		});
	})
	.catch((err) => {
		console.error(err);
	});

//Find all the people who have at least one overweight kid, and are overweight themselves (>100)
//======================================================
//======================================================
//======================================================
//======================================================
Person.find({
	weight: { $gt: 100 },
	'kids.weight': { $gt: 100 },
})
	.then((people) => {
		people.forEach((person) => {
			console.log('Person with overweight:', person);
		});
	})
	.catch((err) => {
		console.error(err);
	});
