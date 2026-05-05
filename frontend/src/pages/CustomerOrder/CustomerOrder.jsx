import { useState, useEffect } from "react";
import "./CustomerOrder.css";

function CustomerOrder() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/customer/orders")
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (customers.length === 0) return <p>No customers checked in yet today.</p>;

  return (
    <div className="customerorder-container">
      <h1>Customer Orders</h1>
      <table className="customerorder-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Time In</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, index) => (
            <tr key={index}>
              <td>{c.customer}</td>
              <td>{c.phone}</td>
              <td>{c.hour}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerOrder;