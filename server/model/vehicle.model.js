var mongoose = require('mongoose');
const dbInstance = require('../common/db') && mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var seatSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 120,
    required: true,
    unique: false,
  },
  layer: {
    type: Number,
    maxlength: 1,
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
    type: Object,
  },
});

var vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 120,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['BUS'],
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

vehicleSchema.plugin(AutoIncrement, { id: 'vehicleId', inc_field: 'id' });
seatSchema.plugin(AutoIncrement, { id: 'seatId', inc_field: 'id' });

var Vehicle = dbInstance.model('Vehicle', vehicleSchema);

export default Vehicle;
