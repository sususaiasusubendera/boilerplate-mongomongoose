require('dotenv').config();
const mongoose = require('mongoose');

/* 2. create a model */
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
});

let Person = mongoose.model("Person", personSchema);

/* 3. create and save a record of a model */
const createAndSavePerson = (done) => {
  var luffy = new Person({
    name: "Luffy",
    age: 20,
    favoriteFoods: ["Meat", "Fish"]
  });

  luffy.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

/* 4. create many records with model.create() */
// var arrayOfPeople = [
//   {name: "A", age: 21, favoriteFoods: ["Apple"]},
//   {name: "B", age: 22, favoriteFoods: ["Banana"]},
//   {name: "C", age: 23, favoriteFoods: ["Carrot"]}
// ];

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
};

/* 5. use model.find to search your database */
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

/* 6. use model.findOne() to return a single matching document from your database */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

/* 7. use model.findById() to search your database by _id */
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
};

/* 8. perform classic updates by running find, edit, then save */
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  /* .findById() method to find a person by _id with the parameter personId as search key */
  Person.findById({_id: personId}, (err, data) => {
    if (err) return console.error(err);

    /* .push() method to add "hamburger" to the list of the person's favoriteFoods */
    data.favoriteFoods.push(foodToAdd);

    /* find callback(?) - save() the updated Person */
    data.save((err, updatedData) => {
      if (err) return console.error(err);
      done(null, updatedData);
    });
  });
};

/* 9. perform new updates on a document using model.findeOneAndUPdate() */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

/* 10. delete one document using model.findByIdAndRemove */
const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

/* 11. delete many documents with model.remove */ 
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

/* chain search query helpers to narrow search results */
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
