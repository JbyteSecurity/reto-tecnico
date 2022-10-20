const mongoose = require('mongoose');
const PlanetasSchema = new mongoose.Schema({  
  clima:String,
  diametro:String,
  gravedad:String,
  nombre:String,
  periodo:String,
  poblacio:String,
  residentes:String,
  periodo_rotacion:String,
  superficie_agua:String,
  tierra:String,
  url:String
});
module.exports = mongoose.model('Note', PlanetasSchema);