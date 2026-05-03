const mongoose = require("mongoose");
const Product = require("./models/Product"); // Importiamo il modello che abbiamo creato
require("dotenv").config();

const products = [
  {
    name: "Smartphone Pro",
    description: "Display OLED, 128GB, Fotocamera 48MP",
    price: 799,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    category: "Elettronica",
  },
  {
    name: "Cuffie Wireless",
    description: "Cancellazione attiva del rumore, 30 ore di batteria",
    price: 199,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Accessori",
  },
  {
    name: "Laptop Ultra",
    description: "Processore M2, 16GB RAM, 512GB SSD",
    price: 1299,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    category: "Computer",
  },
];

const seedDB = async () => {
  try {
    // Ci connettiamo al DB
    await mongoose.connect(process.env.MONGO_URI);

    // Puliamo il database (opzionale, evita duplicati ogni volta che lanci lo script)
    await Product.deleteMany({});

    // Inseriamo i nuovi prodotti
    await Product.insertMany(products);

    console.log("🌱 Database popolato con successo!");
    mongoose.connection.close(); // Chiudiamo la connessione
  } catch (err) {
    console.error("❌ Errore durante il seeding:", err);
  }
};

seedDB();
