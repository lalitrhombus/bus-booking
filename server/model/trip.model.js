var mongoose = require('mongoose');
const dbInstance = require('../common/db') && mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
import { TRIP_STATUS } from '../common/config';

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
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: [
      TRIP_STATUS.CREATED,
      TRIP_STATUS.BOOKING_START,
      TRIP_STATUS.BOOKING_CLOSED,
      TRIP_STATUS.TRIP_START,
      TRIP_STATUS.TRIP_COMPLETED,
      TRIP_STATUS.TRIP_BILLED,
      TRIP_STATUS.CLOSED,
      TRIP_STATUS.TERMINATED,
    ],
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

tripSchema.plugin(AutoIncrement, { id: 'tripId', inc_field: 'id' });
var Trip = dbInstance.model('Trip', tripSchema);

export default Trip;
