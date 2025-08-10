import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReceipts } from "../../controllers/receipt.mjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import OverlayLoader from "../common/OverlayLoader";

const Receipt = () => {
  const [todayInvoices, setTodayInvoices] = useState([]);
  const [searchInvoices, setSearchInvoices] = useState("");
  const [loading, setLoading] = useState(false);
  const [todayHasInvoices, setTodayHasInvoices] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    const fetchTodayInvoices = async () => {
      setLoading(true);
      try {
        const response = await getReceipts();
        if (response.error) {
          console.error("Error fetching today's invoices:", response.error);
          setLoading(false);
          return;
        } else if (response.data.receipts.length === 0) {
          setTodayHasInvoices(false);
        } else {
          setTodayHasInvoices(false);
        }
        setTodayInvoices(response.data.receipts);
        console.log(todayInvoices);
        
      } catch (error) {
        console.error("Error fetching today's invoices:", error);
      }
      setLoading(false);
    };

    fetchTodayInvoices();
  }, []);

  const handleInvoiceNavigate = () => {
    
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-5 rounded-lg shadow">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-black font-bold">Invoices</h1>
          </div>
          <button
            onClick={() => navigator("new")}
            className="bg-blue-600 px-8 py-2.5 rounded-sm font-semibold text-white"
          >
            New Invoice
          </button>
        </header>

        {/* Table */}
        <div className="my-8">
          <h1 className="mb-3 font-bold text-lg">Invoices generated today</h1>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Invoices..."
            className="border border-gray-300 p-2 rounded-lg w-1/2 mb-5"
            value={searchInvoices}
            onChange={(e) => setSearchInvoices(e.target.value)}
          />
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
            {loading && <OverlayLoader />}
            {!loading && <tbody>
              {todayInvoices.length !== 0 &&
                todayInvoices
                  .filter((med) =>
                    med.receiptNumber
                      .toLowerCase()
                      .includes(searchInvoices.toLowerCase())
                  )
                  .map((medicine, index) => (
                    <tr
                      key={index}
                      className={`cursor-pointer ${
                        medicine.minimumCap &&
                        medicine.minimumCap > medicine.stock
                          ? "bg-red-400 hover:bg-red-500"
                          : "hover:bg-gray-50"
                      }`}
                      onDoubleClick={() => handleInvoiceNavigate(medicine._id)}
                    >
                      <td className="p-3 border m-auto">
                        {medicine.receiptNumber}
                      </td>
                      <td className="p-3 border m-auto">
                        {medicine.customerName}
                      </td>
                      <td className="p-3 border m-auto">
                        {medicine.items.length}
                      </td>
                      <td className="p-3 border m-auto">
                        {medicine.totalAmount}
                      </td>
                      <td className="p-3 border flex flex-col items-center gap-2">
                        <button
                          className="m-auto text-yellow-500 hover:underline flex items-center"
                          // onClick={() => onUpdateStock(medicine, index)}
                        >
                          {/* <FontAwesomeIcon icon={faEdit} /> Update Stock */}
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>}
          </table>

          {todayInvoices.filter((med) =>
            med.receiptNumber
              .toLowerCase()
              .includes(searchInvoices.toLowerCase())
          ).length === 0 && (
            <div className="flex py-5 flex-row w-full justify-center items-center border-2 border-t-0">
              <h2>No Invoices Yet.</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Receipt;
