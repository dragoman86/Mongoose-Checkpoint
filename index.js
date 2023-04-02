const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// create a new person using the Person model
const Person = require('./models/person')

const newPerson = new Person({
  name: 'Walid',
  age: 36,
  favoriteFoods: ['Degla', 'Brik', 'Chorba']
})
newPerson.save()
  .then(person => {
    console.log(person.name + ' saved to database.');
  })
  .catch(err => {
    console.error(err);
  });

//Create several people with Model.create(), using the function argument arrayOfPeople.
const arrayOfPeople = [
  { name: 'Safa', age: 25, favoriteFoods: ['Sushi', 'Sandwich'] },
  { name: 'Malek', age: 18, favoriteFoods: ['Pizza', 'Tacos'] },
  { name: 'Hamza', age: 30, favoriteFoods: ['Steak', 'Salad'] }
];

Person.create(arrayOfPeople)
  .then(function(people) {
    console.log(people.length + ' people saved to database.');
  })
  .catch(function(err) {
    console.error(err);
  });

//Find all the people having a given name, using Model.find()
const nameToSearch = 'Walid';
Person.find({ name: nameToSearch })
  .then(function(people) {
      console.log('Found ' + people.length + ' people with the name ' + nameToSearch);
      console.log(people);
  })
  .catch(function(err) {
      console.error(err);
  });

//Use model.findOne() to Return a Single Matching Document
const oneNameToSearch = 'Safa';

Person.findOne({ name: oneNameToSearch })
  .then(function(person) {
    if (person) {
      console.log('Found person with the name ' + oneNameToSearch + ':');
      console.log(person);
    } else {
      console.log('Could not find person with the name ' + oneNameToSearch);
    }
  })
  .catch(function(err) {
    console.error(err);
  });

//Use model.findById() to Search Your Database By _id
const idToSearch = '642865841ed16334d20e3f4c';

Person.findById(idToSearch)
  .then(function(person) {
    if (person) {
      console.log('Found person with ID ' + idToSearch + ':');
      console.log(person);
    } else {
      console.log('Could not find person with ID ' + idToSearch);
    }
  })
  .catch(function(err) {
    console.error(err);
  });

//perform a classic update on a Person object by finding 
//the person by their _id and adding "hamburger" to their list of favoriteFoods

const personId = '642865841ed16334d20e3f4c'

Person.findById(personId)
  .then((person) => {
    if (!person) {
      console.log('Person not found');
    } else {
      person.favoriteFoods.push('hamburger'); // add "hamburger" to the list of favoriteFoods
      return person.save(); // return a Promise to save the updated object
    }
  })
  .then((updatedPerson) => {
    console.log(updatedPerson);
  })
  .catch((err) => {
    console.error(err);
  });

//Perform New Updates on a Document Using model.findOneAndUpdate()
const personName = 'Hamza';

Person.findOneAndUpdate(
  { name: personName },
  { age: 20 },
  { new: true } // return the updated document
)
  .then((updatedPerson) => {
    if (!updatedPerson) {
      console.log('Person not found');
    } else {
      console.log(updatedPerson);
    }
  })
  .catch((err) => {
    console.error(err);
  });

//Delete One Document Using model.findByIdAndRemove
const userId = '642866f28a8f61572af938ae';

Person.findByIdAndRemove(userId)
  .then((deletedPerson) => {
    if (!deletedPerson) {
      console.log('Person not found');
    } else {
      console.log(deletedPerson);
    }
  })
  .catch((err) => {
    console.error(err);
  });

//MongoDB and Mongoose - Delete Many Documents with model.remove()
const query = { name: 'Hamza' };

Person.deleteMany(query)
  .then(result => {
    console.log(`${result.deletedCount} people deleted`);
  })
  .catch(err => {
    console.error(err);
  });

//Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: 'Brik' })
  .sort('name')
  .limit(2)
  .select('-age')
  .exec()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });



