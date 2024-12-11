
import { BadgeHelp, Bell, BellDot, Bolt, ChartBar, House, PackageOpen, TicketCheck, Users, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Sidebar = () => {
  const [isInventoryOpen, setInventoryOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // const userData = {
    //   name: "Naveen N",
    //   email: "navin82005@gmail.com",
    //   role: "Pharmacist"
    // }
    // localStorage.setItem("userData", JSON.stringify(userData));
    setUserData(JSON.parse(localStorage.getItem('userData')));

  }, []);

  return (
    <div className='flex'>
      <div className="w-96 flex flex-col h-screen shadow-lg bg-[#1f2937] text-white">
        {/* Logo and Admin Information */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-semibold">Pharma One</h2>
          <div className="mt-4">
            <p className="font-medium">{userData.name}</p>
            <p className="text-green-400 text-sm">{userData.role}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow overflow-y-auto mt-4 space-y-2">
          <Link to="/dashboard" className="flex items-center py-2 px-6 text-sm hover:bg-[#06b6d4] transition-colors duration-200">
            <span className="text-gray-400 mr-2"><House /></span>
            Dashboard
          </Link>

          {/* Inventory Dropdown */}
          <Link
            to="/inventory"
            onClick={() => setInventoryOpen(!isInventoryOpen)}
            className="flex items-center justify-between w-full text-left py-2 px-6 text-sm hover:bg-[#06b6d4] transition-colors duration-200"
          >
            <span className="flex items-center">
              <span className="text-gray-400 mr-2"><PackageOpen /></span>
              Inventory
            </span>
            <span>{isInventoryOpen ? '▾' : '▸'}</span>
          </Link>
          {isInventoryOpen && (
            <div className="pl-10">
              <Link to="/inventory/medicines" className="block py-1 px-4 text-sm hover:bg-[#06b6d4]">List of Medicines</Link>
              <Link to="/inventory/groups" className="block py-1 px-4 text-sm hover:bg-[#06b6d4]">Medicine Groups</Link>
            </div>
          )}

          <Link to="/receipts" className="flex items-center py-2 px-6 text-sm hover:bg-[#06b6d4] transition-colors duration-200">
            <span className="text-gray-400 mr-2"><TicketCheck /></span>
            Generate Receipts
          </Link>

          <Link to="/Reports" className="flex items-center py-2 px-6 text-sm hover:bg-[#06b6d4] transition-colors duration-200">
            <span className="text-gray-400 mr-2"><ChartBar /></span>
            Reports
          </Link>
          <Link to="/configuration" className="flex items-center py-2 px-6 text-sm hover:bg-[#06b6d4] transition-colors duration-200">
            <span className="text-gray-400 mr-2"><Bolt /></span>
            Configuration
          </Link>

          {/* Contact Management Dropdown */}
          <button
            onClick={() => setContactOpen(!isContactOpen)}
            className="flex items-center justify-between w-full text-left py-2 px-6 text-sm hover:bg-[#06b6d4] transition-colors duration-200"
          >
            <span className="flex items-center">
              <span className="text-gray-400 mr-2"><Users /></span>
              Contact Management
            </span>
            <span>{isContactOpen ? '▾' : '▸'}</span>
          </button>
          {isContactOpen && (
            <div className="pl-10">
              <Link to="/contact-management/customers" className="block py-1 px-4 text-sm hover:bg-[#06b6d4]">Customers</Link>
              <Link to="/contact-management/suppliers" className="block py-1 px-4 text-sm hover:bg-[#06b6d4]">Suppliers</Link>
            </div>
          )}

          <Link to="/notifications" className="flex items-center py-2 px-6 text-sm hover:bg-[#06b6d4] transition-colors duration-200">
            <span className="text-gray-400 mr-2"><BellDot /></span>
            Notifications
            <span className="ml-auto text-red-500 bg-gray-700 px-2 py-0.5 rounded-full text-xs">01</span>
          </Link>
          <Link to="/settings" className="flex items-center py-2 px-6 text-sm hover:bg-[#06b6d4] transition-colors duration-200">
            <span className="text-gray-400 mr-2"><Wrench /></span>
            Application Settings
          </Link>
          <Link to="/support" className="flex items-center py-2 px-6 text-sm hover:bg-[#06b6d4] transition-colors duration-200">
            <span className="text-gray-400 mr-2"><BadgeHelp /></span>
            Get Technical Help
          </Link>
        </nav>
      </div>

      <div className="w-full h-screen p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
