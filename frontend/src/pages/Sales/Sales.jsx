import { useState, useEffect } from "react";
import DatePicker from "../../components/DatePicker/DatePicker";
import "./Sales.css";

function Sales() {
  const today = new Date().toISOString().split('T')[0];
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    fetchSales(selectedDate);
  }, [selectedDate]);

  const fetchSales = (date) => {
    setLoading(true);
    const isToday = date === today;
    const url = isToday
      ? `${process.env.REACT_APP_API_URL}/api/sales`
      : `${process.env.REACT_APP_API_URL}/api/sales?date=${formatDate(date)}`;

    fetch(url, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setSales(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  const formatDate = (isoDate) => {
    const [year, month, day] = isoDate.split('-');
    return `${month}/${day}/${year}`;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="sales-container">
      <h1>Sales</h1>
      <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
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
          {sales.length === 0 ? (
            <tr><td colSpan="8">No data for this date.</td></tr>
          ) : (
            sales.map((row, index) => (
              <tr key={index}>
                <td>{row.Hour && row.Hour.length === 5
  ? new Date(`1970-01-01T${row.Hour}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  : row.Hour}
</td>
                <td>{row.employees.join(", ")}</td>
                <td>${row.Service.toFixed(2)}</td>
                <td>${row.Card.toFixed(2)}</td>
                <td>${row.Cash.toFixed(2)}</td>
                <td>${row.Tip.toFixed(2)}</td>
                <td>${row.Discount.toFixed(2)}</td>
                <td>${row.Other.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;