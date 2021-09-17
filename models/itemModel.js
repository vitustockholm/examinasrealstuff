import mongoose from 'mongoose';
const { Schema } = mongoose;

const itemSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String, //pagal pareikalavima
    required: true,
  },
  age: {
    type: Number, //pagal pareikalavima
    required: true,
  },
  email: {
    type: String, //pagal pareikalavima
    required: true,
  },
  password: {
    type: String, //pagal pareikalavima
    required: true,
  },
});

const Item = mongoose.model('item', itemSchema);
export default Item;
