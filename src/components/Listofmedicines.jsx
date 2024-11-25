import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Listofmedicines = () => {
  const [search, setSearch] = useState('');
  const [medicines, setMedicines] = useState([
    // { name: 'Augmentin 625 Duo Tablet', id: 'D06ID232435454', group: 'Generic Medicine', stock: 350 },
    // { name: 'Azithral 500 Tablet', id: 'D06ID232435451', group: 'Generic Medicine', stock: 20 },
    // { name: 'Ascoril LS Syrup', id: 'D06ID232435452', group: 'Diabetes', stock: 85 },
    // { name: 'Azee 500 Tablet', id: 'D06ID232435450', group: 'Generic Medicine', stock: 75 },
  ]);

  const [newMedicine, setNewMedicine] = useState({
    name: '',
    id: '',
    group: '',
    stock: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine({
      ...newMedicine,
      [name]: value
    });
  };

  // Add new medicine to the list
  const addMedicine = () => {
    if (isEditing) {
      // Update the existing medicine
      const updatedMedicines = medicines.map((medicine, index) =>
        index === editingIndex ? newMedicine : medicine
      );
      setMedicines(updatedMedicines);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      // Add new medicine
      setMedicines([...medicines, newMedicine]);
    }
    setNewMedicine({ name: '', id: '', group: '', stock: '' }); // Clear form
  };

  // Edit medicine
  const editMedicine = (index) => {
    setNewMedicine(medicines[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-5 rounded-lg shadow">
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Inventory &gt; <span className="text-blue-600">List of Medicines ({medicines.length})</span>
          </h1>
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={addMedicine}
          >
            {isEditing ? "Save Changes" : "+ Add New Item"}
          </button>
        </header>
        
        {/* Search and Filter */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search Medicine Inventory..."
            className="border border-gray-300 p-2 rounded-lg w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="border border-gray-300 p-2 rounded-lg">
            <option value="">- Select Group -</option>
            <option value="Generic Medicine">Generic Medicine</option>
            <option value="Diabetes">Diabetes</option>
          </select>
        </div>

        {/* Table */}
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Medicine Name</th>
              <th className="p-3 border">Medicine ID</th>
              <th className="p-3 border">Group Name</th>
              <th className="p-3 border">Stock in Qty</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines
              .filter(med => med.name.toLowerCase().includes(search.toLowerCase()))
              .map((medicine, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{medicine.name}</td>
                  <td className="p-3 border">{medicine.id}</td>
                  <td className="p-3 border">{medicine.group}</td>
                  <td className="p-3 border">{medicine.stock}</td>
                  <td className="p-3 border flex gap-2">
                    <button className="text-blue-500 hover:underline">View Full Detail</button>
                    <button 
                      className="text-yellow-500 hover:underline flex items-center gap-1"
                      onClick={() => editMedicine(index)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Add/Edit Medicine Form */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? "Edit Medicine" : "Add New Medicine"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Medicine Name"
              value={newMedicine.name}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-lg"
            />
            <input
              type="text"
              name="id"
              placeholder="Medicine ID"
              value={newMedicine.id}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-lg"
            />
            <input
              type="text"
              name="group"
              placeholder="Group Name"
              value={newMedicine.group}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-lg"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              value={newMedicine.stock}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <button
            onClick={addMedicine}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {isEditing ? "Save Changes" : "Add Medicine"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listofmedicines;
