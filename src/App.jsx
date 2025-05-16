import Sidebar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Listofmedicines from "./components/Listofmedicines";
import Medicinegroup from "./components/Medicinegroup";
import Reports from "./components/Reports";
import CustomerContact from "./components/CustomerContact";
import SupplierContact from "./components/SupplierContact";

import AddNewItem from "./components/inventory/AddNewItem";
import SingleMedicine from "./components/inventory/SingleMedicine";
import Receipt from "./components/receipt/Receipt";
import NewReceipt from "./components/receipt/NewReceipt";
import InvoiceTemplate from "./components/receipt/InvoiceTemplate";
import UpdateStock from "./components/inventory/UpdateStock";
import Notification from "./components/Notification/Notification";
import SingleNotification from "./components/Notification/SingleNotification";
import ChatbotAsPage from "./components/Chatbot/ChatbotAsPage";

const App = () => {
  return (
    <div className="flex-grow p-0 bg-ice-blue">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar />}>
            {/* Home Routes */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Inventory Routes */}
            <Route path="/inventory" element={<Listofmedicines />} />
            <Route path="/inventory/medicines" element={<Listofmedicines />} />
            <Route
              path="/inventory/medicines/update"
              element={<AddNewItem />}
            />
            <Route
              path="/inventory/medicines/:id"
              element={<SingleMedicine />}
            />
            <Route path="/inventory/medicine/stock" element={<UpdateStock />} />
            <Route path="/inventory/groups" element={<Medicinegroup />} />

            <Route path="/reports" element={<h1>Reports</h1>} />

            {/* Invoice Routes */}
            <Route path="/receipts" element={<Receipt />} />
            <Route path="/receipts/new" element={<NewReceipt />} />
            <Route path="/receipts/new/print" element={<InvoiceTemplate />} />

            {/* General Routes */}
            <Route path="/configuration" element={<h1>Configuration</h1>} />
            <Route
              path="/contact-management/customers"
              element={<CustomerContact />}
            />
            <Route
              path="/contact-management/suppliers"
              element={<SupplierContact />}
            />

            {/* Notifications */}
            <Route path="/notifications" element={<Notification />} />
            <Route
              path="/notifications/:id/view"
              element={<SingleNotification />}
            />

            {/* Chatbot Routes */}
            <Route path="/chat" element={<ChatbotAsPage />} />

            <Route path="/settings" element={<h1>Application Settings</h1>} />
            <Route path="/support" element={<h1>Get Technical Help</h1>} />
            <Route path="/Medicinegroup" element={<Medicinegroup />} />
            <Route path="/Reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
