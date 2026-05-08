import { useState, useEffect } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // Funzione per recuperare gli ordini (usiamo .then come preferisci)
  const fetchOrders = () => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.error("Errore nel recupero ordini:", err);
      });
  };

  // UseEffect con lo stile precedente
  useEffect(() => {
    fetchOrders();
  }, []);

  // Funzione per aggiornare lo stato (PATCH)
  const updateStatus = (id) => {
    fetch(`http://localhost:5000/api/orders/${id}`, {
      method: "PATCH",
    })
      .then((res) => {
        if (res.ok) {
          fetchOrders(); // Ricarichiamo la lista dopo l'aggiornamento
        }
      })
      .catch((err) => console.error("Errore aggiornamento:", err));
  };

  return (
    <div className="admin-container container">
      <h2>📦 Pannello Gestione Ordini</h2>

      {orders.length === 0 ? (
        <p>Nessun ordine presente.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID Ordine</th>
              <th>Cliente</th>
              <th>Prodotti</th>
              <th>Totale</th>
              <th>Data</th>
              <th>Stato</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                {/* 1. ID Ordine */}
                <td>#{order._id}</td>

                {/* 2. Cliente */}
                <td>
                  <strong>{order.customerName}</strong>
                </td>

                {/* 3. Prodotti */}
                <td>
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item-detail">
                      {item.productId?.name || "Prodotto rimosso"} (x
                      {item.quantity})
                    </div>
                  ))}
                </td>

                {/* 4. Totale */}
                <td className="order-total-cell">
                  {order.totalAmount?.toFixed(2)}€
                </td>

                {/* 5. Data */}
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                {/* 6. Stato */}
                <td>
                  <span
                    className={`status-badge ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* 7. Azioni */}
                <td>
                  {order.status === "Pending" && (
                    <button
                      className="btn-ship"
                      onClick={() => updateStatus(order._id)}
                    >
                      Segna come Spedito
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
