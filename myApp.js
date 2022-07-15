require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: 'Rakoto',
    age: 18,
    favoriteFoods: ['mofo gay', 'ramanonaka'],
  });

  person.save(function (err, data) {
    if (err) return done(err)
    done(null, data)
  });
  // done(null /*, data*/);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,).then(data => done(null, data)).catch(err => done(err));
  // done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  }, function (err, data) {
    if (err) return done(err);
    done(null, data);
  })
  // done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: {$in: [food]}
  }, function (err, data) {
    if (err) don(err);
    done(null, data)
  })
  // done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return done(err);
    done(null, data);
  })
  // done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (_, findedPerson) {
    if (_) return done(_);
    findedPerson.favoriteFoods = [...findedPerson.favoriteFoods, foodToAdd];
    findedPerson.save(function (err, data) {
      if (err) return done(err);
      done(null, data);
    });
  });
  // done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });

  // done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    if (err) return done(err);
    done(null, data);
  })
  // done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, data) {
    if (err) return done(err);
    done(null, data);
  })
  // done(null /*, data*/);
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
