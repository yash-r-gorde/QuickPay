import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    return <div className="flex h-screen w-screen justify-center items-center">
        <div className="flex items-center flex-col border w-[21rem] rounded-xl border-[#e7dbdb] p-3">
            <Heading label={"Sign up"} />
            <SubHeading label={"Enter your information to create an account"} />
            <InputBox onChange={(e) => {
                setFirstName(e.target.value)
            }} placeholder={'Yash'} label={"firstName"} labelText={"First Name"} type={"text"} />
            <InputBox onChange={(e) => {
                setLastName(e.target.value)
            }} placeholder={'Gorde'} label={"lastName"} labelText={"Last Name"} type={"text"} />
            <InputBox onChange={(e) => {
                setUsername(e.target.value)
            }} placeholder={'yashgorde21@gmail.com'} label={"email"} labelText={"Username"} type={"email"} />
            <InputBox onChange={(e) => {
                setPassword(e.target.value)
            }} placeholder={'12345678'} label={"password"} labelText={"Password"} type={"password"} />
            <div className="m-2">
                <Button onClick={async () => {
                    const response = await axios.post('http://localhost:3021/api/v1/user/signup', {
                        username,
                        firstName,
                        lastName,
                        password
                    });
                    localStorage.setItem("token", response.data.token) 
                    navigate("/dashboard")
                }} buttonText={"Sign up"} />
            </div>
            <BottomWarning label={"Already have an account"} buttonText={"Sign in"} to={"/signin"} />
        </div>
    </div>
}