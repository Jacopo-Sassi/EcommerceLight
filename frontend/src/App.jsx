import { useState, useEffect } from "react";
import "./index.css"; // Assicurati che questa riga ci sia!

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Errore:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <header>
        <h1>E-commerce Light</h1>
      </header>

      <main className="container">
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
                  <button className="btn-add">Aggiungi</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
