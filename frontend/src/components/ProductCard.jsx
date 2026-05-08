// Questo componente riceve il prodotto e la funzione per aggiungerlo tramite le "props"
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{product.price}€</span>
          <button className="btn-add" onClick={() => onAddToCart(product)}>
            Aggiungi
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
