import Sidebar from './components/SideBar'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import Listofmedicines from './components/Listofmedicines';
import Medicinegroup from './components/Medicinegroup';
import Reports from './components/Reports';
import CustomerContact from './components/CustomerContact';
import SupplierContact from './components/SupplierContact';
import COVID19Info from './components/Covid'
import AddNewItem from './components/inventory/AddNewItem';
import SingleMedicine from './components/inventory/SingleMedicine';
import Login from './components/Login'
import Register from './components/Register'
const App = () => {
  return (
    <div className="flex-grow p-0 bg-ice-blue">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory/medicines" element={<Listofmedicines />} />
            <Route path="/inventory/medicines/update" element={<AddNewItem />} />
            <Route path="/inventory/medicines/:id" element={<SingleMedicine />} />
            <Route path="/inventory/groups" element={<Medicinegroup />} />
            <Route path="/reports" element={<h1>Reports</h1>} />
            <Route path="/configuration" element={<h1>Configuration</h1>} />
            <Route path="/contact-management/customers" element={<CustomerContact />} />
            <Route path="/contact-management/suppliers" element={<SupplierContact />} />
            <Route path="/notifications" element={<h1>Notifications</h1>} />
            <Route path="/chat" element={<h1>Chat with Visitors</h1>} />
            <Route path="/settings" element={<h1>Application Settings</h1>} />
            <Route path="/covid-19" element={<COVID19Info />} />
            <Route path="/support" element={<h1>Get Technical Help</h1>} />
            <Route path="/Medicinegroup" element={<Medicinegroup />} />
            <Route path="/Reports" element={<Reports />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
