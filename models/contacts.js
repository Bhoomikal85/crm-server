const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  action: { type: String, enum: ['created','updated','deleted'], required: true },
  by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  at: { type: Date, default: Date.now },
  note: { type: String }
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  company: { type: String, trim: true },
  status: { type: String, enum: ['Lead','Prospect','Customer'], default: 'Lead' },
  notes: { type: String, default: '' },
  activities: [activitySchema],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
