import PropTypes from 'prop-types';

const SelectDropdown = ({ items, value, onChange }) => {
    return (
      <div className="flex m-auto mr-2 items-center justify-between">
        <span className="ml-4 text-gray-700 font-medium">Payment Method</span>
        <select
          className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={value}
          onChange={onChange}
        >
          {items &&
            items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
        </select>
      </div>
    );
};

SelectDropdown.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SelectDropdown;
