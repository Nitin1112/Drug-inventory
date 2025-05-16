import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../common/CustomInput";
import { addMedicineToInventory } from "../../controllers/inventory.mjs";

const UpdateStock = () => {
  const navigator = useNavigate();
  const location = useLocation();

  // States
  const [loading, setLoading] = useState(false);

  //   State to handle stock data
  const [stockData, setStockData] = useState({
    stock: "",
    batchNumber: "",
    expiryDate: "",
    manufacturer: "",
    price: "",
  });

  const medicineData = location.state;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStockData({
      ...stockData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //   Store Medicine Stock in DB
  const handleAddStock = async (e) => {
    setLoading(true);
    e.preventDefault();
    const finalStockData = {
      medicineId: medicineData._id,
      ...stockData,
    };
    console.log(finalStockData);
    const response = await addMedicineToInventory(finalStockData);
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
      {loading && <p>Loading...</p>}
      {/* STOCK ENTRY POPUP */}
      {!loading && (
        <div className="max-w-5xl mx-auto bg-white p-5 rounded-lg shadow">
          {/* Header */}
          <header className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-700">
                <Link to={"/inventory/medicines"}>Inventory</Link> &gt;{" "}
                <Link to={"/inventory/medicines"}>List of Medicines</Link> &gt;{" "}
                {medicineData.name} &gt;{" "}
                <span className="text-2xl text-black font-bold">Add Stock</span>
              </h1>
              <h2>Add new stock to the inventory.</h2>
            </div>
            <button
              onClick={() => navigator("/inventory/medicines")}
              className="bg-red-600 px-8 py-2.5 rounded-sm font-semibold text-white"
            >
              Cancel
            </button>
          </header>
          <form onSubmit={handleAddStock}>
            <div className="mt-12 grid grid-cols-2 gap-4">
              <CustomInput
                onChange={handleInputChange}
                name="stock"
                value={stockData.stock}
                label="Stock"
                type="text"
                placeholder="Enter the stock"
                required
              />
              <CustomInput
                onChange={handleInputChange}
                name="batchNumber"
                value={stockData.batchNumber}
                label="Batch Number"
                type="text"
                placeholder="Enter the batch number"
                required
              />
              <CustomInput
                onChange={handleInputChange}
                name="expiryDate"
                value={stockData.expiryDate}
                label="Expiry Date (YYYY-MM-DD)"
                type="text"
                placeholder="Enter expiry date"
                required
              />
              <CustomInput
                onChange={handleInputChange}
                name="price"
                value={stockData.price}
                label="Price"
                type="text"
                placeholder="Enter price"
                required
              />
              <CustomInput
                onChange={handleInputChange}
                name="manufacturer"
                value={stockData.manufacturer}
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
              Add Stock
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default UpdateStock;
