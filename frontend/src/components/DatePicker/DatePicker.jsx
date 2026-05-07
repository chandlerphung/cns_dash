import './DatePicker.css';

function DatePicker({ selectedDate, onChange }) {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  return (
    <div className="date-picker">
      <label>Viewing: </label>
      <input
        type="date"
        value={selectedDate}
        max={todayStr}
        onChange={e => onChange(e.target.value)}
      />
      <button onClick={() => onChange(todayStr)}>Today</button>
    </div>
  );
}

export default DatePicker;