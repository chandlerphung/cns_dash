import { useState, useEffect } from "react";
import DatePicker from "../../components/DatePicker/DatePicker";
import "./EmployeeTotals.css";

function EmployeeTotals() {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [totals, setTotals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(todayStr);

  useEffect(() => {
    fetchTotals(selectedDate);
  }, [selectedDate]);

  const fetchTotals = (date) => {
    setLoading(true);
    const url = `${process.env.REACT_APP_API_URL}/api/employee/totals?date=${formatDate(date)}`;

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
      <div className="table-wrapper">
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
    </div>
  );
}

export default EmployeeTotals;