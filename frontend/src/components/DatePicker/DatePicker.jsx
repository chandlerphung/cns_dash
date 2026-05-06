import './DatePicker.css';

function DatePicker({ selectedDate, onChange }) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="date-picker">
      <label>Viewing: </label>
      <input
        type="date"
        value={selectedDate}
        max={today}
        onChange={e => onChange(e.target.value)}
      />
      <button onClick={() => onChange(today)}>Today</button>
    </div>
  );
}

export default DatePicker;