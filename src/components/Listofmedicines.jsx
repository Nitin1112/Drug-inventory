import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetch_all_medicine,
  fetch_groups_available,
} from "../controllers/medicines.mjs";
import { useNavigate } from "react-router-dom";

import {
  addMedicineToInventory,
  fetchInventoryItems,
  inventoryUpdateStock,
} from "../controllers/inventory.mjs";
import CustomInput from "./common/CustomInput";
import LoadingScreen from "./Loader";
import OverlayLoader from "./common/OverlayLoader";

const Listofmedicines = () => {
  // Common states
  const [loading, setLoading] = useState(true);
  const [groupsAvailable, setGroupsAvailable] = useState([]);

  // Inventory specific states
  const [searchInventory, setSearchInventory] = useState("");
  const [inventoryMedicines, setInventoryMedicines] = useState([]);
  const [selectedGroupInventory, setSelectedGroupInventory] = useState("");

  // Available medicines specific states
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");


  const navigator = useNavigate();

  // Adding stocks to the inventory
  const addToInventory = async (index) => {
    console.log(medicines[index]);
    navigator("/inventory/medicine/stock", { state: medicines[index] });
  };

  // For navigating to the detailed medicine view
  const handleMedicineNavigate = (id) => {
    console.log(id);
    navigator(`${id}`);
  };

  // Adding stock to inventory
  const updateStock = async (e) => {
    e.preventDefault();
    if (updateStockState) {
      for (let med in inventoryMedicines) {
        console.log(inventoryMedicines[med]);
        if (inventoryMedicines[med]._id == updateStockId) {
          addMedicineToInventory(updateStockId, stock);
          setInventoryMedicines((priInventoryData) => {
            for (let i in priInventoryData) {
              if (priInventoryData[i]._id == updateStockId) {
                priInventoryData[i].stock = stock;
              }
            }
            return priInventoryData;
          });
          setUpdateStockState(false);
          alert("Stock updated successfully");
          return;
        }
      }
      alert("Stock cannot be updated");
      return;
    }
    const newInventoryMedicine = { stock: stock, ...medicines[stockIndex] };
    console.log(newInventoryMedicine._id);

    for (let med in inventoryMedicines) {
      console.log(inventoryMedicines[med]);
      if (inventoryMedicines[med]._id == newInventoryMedicine._id) {
        alert("Item already exists in inventory");
        return;
      }
    }
    setInventoryMedicines((inStockMedicines) => [
      ...inStockMedicines,
      newInventoryMedicine,
    ]);

    const response = await addMedicineToInventory(
      medicines[stockIndex]._id,
      stock
    );
    if (!response.error) {
      alert(`Error adding medicine ${response.error}`);
      return;
    }

    setUpdateStockState(false);
    setStock(1);
  };

  // Updating the stock in the inventory
  const onUpdateStock = async (med, index) => {
    console.log(med);
    console.log(index);
    console.log(med._id);
    navigator("update/stock", { state: { name: inventoryMedicines[index], ...med } })
  };

  const resetStock = (e) => {
    e.preventDefault();
  };

  // Fetch medicines and groups on component load
  useEffect(() => {
    const fetchResponse = async () => {
      const response = await fetch_all_medicine();
      const groupsAvailableResponse = await fetch_groups_available();
      const inventoryItemsResponse = await fetchInventoryItems();
      if (!response.error) {
        setMedicines(response.data);
      }
      if (!groupsAvailableResponse.error) {
        setGroupsAvailable(groupsAvailableResponse.data);
      }
      if (!inventoryItemsResponse.error) {
        setInventoryMedicines(inventoryItemsResponse.data);
        console.log(inventoryMedicines);
      }
      setLoading(false);

    };
    fetchResponse();
  }, []);

  // Handle deleting a medicine
  const deleteMedicine = (index) => {
    const updatedMedicines = inventoryMedicines.filter((_, i) => i !== index);
    setInventoryMedicines(updatedMedicines);
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
                Inventory &gt;{" "}
                <span className="text-2xl text-black font-bold">
                  List of Medicines ({inventoryMedicines.length})
                </span>
              </h1>
              <h2>List of medicines available for inventory.</h2>
            </div>
            <button
              onClick={() => navigator("update")}
              className="bg-blue-600 px-8 py-2.5 rounded-sm font-semibold text-white"
            >
              Add New Item
            </button>
          </header>

          <div className="my-8">
            {/* MEDICINES IN INVENTORY */}
            <div className="flex items-center justify-between mb-4">
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search Inventory..."
                className="border border-gray-300 p-2 rounded-lg w-1/2"
                value={searchInventory}
                onChange={(e) => setSearchInventory(e.target.value)}
              />

              {/* Dynamic Select Dropdown */}
              <select
                className="border border-gray-300 p-2 rounded-lg"
                onChange={(e) => setSelectedGroupInventory(e.target.value)}
              >
                <option value="">- Select Group -</option>
                {groupsAvailable.map((group, index) => (
                  <option key={index} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* Table */}
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border-2 border-gray-200">
                    Medicine Name
                  </th>
                  <th className="p-3 border-2 border-gray-200">Batch No</th>
                  <th className="p-3 border-2 border-gray-200">Group Name</th>
                  <th className="p-3 border-2 border-gray-200">Stock in Qty</th>
                  <th className="p-3 border-2 border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventoryMedicines.length !== 0 &&
                  inventoryMedicines
                    .filter(
                      (med) =>
                        med.name
                          .toLowerCase()
                          .includes(searchInventory.toLowerCase()) &&
                        med.group
                          .toLowerCase()
                          .includes(selectedGroupInventory.toLowerCase())
                    )
                    .map((medicine, index) => (
                      <tr
                        key={index}
                        className={`cursor-pointer ${medicine.minimumCap &&
                          medicine.minimumCap > medicine.stock
                          ? "bg-red-400 hover:bg-red-500"
                          : "hover:bg-gray-50"
                          }`}
                        onDoubleClick={() =>
                          handleMedicineNavigate(medicine._id)
                        }
                      >
                        <td className="p-3 border m-auto">{medicine.name}</td>
                        <td className="p-3 border m-auto">
                          {medicine.batchNumber}
                        </td>
                        <td className="p-3 border m-auto">{medicine.group}</td>
                        <td className="p-3 border m-auto">{medicine.stock}</td>
                        <td className="p-3 border flex flex-col items-center gap-2">
                          <button
                            className="m-auto text-yellow-500 hover:underline flex items-center m-3"
                            onClick={() => onUpdateStock(medicine, index)}
                          >
                            <FontAwesomeIcon icon={faEdit} /> Update Stock
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>

            {inventoryMedicines.filter((med) =>
              med.name.toLowerCase().includes(searchInventory.toLowerCase())
            ).length === 0 && (
                <div className="flex py-5 flex-row w-full justify-center items-center border-2 border-t-0">
                  <h2>Inventory is Empty</h2>
                </div>
              )}
          </div>

          {/* AVAILABLE MEDICINES IN THE DATABASE OF THE USER */}
          {/* Search and Filter */}
          <h2 className="text-2xl font-semibold mb-2">
            List of medicines available
          </h2>
          <div className="flex items-center justify-between mb-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search for Medicine..."
              className="border border-gray-300 p-2 rounded-lg w-1/2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Dynamic Select Dropdown */}
            <select
              className="border border-gray-300 p-2 rounded-lg"
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="">- Select Group -</option>
              {groupsAvailable.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-2 border-gray-200">Medicine Name</th>
                <th className="p-3 border-2 border-gray-200">Item Type</th>
                <th className="p-3 border-2 border-gray-200">Group Name</th>
                {/* <th className="p-3 border-2 border-gray-200">Stock in Qty</th> */}
                <th className="p-3 border-2 border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.length !== 0 &&
                medicines
                  .filter(
                    (med) =>
                      med.name.toLowerCase().includes(search.toLowerCase()) &&
                      med.group
                        .toLowerCase()
                        .includes(selectedGroup.toLowerCase())
                  )
                  .map((medicine, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-3 border m-auto">{medicine.name}</td>
                      <td className="p-3 border m-auto">{medicine.type}</td>
                      <td className="p-3 border m-auto">{medicine.group}</td>
                      {/* <td className="p-3 border m-auto">{medicine.stock}</td> */}
                      <td className="p-3 border m-auto flex gap-2">
                        <button
                          className="text-yellow-500 flex items-center gap-1"
                          onClick={() => addToInventory(index)}
                        >
                          <FontAwesomeIcon icon={faPlusCircle} /> Add To
                          Inventory
                        </button>
                        {/* <button
                          className="text-red-500 flex items-center gap-1"
                          onClick={() => deleteMedicine(index)}
                        >
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button> */}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {medicines.filter((med) =>
            med.name.toLowerCase().includes(search.toLowerCase())
          ).length === 0 && (
              <div className="flex mt-5 flex-row w-full justify-center items-center">
                <h2>Nothing to Display</h2>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default Listofmedicines;
