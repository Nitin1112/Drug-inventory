import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReceiptInput from "./ReceiptInput";
import { Plus } from "lucide-react";
import CustomInput from "../common/CustomInput";
import { fetchAvailableMedicines } from "../../controllers/inventory.mjs";
import InvoiceTemplate from "./InvoiceTemplate";

const NewReceipt = () => {
    const [availableMedicines, setAvailableMedicines] = useState([]);
    const [receiptData, setReceiptData] = useState([
        {
            itemNo: 1,
            itemName: "",
            quantity: 0,
            amountPerItem: 0,
            amount: 0,
        },
    ]);
    const [customerData, setCustomerData] = useState({
        customerName: "",
        customerContact: "",
    });
    const [totalAmount, setTotalAmount] = useState(0);
    const navigator = useNavigate();

    // Fetch available medicines on component mount
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAvailableMedicines();
            if (!response.error) {
                setAvailableMedicines(response.data);
            }
        };
        fetchData();
    }, []);

    // Update total amount whenever receipt data changes
    useEffect(() => {
        const total = receiptData.reduce((acc, curr) => acc + curr.amount, 0);
        setTotalAmount(total);
    }, [receiptData]);

    const handleOnChange = (itemNo, e) => {
        const { name, value } = e.target;
        setReceiptData((prevData) =>
            prevData.map((item) =>
                item.itemNo === itemNo
                    ? {
                        ...item,
                        [name]: Number(value),
                        amount:
                            name === "quantity"
                                ? value * item.amountPerItem
                                : item.quantity * value,
                        amountPerItem:
                            name === "amountPerItem" ? Number(value) : item.amountPerItem,
                    }
                    : item
            )
        );
    };

    const handleItemNameChange = (itemNo, value) => {
        const selectedMedicine = availableMedicines.find(
            (med) => med.name === value
        );
        setReceiptData((prevData) =>
            prevData.map((item) =>
                item.itemNo === itemNo
                    ? {
                        ...item,
                        itemName: value,
                        amountPerItem: selectedMedicine?.price || 0,
                        amount: item.quantity * (selectedMedicine?.price || 0),
                    }
                    : item
            )
        );
    };

    const addNewItem = () => {
        const lastItem = receiptData[receiptData.length - 1];
        if (lastItem.itemName && lastItem.quantity > 0) {
            setReceiptData((prevData) => [
                ...prevData,
                {
                    itemNo: prevData.length + 1,
                    itemName: "",
                    quantity: 0,
                    amountPerItem: 0,
                    amount: 0,
                },
            ]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewItem();
        }
    };

    const printRecept = () => {
        console.log(customerData);
        console.log(receiptData);
        const invoiceData = {
            customerDataAvailable: true,
            customer: customerData,
            receipt: { items: receiptData, subTotalAmount: totalAmount, totalAmount: totalAmount, tax: "0.00%" },
        }
        // navigator(<InvoiceTemplate invoiceData={invoiceData} />);
        navigator("print", { state: invoiceData });
    }

    const handleCustomerDataChange = (e) => {
        const { name, value } = e.target;
        setCustomerData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white p-5 rounded-lg shadow">
                <header className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-700">
                        <span
                            className="hover:cursor-pointer hover:text-black"
                            onClick={() => navigator("/receipts")}
                        >
                            Invoices
                        </span>{" "}
                        &gt; <span className="text-black font-bold">New Receipt</span>
                    </h1>
                    <button
                        onClick={() => navigator(-1)}
                        className="bg-red-600 px-8 py-2.5 rounded-sm font-semibold text-white"
                    >
                        Cancel
                    </button>
                </header>

                <div className="my-8">
                    <div className="grid grid-cols-2 gap-3">
                        <CustomInput
                            label={"Customer Name"}
                            name="customerName"
                            value={customerData.customerName}
                            onChange={handleCustomerDataChange}
                        />
                        <CustomInput
                            label={"Mobile Number"}
                            name="customerContact"
                            value={customerData.customerContact}
                            onChange={handleCustomerDataChange}
                        />
                    </div>
                    <table className="my-4 w-full border-collapse bg-white">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 border-2 border-gray-200">Item No</th>
                                <th className="p-3 border-2 border-gray-200">Item Name</th>
                                <th className="p-3 border-2 border-gray-200">Quantity</th>
                                <th className="p-3 border-2 border-gray-200">Amount Per Item</th>
                                <th className="p-3 border-2 border-gray-200">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receiptData.map((item, index) => (
                                <tr key={index} className="text-end">
                                    <td className="p-3 border">{item.itemNo}.</td>
                                    <td className="p-3 border">
                                        <ReceiptInput
                                            itemNo={item.itemNo}
                                            onChangeItemName={handleItemNameChange}
                                            options={availableMedicines.map(
                                                (medicine) => medicine.name
                                            )}
                                        />
                                    </td>
                                    <td className="p-3 border">
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={item.quantity}
                                            onChange={(e) => handleOnChange(item.itemNo, e)}
                                            onKeyDown={handleKeyDown}
                                            min={1}
                                            className="p-2 border border-gray-300 rounded w-full"
                                        />
                                    </td>
                                    <td className="p-3 border">{item.amountPerItem}</td>
                                    <td className="p-3 border">{item.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between">
                        <button
                            onClick={() => handleKeyDown({ key: "Enter" })}
                            className="text-sm flex items-center text-white my-2 py-2 px-4 rounded bg-blue-600"
                        >
                            Add Item <Plus size={15} className="ml-2" />
                        </button>

                        <div>
                            <label className="pr-4">Total Amount</label>
                            <input
                                disabled
                                value={totalAmount}
                                className="border p-2 my-auto"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        onClick={printRecept}
                        className="text-sm flex items-center text-white my-2 py-2 px-4 rounded bg-blue-600"
                    >
                        Print
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewReceipt;
