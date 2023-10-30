import React,{useState} from 'react'
import './Login.css'
import {Link} from'react-router-dom'
import {useNavigate} from 'react-router-dom'

export default function Signin(){

    const[userId,setUserId]=useState('')
    const[password,setPassword]=useState('')
    const[successMessage,setSuccessMessage]=useState('')
    const Navigate = useNavigate();
    
   const authenticateUser=async()=>{
    const userData={
        userId:userId,
        password:password,
    };
    try{
    const response=await fetch('http://localhost:4000/Signin',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(userData)
    });
    if(response.status===200){
    const responseData=await response.json()
    if(responseData){
   // setSuccessMessage(responseData);
    Navigate('/AccountHome')
    localStorage.setItem('userId',userData.userId)
    localStorage.setItem('userType',responseData.userType)
    }
    }
    else{
        const errorData=await response.json()
        setSuccessMessage(errorData)
        console.log(successMessage.message)
    }
}
catch(error){
    console.log("error occurred")
}
}

    function handleSubmit(event){
        event.preventDefault()
        authenticateUser()
    }

    return(
             <div className='login-container'>
            <label>Username</label>
            <input className='input-box' 
             type="text"
             id="userId"
             value={userId}
             onChange={(e)=>setUserId(e.target.value)}
             />
            <label>Password</label>
            <input
             type="password"
             id="password"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
            /><br></br><br></br>
            <div className="button-container">
            <button type="submit" onClick={handleSubmit} className='sign-in'>Sign in</button>
            <hr className='line'/>
            <Link to={'/Signup'}>
            <button>Sign up</button>
            </Link>
            {successMessage.message}
            </div>
            <Link to={'/ForgotPassword'}>Forgot password?</Link>
        </div>
         
    )
}