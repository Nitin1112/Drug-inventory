const CustomInput = ({ onChange, value, label, className, ...props }) => {
    return <div className={"flex flex-col " + className}>
        <label htmlFor={label} className='mb-2'>{label}</label>
        <input
            id={label}
            value={value}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded-lg"
            {...props}
        />
    </div>
}

export default CustomInput;

export const CustomInputArea = ({ onChange, value, label, className, ...props }) => {
    return <div className={'col-span-2 flex flex-col ' + className} >
        <label htmlFor={label} className='mb-2'>{label}</label>
        <textarea
            id={label}
            value={value}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded-lg"
            {...props}
        />
    </div>
}
