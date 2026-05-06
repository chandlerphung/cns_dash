import { useState, useEffect } from "react";
import "./EmployeeTotals.css";

function EmployeeTotals() {
  const [totals, setTotals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/employee/totals`, {
  credentials: "include"
})
      .then(res => res.json())
      .then(data => {
        setTotals(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="totals-container">
      <h1>Employee Totals</h1>
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