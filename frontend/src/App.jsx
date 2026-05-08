import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [notification, setNotification] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch {
        showNotification("❌ Errore nel caricamento prodotti");
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    showNotification(`✅ ${product.name} aggiunto!`);
  };

  const totalCost = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    if (cart.length === 0) return showNotification("⚠️ Il carrello è vuoto!");
    if (!customerName.trim())
      return showNotification("⚠️ Inserisci il tuo nome!");

    setIsSubmitting(true);

    const orderData = {
      customerName: customerName,
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      totalAmount: totalCost, // Usiamo il totale calcolato
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        showNotification("🎉 Ordine completato!");
        setCart([]);
        setCustomerName("");
      } else {
        showNotification("❌ Errore server.");
      }
    } catch {
      showNotification("❌ Errore connessione.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {notification && <div className="notification-toast">{notification}</div>}

      <header>
        <h1>E-commerce Light 🥉</h1>
      </header>

      <main className="container main-layout">
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-desc">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">{product.price}€</span>

                  <button
                    className="btn-add"
                    onClick={() => addToCart(product)}
                  >
                    Aggiungi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-sidebar">
          <h2>Il tuo Carrello</h2>

          <div className="input-group">
            <label>Il tuo Nome:</label>
            <input
              type="text"
              placeholder="Inserisci nome..."
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={!customerName && cart.length > 0 ? "input-error" : ""}
            />
          </div>

          {cart.length === 0 ? (
            <p id="alert-empty-cart">Carrello vuoto</p>
          ) : (
            <>
              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item._id} className="cart-item">
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>{(item.price * item.quantity).toFixed(2)}€</span>
                  </li>
                ))}
              </ul>

              <div className="cart-total">
                <strong>Totale: {totalCost.toFixed(2)}€</strong>
              </div>
              <button
                className="btn-checkout"
                onClick={handleCheckout}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Invio..." : "Conferma Ordine"}
              </button>
            </>
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;
