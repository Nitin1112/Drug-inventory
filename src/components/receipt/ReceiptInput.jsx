import { useState } from "react";
import PropTypes from "prop-types";

const ReceiptInput = ({ itemNo, onChangeItemName, options }) => {
    const [name, setName] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setName(inputValue);
        filter(inputValue);

        if (options.includes(inputValue)) {
            onChangeItemName(itemNo, inputValue);
        }
    };

    const filter = (inputValue) => {
        const lowerInput = inputValue.toLowerCase();
        setFilteredOptions(
            options.filter((item) => {
                const lowerItem = item.toLowerCase();
                return lowerInput !== "" && lowerInput !== lowerItem && lowerItem.includes(lowerInput);
            })
        );
    };

    return (
        <div className="relative inline-block w-full">
            <input
                type="text"
                onChange={handleChange}
                value={name}
                placeholder="Medicine Name"
                aria-label="Search"
                className="p-2 border border-gray-300 rounded w-full"
            />
            {/* Dropdown Content */}
            <div
                className={
                    `absolute top-full right-0 mt-2 bg-white border-gray-300 shadow-lg rounded w-full z-10
                    ${name != "" && filteredOptions.length > 0 ? "flex flex-col border" : "hidden"}`
                }
                style={{ maxHeight: "300px", overflowY: "auto" }}
            >
                {filteredOptions.map((option, index) => (
                    <div
                        key={index}
                        tabIndex={0}
                        className="text-sm cursor-pointer hover:bg-gray-100 px-4 py-2"
                        onClick={() => {
                            setName(option);
                            setFilteredOptions([]);
                            if (options.includes(option)) {
                                onChangeItemName(itemNo, option);
                            }
                        }}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};
ReceiptInput.propTypes = {
    itemNo: PropTypes.any,
    onChangeItemName: PropTypes.func,
    options: PropTypes.array.isRequired,
};

export default ReceiptInput;
