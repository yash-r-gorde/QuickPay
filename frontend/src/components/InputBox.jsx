export function InputBox({ placeholder, type, labelText, label, onChange}) {
    return <div className="w-[19rem] flex flex-col gap-1 m-1">
        <div>
            <label className="font-bold" htmlFor={label}>{labelText}</label>
        </div>
        <div>
            <input onChange={onChange} type={type} placeholder={placeholder} name={label} className="border border-[#e7dbdb] rounded-sm p-1.5 w-[19rem]" />
        </div>
    </div>
}