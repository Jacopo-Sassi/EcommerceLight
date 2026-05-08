🛒 E-commerce Light

Un mini e-commerce full stack sviluppato con React + Express + MongoDB.


🚀 Features

Frontend (React)
Visualizzazione prodotti
Carrello dinamico
Calcolo totale automatico
Checkout con nome cliente
Notifiche UX realtime
Stato loading durante invio ordine

Navigazione tra:
🛍️ Shop
📦 Pannello Admin Ordini

Backend (Express + MongoDB)
CRUD completo prodotti
Creazione ordini
Recupero ordini con .populate()
Aggiornamento stato ordine
Eliminazione ordini

API REST semplice e leggibile
Admin Panel
Visualizzazione ordini
Stato ordine (Pending → Shipped)
Eliminazione ordine
Storico ordini

🧱 Stack Tecnologico
Tecnologia	Uso
React	    Frontend UI
Express.js	Backend API
MongoDB	    Database
Mongoose	ODM
Node.js	    Runtime
CSS Vanilla	Styling
Fetch API	Comunicazione client/server

📡 API Endpoints

Prodotti
Metodo	Endpoint	Descrizione
GET	/api/products	Recupera tutti i prodotti
GET	/api/products/:id	Recupera un prodotto
POST	/api/products	Crea prodotto
PUT	/api/products/:id	Modifica prodotto
DELETE	/api/products/:id	Elimina prodotto

Ordini
Metodo	Endpoint	Descrizione
GET	/api/orders	Recupera ordini
POST	/api/orders	Crea ordine
PATCH	/api/orders/:id	Aggiorna stato ordine
DELETE	/api/orders/:id	Elimina ordine


🧠 Concetti Tecnici Utilizzati
React Hooks (useState, useEffect)
Props drilling
Stato globale locale
CRUD REST API
Async/Await + .then()
MongoDB Relations con populate()
Gestione loading state
Validazioni frontend basilari
Pattern component-based

🛠️ Miglioramenti Futuri
Login Admin
JWT Authentication
Dashboard analytics
Gestione quantità nel carrello
Upload immagini prodotti
Stripe/PayPal integration
Ricerca prodotti
Filtri categorie
Deploy Docker
Test automatici