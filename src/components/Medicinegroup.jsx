import React, { useState } from 'react';

const Medicinegroup = () => {
  const [search, setSearch] = useState('');
  const [medicineGroups, setMedicineGroups] = useState([
    { groupName: 'Generic Medicine', numberOfMedicines: '02' },
    { groupName: 'Diabetes', numberOfMedicines: '32' },
  ]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupMedicines, setNewGroupMedicines] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalGroups = medicineGroups.length;

  // Handle form submission for adding new group
  const handleAddNewGroup = () => {
    if (newGroupName && newGroupMedicines) {
      setMedicineGroups([
        ...medicineGroups,
        {
          groupName: newGroupName,
          numberOfMedicines: newGroupMedicines.padStart(2, '0'), // format to 2 digits
        },
      ]);
      setNewGroupName('');
      setNewGroupMedicines('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-5 rounded-lg shadow">
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Inventory &gt; <span className="text-blue-600">Medicine Groups ({totalGroups})</span>
          </h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            + Add New Group
          </button>
        </header>

        {/* Subheading */}
        <p className="text-gray-600 mb-4">List of medicines groups.</p>

        {/* Search Bar */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search Medicine Groups..."
            className="border border-gray-300 p-2 rounded-lg w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-gray-200 p-2 rounded-lg ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 4v16m8-16v16m4-8H4"
              />
            </svg>
          </button>
        </div>

        {/* Table */}
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Group Name</th>
              <th className="p-3 border">No of Medicines</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {medicineGroups
              .filter(group => group.groupName.toLowerCase().includes(search.toLowerCase()))
              .map((group, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{group.groupName}</td>
                  <td className="p-3 border">{group.numberOfMedicines}</td>
                  <td className="p-3 border">
                    <button className="text-blue-500 hover:underline flex items-center">
                      View Full Detail
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4 ml-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding New Group */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Add New Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              className="w-full mb-2 p-2 border rounded"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <input
              type="text"
              placeholder="No of Medicines"
              className="w-full mb-2 p-2 border rounded"
              value={newGroupMedicines}
              onChange={(e) => setNewGroupMedicines(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 border rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewGroup}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medicinegroup;
