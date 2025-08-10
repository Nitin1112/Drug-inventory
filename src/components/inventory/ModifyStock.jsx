import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../common/CustomInput";
import { addMedicineToInventory, fetchInventoryStockItemById, inventoryUpdateStock } from "../../controllers/inventory.mjs";
import LoadingScreen from "../Loader";
import OverlayLoader from "../common/OverlayLoader";

const ModifyStock = () => {
    const navigator = useNavigate();
    const location = useLocation();

    // States
    const [loading, setLoading] = useState(false);
    const [medicine, setMedicine] = useState([]);


    //   State to handle stock data
    const [stockData, setStockData] = useState({
        stock: "",
        batchNumber: "",
        expiryDate: "",
        manufacturer: "",
        price: "",
    });

    const medicineData = location.state;

    useEffect(() => {
        const fetchResponse = async () => {
            setLoading(true);
            const response = await fetchInventoryStockItemById(medicineData._id, medicineData.batchNumber);

            if (!response.error) {
                setMedicine(response.data);
            }
            setLoading(false);
        }
        fetchResponse();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMedicine({
            ...medicine,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    //   Store Medicine Stock in DB
    const handleUpdateStock = async (e) => {
        setLoading(true);
        e.preventDefault();
        const finalMedStockData = {
            id: medicineData._id,
            ...medicine,
        };
        console.log(finalMedStockData);
        const response = await inventoryUpdateStock(finalMedStockData);
        console.log(response);
        if (response.error) {
            alert("Error: " + response.error);
        }
        if (!response.error) {
            navigator("/inventory/medicines");
        }

        setLoading(false);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {loading && <OverlayLoader />}
            {/* STOCK ENTRY POPUP */}
            {!loading && (
                <div className="max-w-5xl mx-auto bg-white p-5 rounded-lg shadow">
                    {/* Header */}
                    <header className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-700">
                                <Link to={"/inventory/medicines"}>Inventory</Link> &gt;{" "}
                                <Link to={"/inventory/medicines"}>List of Medicines</Link> &gt;{" "}
                                {medicineData.name} {medicine.batchNumber} &gt;{" "}
                                <span className="text-2xl text-black font-bold">Update Stock</span>
                            </h1>
                            <h2>update stock in the inventory.</h2>
                        </div>
                        <button
                            onClick={() => navigator("/inventory/medicines")}
                            className="bg-red-600 px-8 py-2.5 rounded-sm font-semibold text-white"
                        >
                            Cancel
                        </button>
                    </header>
                    <form onSubmit={handleUpdateStock}>
                        <div className="mt-12 grid grid-cols-2 gap-4">
                            <CustomInput
                                onChange={handleInputChange}
                                name="stock"
                                value={medicine.stock}
                                label="Stock"
                                type="text"
                                placeholder="Enter the stock"
                                required
                            />
                            <CustomInput
                                onChange={handleInputChange}
                                name="batchNumber"
                                value={medicine.batchNumber}
                                label="Batch Number"
                                type="text"
                                disabled
                                required
                            />
                            <CustomInput
                                onChange={handleInputChange}
                                name="expiryDate"
                                value={medicine.expiryDate ? medicine.expiryDate.split('T')[0] : ''}
                                label="Expiry Date (YYYY-MM-DD)"
                                type="date"
                                placeholder="Enter expiry date"
                                required
                            />
                            <CustomInput
                                onChange={handleInputChange}
                                name="price"
                                value={medicine.price}
                                label="Price"
                                type="text"
                                placeholder="Enter price"
                                required
                            />
                            <CustomInput
                                onChange={handleInputChange}
                                name="manufacturer"
                                value={medicine.manufacturer}
                                label="Manufacturer"
                                type="text"
                                placeholder="Enter manufacturer name"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-5 bg-green-600 px-8 py-2.5 rounded-sm font-semibold text-white"
                        >
                            Updatae Stock
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
export default ModifyStock;
