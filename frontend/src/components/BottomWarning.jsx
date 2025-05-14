import { Link } from 'react-router-dom'
export function BottomWarning({label, buttonText, to}) {
    return <div className='flex gap-2 font-medium text-sm text-gray-900'>
        {label}?
        <Link to={to} className='underline'>{buttonText}</Link>
    </div>
}