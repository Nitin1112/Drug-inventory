import { useEffect, useState } from "react";
import { fetchMedicineDataById } from "../../controllers/medicines.mjs";
import { useNavigate, useParams } from "react-router-dom";

const SingleMedicine = () => {
    const [loading, setLoading] = useState(false);
    const [medicineData, setMedicinesData] = useState({});

    // Navigator
    const navigator = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchResponse = async () => {
            setLoading(true);
            const response = await fetchMedicineDataById(id);
            // console.log(response.data);

            if (!response.error) {
                setMedicinesData(response.data);
            }
            setLoading(false);
        }
        fetchResponse();
    }, []);


    return <div className="p-6 min-h-screen">
        {!loading && (
            <div className="max-w-5xl mx-auto p-5 rounded-lg">
                {/* Header */}
                <header className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-700">
                            <span className="hover:cursor-pointer hover:text-black" onClick={() => navigator("/inventory")}>Inventory</span> &gt; <span className="hover:cursor-pointer hover:text-black" onClick={() => navigator("/inventory/medicines")}>List of Medicines</span> &gt;<span className="text-2xl text-black font-bold">{medicineData.name}</span>
                        </h1>
                        <h2></h2>
                    </div>
                    {/* <button onClick={() => navigator("update")}
                        className='bg-blue-600 px-8 py-2.5 rounded-sm font-semibold text-white'>
                        Add New Item
                    </button> */}
                </header>

                {/* Details */}
                <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                    <div className="border rounded-md bg-white">
                        <div className="font-semibold px-5 py-2 text-lg border-b">Medicine</div>
                        <div className="flex flex-row justify-between">
                            <div className="px-5 my-5">
                                <div className="font-bold text-lg">
                                    {medicineData.name}
                                </div>
                                <div className="mt-2 font-semibold text-gray-700">
                                    Medicine Name
                                </div>
                            </div>
                            <div className="px-5 my-5">
                                <div className="font-bold text-lg">
                                    {medicineData.group}
                                </div>
                                <div className="mt-2 font-semibold text-gray-700">
                                    Medicine Group
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border w-min-fit rounded-md bg-white">
                        <div className="font-semibold px-5 py-2 text-lg border-b">
                            Inventory in Qtyy
                        </div>
                        <div className="flex flex-wrap flex-row justify-between">
                            <div className="px-5 my-5">
                                <div className="font-bold text-lg">
                                    {medicineData.lifetimeSupply}
                                </div>
                                <div className="mt-2 font-semibold text-gray-700">
                                    Lifetime Supply
                                </div>
                            </div>
                            <div className="px-5 my-5">
                                <div className="font-bold text-lg">
                                    {medicineData.lifetimeSales}
                                </div>
                                <div className="mt-2 font-semibold text-gray-700">
                                    Lifetime Sales
                                </div>
                            </div>
                            <div className="px-5 my-5">
                                <div className="font-bold text-lg">
                                    {medicineData.stock}
                                </div>
                                <div className="mt-2 font-semibold text-gray-700">
                                    Stock Left
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border col-span-2 w-min-fit rounded-md bg-white">
                        <div className="font-semibold px-5 py-2 text-lg border-b">
                            Description
                        </div>
                        <div className="px-5 my-5 mt-2 font-semibold text-slate-800">
                            {medicineData.description ? medicineData.description : "No Preparations available"}
                        </div>
                    </div>
                    <div className="border col-span-2 w-min-fit rounded-md bg-white">
                        <div className="font-semibold px-5 py-2 text-lg border-b">
                            How to use
                        </div>
                        <div className="px-5 my-5 mt-2 font-semibold text-slate-800">
                            {medicineData.howToUse ? medicineData.howToUse : "No Preparations available"}
                        </div>
                    </div>
                    <div className="border col-span-2 w-min-fit rounded-md bg-white">
                        <div className="font-semibold px-5 py-2 text-lg border-b">
                            Side Effects
                        </div>
                        <div className="px-5 my-5 mt-2 font-semibold text-slate-800">
                            {medicineData.sideEffect ? medicineData.sideEffect : "No Side Effects"}
                        </div>
                    </div>
                </div>
            </div>)}
    </div>;
}

export default SingleMedicine;
