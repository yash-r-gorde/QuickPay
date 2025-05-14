import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { useSearchParams } from 'react-router-dom';
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [searchParams] = useSearchParams();
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()

    const _id = searchParams.get('_id');
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');

    return <div className=" flex h-screen w-screen justify-center items-center">
        <div className="shadow-sm flex items-center flex-col border w-[21rem] rounded-xl border-[#e7dbdb] p-3">
            <Heading label={"Send Money"} />
            <div className="flex gap-1 font-bold text-lg w-[19rem] mt-10">
                <div className="h-12 w-12 rounded-full bg-gray-800 text-white justify-center items-center flex">{firstName? firstName[0].toUpperCase() : "U"}</div>
                <div className="h-12 w-40 rounded-full justify-center items-center flex">{firstName + " " + lastName}</div>
            </div>
            <InputBox onChange={e => setAmount(Number(e.target.value))} placeholder={"Enter amount"} type={"text"} labelText={"Amount (in Rs)"} label={"amount"} />
            <div className="m-2">
                <Button onClick={async () => {
                    await axios.post('http://localhost:3021/api/v1/account/transfer', {
                        to: _id,
                        amount
                    }, {
                        headers: {
                            Authorization:  `Bearer ${localStorage.getItem('token')}`
                        }
                    })

                    navigate('/dashboard')
                }} buttonText={"Initiate Transfer"} />
            </div>
        </div>
    </div>
}
