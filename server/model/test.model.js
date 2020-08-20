var mongoose = require('mongoose');
const dbInstance = require('../common/db') && mongoose;
var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Album = dbInstance.model('Album', schema);
export default Album;
