require('dotenv').config();
let mongoose = require("mongoose");

let Person;

// using mongodb atlas cluster
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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

Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const document = new Person({
    name: "chewzzz",
    age: 20,
    favoriteFoods: ["sushi", "noodle", "mango"]
  })

  // pass to callback after saved
  document.save(function (err, data) {
    if (err)
      return done(err);
    done(null, data);
  })
  // done(null /*, data*/);
};

const createManyPeople = (arrayOfPeople, done) => {
  // done(null /*, data*/);
  Person.create(arrayOfPeople, function (err, data) {
    if (err)
      done(err);
    else
      done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err)
      done(err);
    else
      done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err)
      done(err);
    else
      done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err)
      done(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err)
      return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err)
        return console.log(err);
      done(null, updatedPerson);
    })

  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function (err, data) {
    if (err)
      console.log(err);
    done(null, data);
  });
};

const removeById = (personId, done) => {
  done(null /*, data*/);
  Person.findByIdAndDelete(personId, (err, data) => {
    if (err)
      return console.log(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

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


