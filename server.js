import express from 'express';

import cors from 'cors';

import colors from 'colors';

import mongoose from 'mongoose';

import dotenv from 'dotenv';

import Item from './models/itemModel.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

// Middlewares
app.use(cors());
app.use(express.json());

// Connecting DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log(`Connected to MongoDB`.blue.underline.bold);
    // Starting server
    app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}...`.yellow.underline.bold)
    );
  });
//
// Routes
//
app.get('/', (req, res) => res.send('API is running...'));
//read route => all items from DATABASE => MongoDB
// app.get('/items', (req, res) => {
//   Item.find()
//     .then((items) => res.json(items))
//     .catch((err) => res.status(400).json('Error: ' + err));
// });
//
app.get('/items', async (req, res) => {
  let users = await Item.find({});

  let usersAndInfo = users.reduce((total, user) => {
    total.push({ ...user.toObject() });

    return total;
  }, []);

  res.json(usersAndInfo);
});

//create route
// app.post('/newitem', (req, res) => {
//   const newItem = new Item({
//     _id: mongoose.Types.ObjectId(),
//     name: req.body.name,
//     age: req.body.age,
//     email: req.body.email,
//     password: req.body.password,
//   });

//   newItem
//     .save()
//     .then((item) => console.log(item))
//     .catch((err) => res.status(400).json('Error ' + err));
// });
//
app.post('/items/signup', (req, res) => {
  let user = req.body;

  Item.find().then((result) => {
    const userExists = result.some(
      (userFromDB) => userFromDB.email === user.email
    );

    if (userExists) {
      res.json({
        registrationStatus: 'failed',
        message: 'User with given email already exists',
      });
    } else {
      const newUser = new Item(user);

      newUser.save().then((result) => {
        let { _id } = result;
        res.json({
          registrationStatus: 'success',
          userId: _id,
        });
      });
    }
  });
});

//delete route
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  Item.findByIdAndDelete({ _id: id }, (req, res, err) => {
    if (!err) {
      console.log('Item deleted');
    } else {
      console.log(err);
    }
  });
});

//update route
app.put('/put/:id', (req, res) => {
  const updatedItem = {
    title: req.body.title,
    description: req.body.description,
  };

  Item.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: updatedItem },
    (req, res, err) => {
      if (!err) {
        console.log('Item updated');
      } else {
        console.log(err);
      }
    }
  );
});
