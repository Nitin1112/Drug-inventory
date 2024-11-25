// src/pages/CustomerContact.js
import React, { useState, useEffect } from 'react';

const sampleCustomers = [
  { id: 1, name: 'John Doe', phone: '123-456-7890', medicineRequest: 'Painkillers' },
  { id: 2, name: 'Jane Smith', phone: '987-654-3210', medicineRequest: 'Antibiotics' },
  { id: 3, name: 'Alice Johnson', phone: '555-123-4567', medicineRequest: 'Insulin' },
  { id: 4, name: 'Bob Brown', phone: '555-987-6543', medicineRequest: 'Vitamins' },
  { id: 5, name: 'Charlie Green', phone: '444-333-2222', medicineRequest: 'Cough Syrup' },
  { id: 6, name: 'Diane White', phone: '333-222-1111', medicineRequest: 'Antifungal Cream' },
  { id: 7, name: 'Edward Black', phone: '777-888-9999', medicineRequest: 'Blood Pressure Pills' },
  { id: 8, name: 'Fiona Grey', phone: '888-777-6666', medicineRequest: 'Allergy Medicine' },
  { id: 9, name: 'George King', phone: '999-000-1111', medicineRequest: 'Cough Drops' },
  { id: 10, name: 'Hannah Queen', phone: '222-333-4444', medicineRequest: 'Eye Drops' },
];

const CustomerContact = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Replace this with an API call if needed
    setCustomers(sampleCustomers);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Customer Contacts</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Medicine Request</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{customer.name}</td>
              <td className="py-2 px-4 border-b">{customer.phone}</td>
              <td className="py-2 px-4 border-b">{customer.medicineRequest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerContact;
