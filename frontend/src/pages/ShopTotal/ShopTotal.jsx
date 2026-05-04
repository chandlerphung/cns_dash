import { useState, useEffect } from "react";
import "./ShopTotal.css";

function ShopTotal() {
  const [totals, setTotals] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/shop/total")
      .then(res => res.json())
      .then(data => {
        setTotals(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="shoptotal-container">
      <h1>Shop Total</h1>
      <div className="shoptotal-grid">
        <div className="total-card">
          <span className="total-label">Service</span>
          <span className="total-value">${totals.Service.toFixed(2)}</span>
        </div>
        <div className="total-card">
          <span className="total-label">Tip</span>
          <span className="total-value">${totals.Tip.toFixed(2)}</span>
        </div>
        <div className="total-card">
          <span className="total-label">Card</span>
          <span className="total-value">${totals.Card.toFixed(2)}</span>
        </div>
        <div className="total-card">
          <span className="total-label">Cash</span>
          <span className="total-value">${totals.Cash.toFixed(2)}</span>
        </div>
        <div className="total-card">
          <span className="total-label">Discount</span>
          <span className="total-value">${totals.Discount.toFixed(2)}</span>
        </div>
        <div className="total-card">
          <span className="total-label">Other</span>
          <span className="total-value">${totals.Other.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default ShopTotal;