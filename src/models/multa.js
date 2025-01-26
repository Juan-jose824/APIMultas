const mongoose = require('mongoose');

const MultaSchema = new mongoose.Schema({
  cantidad: { type: String, required: true },  // Ajusta el tipo y los requerimientos de los campos
  torre: { type: String, required: true },
  departamento: { type: String, required: true },
  comentarios: { type: String, required: true },  // Ajusta este campo según lo necesitas
}, {
  timestamps: true,  // Mantener los campos de timestamps si lo necesitas
});

module.exports = mongoose.model('Multa', MultaSchema);
