import { useState, useEffect } from "react";
import DatePicker from "../../components/DatePicker/DatePicker";
import "./EmployeeTotals.css";

function EmployeeTotals() {
  const today = new Date().toISOString().split('T')[0];
  const [totals, setTotals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    fetchTotals(selectedDate);
  }, [selectedDate]);

  const fetchTotals = (date) => {
    setLoading(true);
    const isToday = date === today;
    const url = isToday
      ? `${process.env.REACT_APP_API_URL}/api/employee/totals`
      : `${process.env.REACT_APP_API_URL}/api/employee/totals?date=${formatDate(date)}`;

    fetch(url, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setTotals(data);
        setLoading(false);
      });
  };

  const formatDate = (isoDate) => {
    const [year, month, day] = isoDate.split('-');
    return `${month}/${day}/${year}`;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="totals-container">
      <h1>Employee Totals</h1>
      <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
      <table className="totals-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Tip</th>
            <th>Service Charge</th>
          </tr>
        </thead>
        <tbody>
          {totals.map((emp, index) => (
            <tr key={index}>
              <td>{emp.FirstName}</td>
              <td>${emp.Price.toFixed(2)}</td>
              <td>${emp.Tip.toFixed(2)}</td>
              <td>${emp.Service_Charge.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTotals;