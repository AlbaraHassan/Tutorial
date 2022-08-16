import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Login() {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ isSame, setIsSame ] = useState(true)
    const [ isSuccess, setIsSuccess ] = useState()
    const navigate = useNavigate()


    const handleSubmit = async () => {
        setIsSuccess()
        const body = {
            "username": username,
            "password": password,

        }
        const res = await axios.post("http://localhost:5000/user/login", body)
        if (res.data[ "msg" ]) {
            setIsSuccess(false)
            return
        }
        localStorage.setItem('user', JSON.stringify(res.data));
        setIsSuccess(true)
        setTimeout(() => {
            navigate("/items")
        }, 1500);

    }

    return (
        <div className='center'>
            <div className="text">
                {isSuccess ? <p>Welcome {username}</p> : <></>}
                {isSuccess === false ? <p>Wrong Username and Password Combination</p> : <></>}
                <p>Enter Username:</p>
                <input onChange={(e) => { setUsername(e.target.value) }}></input>
                <p>Enter Password:</p>
                <input type="password" onChange={(e) => { setPassword(e.target.value) }}></input>

                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>

    )
}

export default Login