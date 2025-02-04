const mongoose = require('mongoose');

const MultaSchema = new mongoose.Schema({
  coto: { type: String, required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, required: true },
  comentario: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Multa', MultaSchema);
