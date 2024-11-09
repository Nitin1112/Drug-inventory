import React from 'react';

const Reports = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Reports</h1>
        <p className="text-gray-600 mb-8">Overall reports related to the pharmacy.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-md shadow-md p-4">
            <div className="flex items-center mb-2">
              <div className="bg-yellow-400 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 ml-4">
                Rs. 8,55,875
              </h2>
            </div>
            <p className="text-gray-600">Total Sales Report</p>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-blue-600">
              View Details
            </button>
          </div>
          <div className="bg-white rounded-md shadow-md p-4">
            <div className="flex items-center mb-2">
              <div className="bg-green-400 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 ml-4">
                Rs. 1,25,000
              </h2>
            </div>
            <p className="text-gray-600">Total Expenses Report</p>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-blue-600">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;