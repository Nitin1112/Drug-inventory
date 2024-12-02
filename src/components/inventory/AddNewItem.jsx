import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Controllers
import { addNewMedicineData, validateMedicineData } from '../../controllers/medicines.mjs';

// Components
import CustomInput, { CustomInputArea } from '../common/CustomInput';
import OverlayLoader from '../common/OverlayLoader';

const AddNewItem = () => {
    const [loading, setLoading] = useState(false);

    const [newMedicine, setNewMedicine] = useState({
        name: '',
        genericName: '',
        type: 'Medicine',
        group: '',
        manufacturer: '',
        description: '',
        howToUse: '',
        sideEffects: '',
        strength: '',
        form: '',
        price: '',
        requiresPrescription: false,
    });
    const navigator = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewMedicine({
            ...newMedicine,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const onSaveMedicine = async (medicine) => {
        if (validateMedicineData(medicine)) {
            console.log("Validating medicine data...");
            const response = await addNewMedicineData(medicine);
            if (response.error) {
                alert(`Error saving medicine ${response.error}`)
                return false;
            } else {
                alert(`Medicine saved ${response.message}`);
            }
            console.log("Medicine saved:", medicine);
            return true;
        } else {
            alert("Invalid medicine data.")
            console.log("Invalid medicine data.");
            return false;
        }
    };


    const handleSubmit = async () => {
        setLoading(true);
        const status = await onSaveMedicine(newMedicine);
        if (status) {
            setNewMedicine({
                name: '',
                genericName: '',
                type: 'Medicine',
                group: '',
                manufacturer: '',
                description: '',
                howToUse: '',
                sideEffects: '',
                strength: '',
                form: '',
                price: '',
                requiresPrescription: false,
            });
        }
        setLoading(false);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {loading && <OverlayLoader />}
            <div className="max-w-5xl mx-auto bg-white p-5 rounded-lg shadow">
                <header className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-700">
                            <span className="hover:cursor-pointer hover:text-black" onClick={() => navigator("/inventory")}>Inventory</span> &gt; <span className="hover:cursor-pointer hover:text-black" onClick={() => navigator("/inventory/medicines")}>List of Medicines</span> &gt; <span className="text-2xl text-black font-bold">Add New Item</span>
                        </h1>
                        <h2>*All fields are mandatory, except mentioned as (optional).</h2>
                    </div>
                    <button className="bg-red-500 px-8 py-2.5 rounded-sm font-semibold text-white hover:bg-red-600" onClick={() => navigator(-1)}>
                        Cancel
                    </button>
                </header>
                <div className="mt-12 grid grid-cols-2 gap-4">
                    <CustomInput onChange={handleInputChange} name="name" value={newMedicine.name} label="Medicine Name" type="text" />
                    <CustomInput onChange={handleInputChange} name="genericName" value={newMedicine.genericName} label="Generic Name (Optional)" type="text" />

                    <div className='flex flex-col'>
                        <label htmlFor='type' className='mb-2'>Category</label>
                        <select
                            id='type'
                            name="type"
                            value={newMedicine.type}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded-lg"
                        >
                            <option value="Medicine">Medicine</option>
                            <option value="Drug">Drug</option>
                        </select>
                    </div>

                    <CustomInput onChange={handleInputChange} name="group" value={newMedicine.group} label="Group Name" type="text" />
                    <CustomInput onChange={handleInputChange} name="manufacturer" value={newMedicine.manufacturer} label="Manufacturer Name" type="text" />
                    <CustomInput onChange={handleInputChange} name="strength" value={newMedicine.strength} label="Strength (e.g., 500mg)" type="text" />
                    <CustomInput onChange={handleInputChange} name="form" value={newMedicine.form} label="Form (e.g., tablet, syrup)" type="text" />
                    <CustomInput onChange={handleInputChange} name="price" value={newMedicine.price} label="Price" type="text" />
                    {/* <CustomInput onChange={handleInputChange} name="expiryDate" value={newMedicine.expiryDate} label="Expiry Date" type="date" /> */}

                    <CustomInputArea onChange={handleInputChange} className="col-span-2" name="description" value={newMedicine.description} label="Description (Optional)" />
                    <CustomInputArea onChange={handleInputChange} className="col-span-2" name="howToUse" value={newMedicine.howToUse} label="How to use" />
                    <CustomInputArea onChange={handleInputChange} className="col-span-2" name="sideEffects" value={newMedicine.sideEffects} label="Side Effects (Optional)" />

                    <div className="flex py-4 items-center gap-2">
                        <label htmlFor="requiresPrescription" className="">Requires Prescription</label>
                        <input
                            id='requiresPrescription'
                            type="checkbox"
                            name="requiresPrescription"
                            checked={newMedicine.requiresPrescription}
                            onChange={handleInputChange}
                            className="w-5 h-5"
                        />
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Add Medicine
                </button>
            </div>
        </div>
    );
};

export default AddNewItem;
