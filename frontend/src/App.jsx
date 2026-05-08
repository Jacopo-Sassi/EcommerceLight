import { useState, useEffect } from "react";
import "./index.css";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import AdminOrders from "./components/AdminOrders";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [notification, setNotification] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [view, setView] = useState("admin");

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => showNotification("❌ Errore caricamento"));
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showNotification(`✅ ${product.name} aggiunto!`);
  };

  const handleCheckout = async () => {
    if (cart.length === 0 || !customerName.trim()) {
      return showNotification("⚠️ Controlla carrello e nome!");
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          items: cart.map((i) => ({ productId: i._id, quantity: i.quantity })),
          totalAmount: cart.reduce((acc, i) => acc + i.price * i.quantity, 0),
        }),
      });
      if (res.ok) {
        showNotification("🎉 Ordine completato!");
        setCart([]);
        setCustomerName("");
      }
    } catch {
      showNotification("❌ Errore connessione");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {notification && <div className="notification-toast">{notification}</div>}

      <header>
        <h1>E-commerce Light 🥉</h1>
        <nav className="nav-menu">
          <button
            onClick={() => setView("shop")}
            className={view === "shop" ? "active" : ""}
          >
            Negozio
          </button>
          <button
            onClick={() => setView("admin")}
            className={view === "admin" ? "active" : ""}
          >
            Ordini (Admin)
          </button>
        </nav>
      </header>

      <main className="container">
        {view === "shop" ? (
          <div className="main-layout">
            <div className="products-grid">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} onAddToCart={addToCart} />
              ))}
            </div>
            <Cart
              cart={cart}
              customerName={customerName}
              setCustomerName={setCustomerName}
              onCheckout={handleCheckout}
              isSubmitting={isSubmitting}
            />
          </div>
        ) : (
          <AdminOrders />
        )}
      </main>
    </div>
  );
}

export default App;
