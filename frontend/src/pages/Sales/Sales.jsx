import { useState, useEffect } from "react";
import "./Sales.css";

function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/sales")
      .then(res => res.json())
      .then(data => {
        setSales(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="sales-container">
      <h1>Today's Sales</h1>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Hour</th>
            <th>Employees</th>
            <th>Service</th>
            <th>Card</th>
            <th>Cash</th>
            <th>Tip</th>
            <th>Discount</th>
            <th>Other</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((row, index) => (
            <tr key={index}>
              <td>{row.Hour}</td>
              <td>{row.employees.join(", ")}</td>
              <td>${row.Service.toFixed(2)}</td>
              <td>${row.Card.toFixed(2)}</td>
              <td>${row.Cash.toFixed(2)}</td>
              <td>${row.Tip.toFixed(2)}</td>
              <td>${row.Discount.toFixed(2)}</td>
              <td>${row.Other.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;