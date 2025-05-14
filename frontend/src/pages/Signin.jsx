import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    return <div className="flex h-screen w-screen justify-center items-center">
        <div className="flex items-center flex-col border  w-[21rem] rounded-xl border-[#e7dbdb] p-3">
            <Heading label={"Sign in"} />
            <InputBox  onChange={e => setUsername(e.target.value)} placeholder={'yashgorde21@gmail.com'} label={"email"} labelText={"Username"} type={"email"} />
            <InputBox  onChange={e => setPassword(e.target.value)} placeholder={'12345678'} label={"password"} labelText={"Password"} type={"password"} />
            <div className="m-2">
                <Button onClick={async () => {
                    const response = await axios.post('http://localhost:3021/api/v1/user/signin', {
                        username,
                        password
                    })
                    if(response.status == 200) {
                        localStorage.setItem('token', response.data.token)
                        navigate('/dashboard')
                    } else {
                        navigate('/')
                    }
                }} buttonText={"Sign in"} />
            </div>
            <BottomWarning label={"Don't have an account"} buttonText={"Sign up"} to={"/signup"} />
        </div>
    </div>
}