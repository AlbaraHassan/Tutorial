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
        <div className='w3-panel w3-card-4 w3-center  w3-display-middle w3-padding-64 w3-animate-opacity'>
            <div className="text">
                {isSuccess ? <div className='w3-pale-green w3-round-xxlarge w3-border w3-animate-top'><p>Welcome {username}</p></div> : <></>}
                {isSuccess === false ? <div className='w3-pale-red w3-border w3-round-xxlarge w3-animate-top'>
                    <p>Wrong Username and Password Combination</p>
                    </div> : <></>}
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