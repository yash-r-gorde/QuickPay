export function Button({buttonText, onClick}) {
    return <button onClick={onClick} type="button" className="font-medium bg-gray-800 text-white p-2 rounded-md w-[19rem] hover:bg-gray-900">
        {buttonText}    
    </button>
}
