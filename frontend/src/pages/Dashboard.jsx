import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export default function Dashboard() {
    const [user, setUser] = useState({})

    useEffect(() => {
        axios({
            url: 'http://localhost:3021/api/v1/user/me',
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setUser(response.data.user)
        })
    }, [])

    return (
        <>
            <Appbar user={user.firstName + " " + user.lastName} />
            <Balance balance={user.balance / 100} />
            <Users />
        </>
    )
}