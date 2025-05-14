export function User({user, onClick}) {
    return <div className="font-medium items-center flex justify-between mb-2 mt-3">
        <div className="flex items-center justify-center gap-2">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-xl">{user.split('')[0].toUpperCase()}</div>
        <div className="w-32 h-12 flex items-center pl-2">{user}</div>
        </div>
        <div>
            <button onClick={onClick} className="bg-gray-800 hover:bg-gray-900 h-8 w-32 text-white rounded-md text-sm">Send Money</button>
        </div>
    </div>
}