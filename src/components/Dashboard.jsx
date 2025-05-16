// Dashboard.js
import { Fragment, useEffect, useState } from 'react';

import { dashboardImage } from './vector/images';
import { fetch_dashboard_data } from '../controllers/dashboard.mjs';
import { Clock } from 'lucide-react';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [inventoryStatus, setInventoryStatus] = useState(false);

  useEffect(() => {
    const fetch_data = async () => {
      const response = await fetch_dashboard_data();
      console.log(response);

      if (response.inventoryStatus) {
        setDashboardData(response);
        setInventoryStatus(true);
      } else {
        setInventoryStatus(false);
      }

    }
    fetch_data();

  }, []);

  return (
    <Fragment>
      {inventoryStatus &&
        <div className="p-0 flex flex-col flex-grow bg-gray-100">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
            <div className="pt-4 rounded-lg shadow border-2 border-green-300">
              <img src={dashboardImage.good} className='m-auto' />
              <h2 className="text-lg font-bold text-green-800">Good</h2>
              <p className="text-sm text-gray-500">Inventory Status</p>
              <a href='/Listofmedicines' className="mt-2 py-2 text-green-800 hover:underline bg-green-200 border-t-2 border-green-300 flex align-center justify-center w-full">
                View Detailed Report &raquo;
              </a>
            </div>

            <div className="pt-4 rounded-lg shadow border-2 border-yellow-300">
              <img src={dashboardImage.revenue} className='m-auto' />
              <h2 className="text-lg font-bold text-yellow-800">Rs. 8,55,875</h2>
              <p className="text-sm text-gray-500">Revenue : Jan 2022</p>
              <a className="mt-2 py-2 text-yellow-800 hover:underline bg-yellow-200 border-t-2 border-yellow-300 flex align-center justify-center w-full">
                View Detailed Report &raquo;
              </a>
            </div>

            <div className="pt-4 rounded-lg shadow border-2 border-blue-300">
              <img src={dashboardImage.medicine} className='m-auto' />
              <h2 className="text-lg font-bold text-blue-800">298</h2>
              <p className="text-sm text-gray-500">Medicines Available</p>
              <a href='/inventory' className="mt-2 py-2 text-blue-800 hover:underline bg-blue-200 border-t-2 border-blue-300 flex align-center justify-center w-full">
                Visit Inventory &raquo;
              </a>
            </div>
          </div>

          {/* Info Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Inventory Section */}
            <div className="bg-white rounded-lg border border-gray-300 shadow h-fit">
              <div className="text-lg px-12 py-2 font-semibold border-b border-gray-300 flex flex-row items-center justify-between">
                <h3>Inventory</h3>
                <a className="text-black font-normal text-sm hover:underline">Go to Configuration &raquo;</a>
              </div>
              <div className="px-12 my-6 flex justify-between items-center">
                <div className='flex flex-col justify-center items-start'>
                  <p className="text-lg font-bold text-black">{dashboardData.totalMedicines}</p>
                  <p className="text-black">Total no of Medicines</p>
                </div>
                <div className='flex flex-col justify-center items-start'>
                  <p className="text-lg font-bold text-black">{dashboardData.availableMedicineGroups}</p>
                  <p className="text-black">Medicine Groups</p>
                </div>
              </div>
            </div>

            {/* Quick Report Section */}
            <div className="bg-white rounded-lg border border-gray-300 shadow h-fit">
              <div className="text-lg px-12 py-2 font-semibold border-b border-gray-300 flex flex-row items-center justify-between">
                <h3>Quick Report</h3>
                <a className="text-black font-normal text-sm hover:underline">
                  January 2022
                </a>
              </div>
              <div className="px-12 my-6 flex justify-between items-center">
                <div className='flex flex-col justify-center items-start'>
                  <p className="text-lg font-bold text-black">70,856</p>
                  <p className="text-black">Qty of Medicines Sold</p>
                </div>
                <div className='flex flex-col justify-center items-start'>
                  <p className="text-lg font-bold text-black">5,288</p>
                  <p className="text-black">Invoices Generated</p>
                </div>
              </div>
            </div>

            {/* My Pharmacy Section */}
            <div className="bg-white rounded-lg border border-gray-300 shadow h-fit">
              <div className="text-lg px-12 py-2 font-semibold border-b border-gray-300 flex flex-row items-center justify-between">
                <h3>My Pharmacy</h3>
                <a className="text-black font-normal text-sm hover:underline">
                  Go to User Management &raquo;
                </a>
              </div>
              <div className="px-12 my-6 flex justify-between items-center">
                <div className='flex flex-col justify-center items-start'>
                  <p className="text-lg font-bold text-black">04</p>
                  <p className="text-black">Total no of Suppliers</p>
                </div>
                <div className='flex flex-col justify-center items-start'>
                  <p className="text-lg font-bold text-black">05</p>
                  <p className="text-black">Total no of Users</p>
                </div>
              </div>
            </div>

            {/* Customers Section */}
            <div className="bg-white rounded-lg border border-gray-300 shadow h-fit">
              <div className="text-lg px-12 py-2 font-semibold border-b border-gray-300 flex flex-row items-center justify-between">
                <h3>Customers</h3>
                <a className="text-black font-normal text-sm hover:underline">
                  Go to Customers Page &raquo;
                </a>
              </div>
              <div className="px-12 my-6 flex justify-between items-center">
                <div className='flex flex-col justify-center items-start'>
                  <p className="text-lg font-bold text-black">845</p>
                  <p className="text-black">Total no of Customers</p>
                </div>
                <div className='flex flex-col justify-center items-start'>
                  <p className="text-lg font-bold text-black">Adalimumab</p>
                  <p className="text-black">Frequently bought Item</p>
                </div>
              </div>
            </div>
          </div>
        </div>}
      {!inventoryStatus &&
        <div className='h-full flex flex-col justify-center items-center'>
          <h1 className='text-2xl' >Nothing to Show</h1>
          <Clock className='mt-3' />
        </div>
      }
      
    </Fragment>
  );
};

export default Dashboard;
