// Dashboard.js
import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col flex-grow  bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-white text-gray-800 py-2 px-4 rounded shadow hover:bg-gray-200">
            Download Report
          </button>
          <div className="relative">
            <button className="bg-white text-gray-800 py-2 px-4 rounded shadow hover:bg-gray-200">
              January 2022 ▾
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold text-green-800">Good</h2>
          <p className="text-sm text-gray-500">Inventory Status</p>
          <button className="mt-2 text-green-800 hover:underline">
            View Detailed Report &raquo;
          </button>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold text-yellow-800">Rs. 8,55,875</h2>
          <p className="text-sm text-gray-500">Revenue : Jan 2022</p>
          <button className="mt-2 text-yellow-800 hover:underline">
            View Detailed Report &raquo;
          </button>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold text-blue-800">298</h2>
          <p className="text-sm text-gray-500">Medicines Available</p>
          <button className="mt-2 text-blue-800 hover:underline">
            Visit Inventory &raquo;
          </button>
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Inventory Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Inventory</h3>
          <p className="text-sm text-gray-500">Total no of Medicines: 298</p>
          <p className="text-sm text-gray-500">Medicine Groups: 24</p>
          <button className="mt-4 text-blue-600 hover:underline">
            Go to Configuration &raquo;
          </button>
        </div>

        {/* Quick Report Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Quick Report</h3>
          <p className="text-sm text-gray-500">Qty of Medicines Sold: 70,856</p>
          <p className="text-sm text-gray-500">Invoices Generated: 5,288</p>
          <button className="mt-4 text-blue-600 hover:underline">
            January 2022 &raquo;
          </button>
        </div>

        {/* My Pharmacy Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">My Pharmacy</h3>
          <p className="text-sm text-gray-500">Total no of Suppliers: 04</p>
          <p className="text-sm text-gray-500">Total no of Users: 05</p>
          <button className="mt-4 text-blue-600 hover:underline">
            Go to User Management &raquo;
          </button>
        </div>

        {/* Customers Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Customers</h3>
          <p className="text-sm text-gray-500">Total no of Customers: 845</p>
          <p className="text-sm text-gray-500">Frequently bought Item: Adalimumab</p>
          <button className="mt-4 text-blue-600 hover:underline">
            Go to Customers Page &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
