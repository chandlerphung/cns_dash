import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./ShopTotal.css";

const COLORS = ["#4f86c6", "#63b3a0", "#f0a500", "#e06c75", "#9b59b6", "#2ecc71", "#e67e22", "#1abc9c"];

function ShopTotal() {
  const [totals, setTotals] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/shop/total").then(res => res.json()),
      fetch("http://localhost:5000/api/employee/totals").then(res => res.json())
    ]).then(([shopData, empData]) => {
      setTotals(shopData);
      setEmployees(empData);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  const employeeChartData = employees
    .map(emp => ({
      name: emp.FirstName,
      value: emp.Price
    }))
    .filter(emp => emp.value > 0);

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

      <div className="shoptotal-charts">
        <div className="shoptotal-chart">
          <h2>Employee Contribution</h2>
          <PieChart width={700} height={380}>
            <Pie
              data={employeeChartData}
              cx={350}
              cy={170}
              outerRadius={140}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            >
              {employeeChartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default ShopTotal;