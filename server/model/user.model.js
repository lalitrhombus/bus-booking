var mongoose = require('mongoose');
const dbInstance = require('../common/db') && mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var userSchema = new mongoose.Schema({
  userName: {
    type: String,
    maxlength: 120,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    maxlength: 120,
    required: true,
  },
  email: {
    type: String,
    maxlength: 120,
    required: true,
  },
  contactNumber: {
    type: Number,
    maxlength: 10,
    required: true,
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 40,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
userSchema.plugin(AutoIncrement, { id: 'userId', inc_field: 'id' });

var User = dbInstance.model('User', userSchema);

export default User;
