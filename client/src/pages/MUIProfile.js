import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../features/user";


function MUIProfile() {
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()
    const fetchUser = async () => {
        const res = await axios.post("http://localhost:5000/user/get-me", {}, {
            "headers": {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })

        dispatch(loginUser(res.data))
    }

    useEffect(() => {
        if (JSON.stringify(user) === JSON.stringify({})) fetchUser()
    }, [])

    return (
        <>
            <div>{user.username}</div>
        </>
    )

}


export default MUIProfile