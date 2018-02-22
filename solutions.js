// var personSchema = new Schema({
// 	hair: String,
// 	eyes: String,
// 	weight: Number,
// 	height: Number,
// 	salary: Number,
// 	numKids: Number,
// 	kids: []
// });


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
Book.find(({pages:{"$lt":500, "$gt":200}}), (err, books) => {

});








//Find books whose rating is less than 5, and sort by the author's name
//======================================================
//======================================================
//======================================================
//======================================================
Book.find({rating:{"$lt":5}}).sort({author:-1}).exec((err, books) => {

});








//Find all the Fiction books, skip the first 2, and display only 3 of them
//======================================================
//======================================================
//======================================================
//======================================================
Book.find({genres:"Fiction"}).skip(2).limit(3).exec((err, books) => {

});








//Find all the people who are tall (>180) AND rich (>30000)
//======================================================
//======================================================
//======================================================
//======================================================
Person.find((	{ height:{"$gt":180},
  salary:{"$gt":30000}	}),
    (err, people) => {

});








//Find all the people who are tall OR rich
//======================================================
//======================================================
//======================================================
//======================================================
Person.find( { $or:[ {height:{"$gt":180}},
  {salary:{"$gt":30000}}]},
    (err,people) => {

});






//Find all the people who have grey hair or eyes, and are skinny (<70)
//======================================================
//======================================================
//======================================================
//======================================================
Person.find().and([
		{ $or: [{hair:"grey"}, {eyes:"grey"}] },
		{	weight:{"$lt": 70}	}
	]).exec((err, people) => {
		console.log(people);
});







//Find people who have at least 1 kid with grey hair
//======================================================
//======================================================
//======================================================
//======================================================
Person.find({kids:{$elemMatch:{hair:"grey"}}}).exec((err,people) => {

	//this is just to show you that this works
	for (p in people) {
		let person = people[p];
		console.log("Person", p,"has kids:\n",person.kids);
	}
});






//Find all the people who have at least one overweight kid, and are overweight themselves (>100)
//======================================================
//======================================================
//======================================================
//======================================================
Person.find().and([
		{weight: {"$gt":100}},
		{kids:{$elemMatch:{weight: {"$gt":100}}}}
	]).exec((err, people) => {
		//this is just to show you that this works
		for (p in people) {
			let person = people[p];
			console.log("\nPerson", p,"has weight", person.weight," and kids:\n",person.kids);
		}
});
