export function Appbar({user}) {
    return <div className="shadow-2xs font-medium items-center flex justify-between border-b border-b-[#e7dbdb] p-3">
        <div className="text-xl">Paytm App</div>
        <div className="flex items-center justify-center gap-2">
        <div className="w-50 h-12 flex justify-center items-center">Hello, {user}</div>
        <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-xl">{user.split('')[0].toUpperCase()}</div>
        </div>
    </div>
}