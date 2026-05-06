import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Login/Login';
import CustomerOrder from './pages/CustomerOrder/CustomerOrder';
import Sales from './pages/Sales/Sales';
import EmployeeTotals from './pages/EmployeeTotals/EmployeeTotals';
import ClockedIn from './pages/ClockedIn/ClockedIn';
import ShopTotal from './pages/ShopTotal/ShopTotal';
import EmployeeCodes from './pages/EmployeeCodes/EmployeeCodes';

function App() {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/auth/check`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) return <p>Loading...</p>;

  if (!authenticated) {
    return <Login onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <NavBar onLogout={() => setAuthenticated(false)} />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<CustomerOrder />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/employee-totals" element={<EmployeeTotals />} />
          <Route path="/clocked-in" element={<ClockedIn />} />
          <Route path="/shop-total" element={<ShopTotal />} />
          <Route path="/employee-codes" element={<EmployeeCodes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;