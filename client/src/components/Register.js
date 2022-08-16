import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Register() {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ isSame, setIsSame ] = useState(true)
    const [ isSuccess, setIsSuccess ] = useState()
    const navigate = useNavigate()


    const validatePassword = (e) => {
        if (password !== e.target.value) { setIsSame(false) }
        else { setIsSame(true) }
    }

    const handleSubmit = async () => {
        const body = {
            "username": username,
            "password": password,

        }
        const res = await axios.post("http://localhost:5000/user/register", body)
        if (res.data[ "msg" ]) {
            setIsSuccess(false)
            return
        }
        setIsSuccess(true)
        setTimeout(() => {
            navigate("/items")
        }, 3000);

    }

    return (
        <div className="text">
            {isSuccess ? <p>Regiteration Complete</p> : <></>}
            {isSuccess === false ? <p>An Error Occured</p> : <></>}
            <p>Enter Username:</p>
            <input onChange={(e) => { setUsername(e.target.value) }}></input>
            <p>Enter Password:</p>
            <input type="password" onChange={(e) => { setPassword(e.target.value) }}></input>
            <p>Enter Password Again:</p>
            <input type="password" onChange={(e) => { validatePassword(e) }}></input>
            {isSame ? <></> : <p>Passwords Do Not Match</p>}

            <button onClick={handleSubmit}>Submit</button>
        </div>

    )
}

export default Register