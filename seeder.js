import mongoose from 'mongoose';

import Item from './models/itemModel.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    let item = {
      _id: mongoose.Types.ObjectId(),
      name: 'John',
      age: 'Smith',
      email: 'john@email.com',
      password: 'mypassword123',
    };

    Item.insertMany(item);

    console.log('Data sended to MongoDB');
  });
