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
    if (err) console.error(err);
    done(null, data);
  })
};

/* 6. use model.findOne() to return a single matching document from your database */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) console.error(err);
    done(null, data);
  })
};

/* 6. use model.findById() to search your database by _id */
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if (err) console.error(err);
    done(null, data);
  })
};

/* 6. perform classic updates by running find, edit, then save */
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({_id: personId}, (err, data) => {
    if (err) return console.error(err);

    data.favoriteFoods.push(foodToAdd);

    data.save((err, updatedData) => {
      if (err) console.error(err);
    done(null, updatedData);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
