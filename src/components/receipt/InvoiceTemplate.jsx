import { IndianRupee, Printer, Save } from "lucide-react";
import PharmaOne from "../../assets/pharma-one.png";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { createReceipt } from "../../controllers/receipt.mjs";
import SelectDropdown from "../common/SelectDropdown";

const InvoiceTemplate = () => {
  const location = useLocation();
  const invoiceData = location.state;
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [saveStatus, setSaveStatus] = useState(false);

  const availablePaymentMethods = [
    { value: "Cash", label: "Cash" },
    { value: "Card", label: "Card" },
    { value: "Paytm", label: "Paytm" },
  ];

  const [localData, setLocalData] = useState({
    inventoryName: "XYZ Inventory",
    inventoryAddress: "Nachipalayam, Coimbatore",
    inventoryPinCode: "641 032",
  });

  const printInvoice = () => {
    const printContents =
      document.querySelector(".invoice-container").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // reload to restore event handlers and state
  };

  const saveInvoice = () => {
    const finalInvoiceData = {
      ...invoiceData,
      paymentMethod: paymentMethod,
    };
    const response = createReceipt(finalInvoiceData);
    if (response.error) {
      console.log("Error saving invoice:", response.error);
    } else {
      console.log("Invoice saved successfully:", response.data);
    }
  };

  const handlePaymentMethodChange = (event) => {
    const selectedValue = event.target.value;
    setPaymentMethod(selectedValue);
  };

  return (
    <div className="container">
      <div className="row gutters">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="card">
            <div className="card-body p-0">
              <div className="invoice-container">
                <div className="invoice-header">
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="flex custom-actions-btns mb-5 w-full">
                        <button
                          onClick={printInvoice}
                          className="flex bg-blue-500 px-5 py-2 rounded border border-blue-500 text-center text-white shadow-sm transition-all hover:border-blue-700 hover:bg-blue-700 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300"
                        >
                          <span className="mr-2 font-semibold">Print</span>{" "}
                          <Printer />
                        </button>
                        <button
                          autoFocus
                          onClick={saveInvoice}
                          className="flex ml-5 bg-green-500 px-5 py-2 rounded border border-green-500 text-center text-white shadow-sm transition-all hover:border-green-700 hover:bg-green-700 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300"
                        >
                          <span className="mr-2 font-semibold">Save</span>{" "}
                          <Save />
                        </button>
                        <SelectDropdown
                          items={availablePaymentMethods}
                          onChange={handlePaymentMethodChange}
                          value={paymentMethod}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-12">
                  <div className="flex flex-row justify-between">
                    <div className="col-xl-6 w-24 col-lg-6 col-md-6 col-sm-6">
                      <img src={PharmaOne} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <address className="text-right">
                        {localData.inventoryName},<br />
                        {localData.inventoryAddress}.<br />
                        {localData.inventoryPinCode}
                      </address>
                    </div>
                  </div>
                  {invoiceData.customerDataAvailable && (
                    <div className="pt-8">
                      <address>
                        Customer Name: {invoiceData.customer.customerName}
                        <br />
                        Customer Contact: {invoiceData.customer.customerContact}
                      </address>
                    </div>
                  )}
                  <div className="invoice-details">
                    <div className="invoice-num">
                      {/* <div>Invoice ID - {invoiceData.receipt.id}</div> */}
                      {/* <div>{invoiceData.receipt.date}</div> */}
                    </div>
                  </div>

                  <div className="invoice-body">
                    <table className="my-4 w-full bg-white border border-gray-200">
                      <thead>
                        <tr className="text-left">
                          <th className="px-6 py-4 font-medium text-gray-900">
                            S.No
                          </th>
                          <th className="px-6 py-4 font-medium text-gray-900">
                            Name
                          </th>
                          <th className="px-6 py-4 font-medium text-gray-900">
                            Rate
                          </th>
                          <th className="px-6 py-4 font-medium text-gray-900">
                            Quantity
                          </th>
                          <th className="px-6 py-4 font-medium text-gray-900">
                            Sub Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {console.log(invoiceData.receipt.items)}
                        {invoiceData.receipt.items.map((item) => (
                          <tr key={item.itemNo} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900 text-center">
                              {item.itemNo}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">
                              {item.itemName}
                            </td>
                            <td className="px-6 py-4">{item.amountPerItem}</td>
                            <td className="px-6 py-4">{item.quantity}</td>
                            <td className="px-6 py-4">{item.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="w-full px-4 flex justify-end flex-row">
                      <h1 className="pr-5 font-semibold text-lg">
                        Sub Total Amount:
                      </h1>
                      <h1 className="text-lg">
                        {invoiceData.receipt.subTotalAmount}
                      </h1>
                    </div>
                    <div className="w-full px-4 flex justify-end flex-row">
                      <h1 className="pr-5 font-semibold text-lg">Tax:</h1>
                      <h1 className="text-lg">{invoiceData.receipt.tax}</h1>
                    </div>
                    <div className="bg-yellow-500 w-full py-1 my-3 px-4 flex flex-row justify-between">
                      <h1 className="pr-5 font-semibold text-2xl">
                        Total Amount:
                      </h1>
                      <h1 className="text-2xl flex items-center">
                        <IndianRupee /> {invoiceData.receipt.totalAmount}
                      </h1>
                    </div>
                  </div>
                  <div className="text-lg font-semibold pt-5">
                    Thank you for your Business.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
