var mongoose = require('mongoose');
const dbInstance = require('../common/db') && mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var passengerSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 120,
    required: true,
  },
  age: {
    type: Number,
    maxlength: 2,
  },
  contactNumber: {
    type: Number,
    maxlength: 10,
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'U'],
  },
  specialDetails: {
    type: [Object],
  },
});

var bookingSchema = new mongoose.Schema({
  bookingDate: {
    type: Date,
    required: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  trip: {
    type: mongoose.Schema.ObjectId,
    ref: 'Trip',
    required: true,
  },
  status: {
    type: String,
    enum: ['CONFIRMED', 'FAILED'],
    required: true,
  },
  details: {
    type: String,
    required: false,
  },
  passengerDetails: {
    type: [passengerSchema],
    required: true,
  },
  seats: {
    type: [Number],
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

bookingSchema.plugin(AutoIncrement, { id: 'bookingId', inc_field: 'id' });
passengerSchema.plugin(AutoIncrement, { id: 'passengerId', inc_field: 'id' });

var Booking = dbInstance.model('Booking', bookingSchema);

export default Booking;
