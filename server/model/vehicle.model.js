var mongoose = require('mongoose');
const dbInstance = require('../common/db') && mongoose;

var seatSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 120,
    required: true,
    unique: true,
  },
  layer: {
    type: Number,
    maxlength: 1,
  },
  type: {
    type: String,
    required: true,
    enum: ['BUS'],
  },
  location: {
    type: [Number],
  },
  price: {
    type: Number,
    required: true,
  },
  isBookable: {
    type: Boolean,
  },
  specialDetails: {
    type: [String],
  },
});

var vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 120,
    required: true,
    unique: true,
  },
  route: {
    type: String,
    required: true,
  },
  facility: {
    type: JSON,
  },
  rows: {
    type: Number,
    required: true,
  },
  colums: {
    type: Number,
    required: true,
  },
  layers: {
    type: Number,
    required: true,
  },
  seats: {
    type: [seatSchema],
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

var Vehicle = dbInstance.model('Vehicle', vehicleSchema);

export default Vehicle;
