import React from 'react'
import './HeaderHome.css'
import {useNavigate} from 'react-router-dom'
export default function Headerhome(){
    const Navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('userId')
        localStorage.removeItem('addressId')
        localStorage.removeItem('selectedComponent')
        localStorage.removeItem('userType')
        Navigate('/Signin')
    }
    return(
        <div className='header'>
            <button className='logout-button' onClick={handleLogout}>Logout</button>
        </div>
    )
}