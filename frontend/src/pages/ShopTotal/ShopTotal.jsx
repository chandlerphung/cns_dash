import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import DatePicker from "../../components/DatePicker/DatePicker";
import "./ShopTotal.css";

const COLORS = ["#4f86c6", "#63b3a0", "#f0a500", "#e06c75", "#9b59b6", "#2ecc71", "#e67e22", "#1abc9c"];

function ShopTotal() {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [totals, setTotals] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(todayStr);

  useEffect(() => {
    fetchShopData(selectedDate);
  }, [selectedDate]);

  const fetchShopData = (date) => {
    setLoading(true);
    const shopUrl = `${process.env.REACT_APP_API_URL}/api/shop/total?date=${formatDate(date)}`;
    const empUrl = `${process.env.REACT_APP_API_URL}/api/employee/totals?date=${formatDate(date)}`;

    Promise.all([
      fetch(shopUrl, { credentials: "include" }).then(res => res.json()),
      fetch(empUrl, { credentials: "include" }).then(res => res.json())
    ]).then(([shopData, empData]) => {
      setTotals(shopData);
      setEmployees(empData);
      setLoading(false);
    });
  };

  const formatDate = (isoDate) => {
    const [year, month, day] = isoDate.split('-');
    return `${month}/${day}/${year}`;
  };

  if (loading) return <p>Loading...</p>;
  if (!totals) return <p>No data available for today.</p>;

  const employeeChartData = employees
    .map(emp => ({
      name: emp.FirstName,
      value: emp.Price
    }))
    .filter(emp => emp.value > 0);

  return (
    <div className="shoptotal-container">
      <h1>Shop Total</h1>
      <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />

      <div className="shoptotal-grid top-grid">
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
      </div>

      <div className="shoptotal-chart">
        <h2>Employee Contribution</h2>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={employeeChartData}
                cx="50%"
                cy="50%"
                outerRadius="70%"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              >
                {employeeChartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="shoptotal-grid bottom-grid">
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
