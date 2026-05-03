const mongoose = require("mongoose");

// Definiamo lo schema del prodotto
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // URL dell'immagine
  category: { type: String },
});

// Esportiamo il modello
module.exports = mongoose.model("Product", productSchema);
