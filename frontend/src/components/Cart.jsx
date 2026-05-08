function Cart({
  cart,
  customerName,
  setCustomerName,
  onCheckout,
  isSubmitting,
}) {
  const totalCost = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
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
        <p>Carrello vuoto</p>
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
            onClick={onCheckout}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Invio..." : "Conferma Ordine"}
          </button>
        </>
      )}
    </aside>
  );
}

export default Cart;
