import { useState, useEffect } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Errore caricamento ordini", err));
  }, []);

  return (
    <div className="admin-container">
      <h2>📦 Gestione Ordini Ricevuti</h2>
      {orders.length === 0 ? (
        <p>Nessun ordine ricevuto finora.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID Ordine</th>
              <th>Cliente</th>
              <th>Prodotti</th>
              <th>Totale</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.customerName}</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item-detail">
                      {item.productId?.name || "Prodotto eliminato"} (x
                      {item.quantity})
                    </div>
                  ))}
                </td>
                <td className="order-total-cell">
                  {order.totalAmount.toFixed(2)}€
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
