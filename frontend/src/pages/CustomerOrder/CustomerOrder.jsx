import { useState, useEffect } from "react";
import "./CustomerOrder.css";
import DatePicker from "../../components/DatePicker/DatePicker";

function CustomerOrder() {
  const today = new Date().toISOString().split('T')[0];
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPhone, setEditingPhone] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    fetchCustomers(selectedDate);
  }, [selectedDate]);

  const fetchCustomers = (date) => {
    const isToday = date === today;
    const url = isToday
      ? `${process.env.REACT_APP_API_URL}/api/customer/orders`
      : `${process.env.REACT_APP_API_URL}/api/customer/orders?date=${formatDate(date)}`;

    fetch(url, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      });
  };

  const formatDate = (isoDate) => {
    const [year, month, day] = isoDate.split('-');
    return `${month}/${day}/${year}`;
  };

  const handleEditClick = (customer) => {
    setEditingPhone(customer.phone);
    setNoteInput(customer.note || "");
  };

  const handleSave = (phone) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/customer/note`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, note: noteInput })
    })
      .then(res => res.json())
      .then(() => {
        setEditingPhone(null);
        fetchCustomers(selectedDate);
      });
  };

  const handleToggleDone = (customer) => {
    const newDone = customer.done ? 0 : 1;
    fetch(`${process.env.REACT_APP_API_URL}/api/customer/done`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: customer.phone, done: newDone })
    })
      .then(res => res.json())
      .then(() => fetchCustomers(selectedDate));
  };

  if (loading) return <p>Loading...</p>;
  if (customers.length === 0) return <p>No customers checked in yet today.</p>;

  return (
    <div className="customerorder-container">
      <h1>Customer Orders</h1>
      <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
      <table className="customerorder-table">
        <thead>
          <tr>
            <th>Done</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Time In</th>
            <th>Note</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, index) => (
            <tr key={index} className={c.done ? "row-done" : ""}>
              <td>
                <input
                  type="checkbox"
                  checked={!!c.done}
                  onChange={() => handleToggleDone(c)}
                  className="done-checkbox"
                />
              </td>
              <td>{c.customer}</td>
              <td>{c.phone}</td>
              <td>{new Date(`1970-01-01T${c.hour}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</td>
              <td>
                {editingPhone === c.phone ? (
                  <input
                    className="note-input"
                    value={noteInput}
                    onChange={e => setNoteInput(e.target.value)}
                    placeholder="Add a note..."
                  />
                ) : (
                  <span className="note-text">{c.note || "—"}</span>
                )}
              </td>
              <td>
                {editingPhone === c.phone ? (
                  <button className="save-btn" onClick={() => handleSave(c.phone)}>Save</button>
                ) : (
                  <button className="edit-btn" onClick={() => handleEditClick(c)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerOrder;