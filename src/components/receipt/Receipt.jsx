import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Receipt = () => {
    const [todayInvoices, setTodayInvoices] = useState([]);
    const [searchInvoices, setSearchInvoices] = useState("");

    const navigator = useNavigate();


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white p-5 rounded-lg shadow">
                {/* Header */}
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl text-black font-bold">
                            Invoices
                        </h1>
                    </div>
                    <button onClick={() => navigator("new")}
                        className='bg-blue-600 px-8 py-2.5 rounded-sm font-semibold text-white'>
                        New Invoice
                    </button>
                </header>

                {/* Table */}
                <div className="my-8">
                    <h1 className="mb-3 font-bold text-lg">Invoices generated today</h1>

                    <table className="w-full border-collapse bg-white">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 border-2 border-gray-200">Invoice No</th>
                                <th className="p-3 border-2 border-gray-200">Customer Name</th>
                                <th className="p-3 border-2 border-gray-200">Total Items</th>
                                <th className="p-3 border-2 border-gray-200">Total Amount</th>
                                <th className="p-3 border-2 border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayInvoices.length !== 0 &&
                                todayInvoices
                                    .filter((med) => med.name.toLowerCase().includes(searchInvoices.toLowerCase()))
                                    .map((medicine, index) => (
                                        <tr key={index} className={`cursor-pointer ${medicine.minimumCap && medicine.minimumCap > medicine.stock ? "bg-red-400 hover:bg-red-500" : "hover:bg-gray-50"}`} onDoubleClick={() => handleMedicineNavigate(medicine._id)}>
                                            <td className="p-3 border m-auto">{medicine.name}</td>
                                            <td className="p-3 border m-auto">{medicine.id}</td>
                                            <td className="p-3 border m-auto">{medicine.group}</td>
                                            <td className="p-3 border m-auto">{medicine.stock}</td>
                                            <td className="p-3 border flex flex-col items-center gap-2">
                                                <button
                                                    className="m-auto text-yellow-500 hover:underline flex items-center m-3"
                                                // onClick={() => onUpdateStock(medicine, index)}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} /> Update Stock
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>

                    {todayInvoices.filter((med) => med.name.toLowerCase().includes(searchInvoices.toLowerCase())).length === 0 && (
                        <div className="flex py-5 flex-row w-full justify-center items-center border-2 border-t-0">
                            <h2>No Invoices Yet.</h2>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Receipt;