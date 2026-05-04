import { useState, useEffect } from "react";
import "./ClockedIn.css";

function ClockedIn() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/employee/clocked-in")
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
  );
}

export default ClockedIn;