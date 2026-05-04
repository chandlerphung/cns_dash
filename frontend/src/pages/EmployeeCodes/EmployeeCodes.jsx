import { useState, useEffect } from "react";
import "./EmployeeCodes.css";

function EmployeeCodes() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/employee/codes")
      .then(res => res.json())
      .then(data => {
        setEmployees(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="codes-container">
      <h1>Employee Codes</h1>
      <table className="codes-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Passcode</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index}>
              <td>{emp.FirstName}</td>
              <td>{emp.passcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeCodes;