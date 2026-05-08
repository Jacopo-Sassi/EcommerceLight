// Importiamo le librerie necessarie
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware: permettono al server di leggere JSON e di comunicare con il frontend
app.use(cors());
app.use(express.json());

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connesso a MongoDB localmente"))
  .catch((err) => console.error("❌ Errore di connessione:", err));

// Rotta di prova per vedere se il server funziona
app.get("/", (req, res) => {
  res.send("Il server dell'e-commerce è attivo!");
});

const Product = require("./models/Product");

// --- ROTTE CRUD PER I PRODOTTI ---

// READ ALL (Ottieni tutti i prodotti)
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Errore nel recupero dei prodotti", error: err });
  }
});

// READ ONE (Ottieni un singolo prodotto tramite ID)
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Prodotto non trovato" });
    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Errore nel recupero del prodotto", error: err });
  }
});

// CREATE (Aggiungi un nuovo prodotto)
app.post("/api/products", async (req, res) => {
  // Creiamo una nuova istanza del modello con i dati che arrivano dal frontend (req.body)
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct); // 201 significa "Creato con successo"
  } catch (err) {
    res
      .status(400)
      .json({ message: "Errore durante il salvataggio", error: err });
  }
});

const Order = require("./models/Order");

// Rotta per creare un ordine (Checkout)
app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({
      message: "Errore durante il salvataggio dell'ordine",
      error: err,
    });
  }
});

// Recupera tutti gli ordini salvati
app.get("/api/orders", async (req, res) => {
  try {
    // .populate('items.productId') serve a trasformare l'ID del prodotto nei dati reali (nome, prezzo, ecc.)
    const orders = await Order.find().populate("items.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Errore nel recupero ordini", error: err });
  }
});

// Rotta per aggiornare lo stato dell'ordine
app.patch("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Cerchiamo l'ordine e cambiamo lo stato in 'Shipped'
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: "Shipped" },
      { new: true }, // Restituisce l'oggetto aggiornato
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Errore durante l'aggiornamento" });
  }
});

// UPDATE (Modifica un prodotto esistente)
app.put("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }, // Questo parametro serve a restituire il prodotto DOPO la modifica
    );
    res.json(updatedProduct);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Errore durante l'aggiornamento", error: err });
  }
});

// DELETE (Elimina un prodotto)
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Prodotto eliminato correttamente" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Errore durante l'eliminazione", error: err });
  }
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`🚀 Server in esecuzione sulla porta ${PORT}`);
});
