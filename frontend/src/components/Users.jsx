import { useEffect, useRef, useState } from 'react'
import { User } from './User'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export function Users() {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")
    const timeoutIdRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current)
        }

        timeoutIdRef.current = setTimeout(() => {
            axios.get(`http://localhost:3021/api/v1/user/bulk?filter=${filter}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setUsers(response.data.users)
                })
        }, 1000 * 0.1)

    }, [filter])

    return <div className="p-3">
        <div className="font-medium text-lg mb-2">Users</div>
        <div>
            <input onChange={e => setFilter(e.target.value)} type="text" name="search" placeholder="Search users..." className="border border-[#e7dbdb] rounded-sm p-1.5 w-full" />
            {users.map((user) => <User onClick={() => navigate(`/sendmoney?_id=${user._id}&firstName=${user.firstName}&lastName=${user.lastName}`)} key={user._id} user={`${user.firstName} ${user.lastName}`} />)}
        </div>
    </div>
}


