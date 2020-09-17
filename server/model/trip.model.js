var mongoose = require('mongoose');
const dbInstance = require('../common/db') && mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var tripSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  driverDetails: {
    type: JSON,
    required: true,
  },
  vehicle: {
    type: mongoose.Schema.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  bookedSeats: {
    type: Array,
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
tripSchema.plugin(AutoIncrement, { inc_field: 'tripId' });
var Trip = dbInstance.model('Trip', tripSchema);

export default Trip;
