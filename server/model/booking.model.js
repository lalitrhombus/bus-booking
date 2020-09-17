var mongoose = require('mongoose');
const dbInstance = require('../common/db') && mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var passengerSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 120,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    maxlength: 2,
  },
  contact: {
    type: Number,
    maxlength: 10,
  },
  gender: {
    type: String,
    maxlength: 1,
  },
  isSeniorCitizen: {
    type: Boolean,
  },
  specialDetails: {
    type: [String],
  },
});

var bookingSchema = new mongoose.Schema({
  id: {
    type: String,
    maxlength: 120,
    required: true,
    unique: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  vehicle: {
    type: mongoose.Schema.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  passengerDetails: {
    type: [passengerSchema],
    required: true,
  },
  seats: {
    type: [String],
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

bookingSchema.plugin(AutoIncrement, { inc_field: 'bookingId' });

var Booking = dbInstance.model('Booking', bookingSchema);

export default Booking;
