const mongoose = require('mongoose');

const SerialSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  durationDays: { type: Number, required: false },
  expirationDate: { type: Date, required: false },
  used: { type: Boolean, required: false },
  usedDate: { type: Date, required: false }
});

const Serial = mongoose.model('Serial', SerialSchema);

module.exports = Serial;