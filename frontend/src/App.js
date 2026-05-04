import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import CustomerOrder from './pages/CustomerOrder/CustomerOrder';
import Sales from './pages/Sales/Sales';
import EmployeeTotals from './pages/EmployeeTotals/EmployeeTotals';
import ClockedIn from './pages/ClockedIn/ClockedIn';
import ShopTotal from './pages/ShopTotal/ShopTotal';
import EmployeeCodes from './pages/EmployeeCodes/EmployeeCodes';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
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