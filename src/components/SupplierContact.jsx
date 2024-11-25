// src/pages/SupplierContact.js
import React, { useState, useEffect } from 'react';

const sampleSuppliers = [
  { id: 1, name: 'Global Pharma Co.', phone: '555-123-4567', address: '123 Main St, Springfield', email: 'contact@globalpharma.com' },
  { id: 2, name: 'MedSupply Ltd.', phone: '555-987-6543', address: '456 Oak Ave, Lincoln', email: 'info@medsupply.com' },
  { id: 3, name: 'HealthCorp', phone: '222-333-4444', address: '789 Elm St, Franklin', email: 'support@healthcorp.com' },
  { id: 4, name: 'PharmaOne', phone: '333-444-5555', address: '101 Maple Dr, Shelbyville', email: 'sales@pharmaone.com' },
  { id: 5, name: 'WellnessDistributors', phone: '444-555-6666', address: '202 Cedar Blvd, Westfield', email: 'contact@wellnessdist.com' },
  { id: 6, name: 'MediTrade', phone: '555-666-7777', address: '303 Pine Ln, Edison', email: 'trade@meditrade.com' },
  { id: 7, name: 'LifeCare Supplies', phone: '666-777-8888', address: '404 Birch St, Rivertown', email: 'lifecare@lifesupplies.com' },
  { id: 8, name: 'CarePlus Ltd.', phone: '777-888-9999', address: '505 Willow Way, Lakeside', email: 'plus@careplus.com' },
  { id: 9, name: 'VitalSource', phone: '888-999-0000', address: '606 Aspen Ct, Summit', email: 'vital@vitalsource.com' },
  { id: 10, name: 'SafeMeds Inc.', phone: '999-000-1111', address: '707 Cherry Rd, Ridgewood', email: 'safemeds@safemeds.com' },
];

const SupplierContact = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Replace this with an API call if needed
    setSuppliers(sampleSuppliers);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Supplier Contacts</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Address</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{supplier.name}</td>
              <td className="py-2 px-4 border-b">{supplier.phone}</td>
              <td className="py-2 px-4 border-b">{supplier.email}</td>
              <td className="py-2 px-4 border-b">{supplier.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierContact;
