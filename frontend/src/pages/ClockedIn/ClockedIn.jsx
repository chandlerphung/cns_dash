import { useState, useEffect } from "react";
import "./ClockedIn.css";

function ClockedIn() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const formatDate = (isoDate) => {
      const [year, month, day] = isoDate.split('-');
      return `${month}/${day}/${year}`;
    };
    fetch(`${process.env.REACT_APP_API_URL}/api/employee/clocked-in?date=${formatDate(todayStr)}`, {
  credentials: "include"
})
      .then(res => res.json())
      .then(data => {
        setEmployees(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="clockedin-container">
      <h1>Clocked In</h1>
      <div className="table-wrapper">
        <table className="clockedin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Time In</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index}>
              <td>{emp.FirstName}</td>
              <td>{emp.inhour}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClockedIn;