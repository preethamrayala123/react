import React,{useState} from 'react'
import './Forgotpwd.css'
import {Link} from 'react-router-dom'
export default function ForgotPwd(){
    const[userId,setUserId]=useState('')
    const[pwd,setPwd]=useState('')
    const[cPwd,setCPwd]=useState('')
   // const[resMessage,setResMessage]=useState('')
    const[dMessage,setDMessage]=useState('')
    
    const authenticateUser=async()=>{
        
        const userData={
            userId:userId,
            password:pwd,
        };
        
        try{
            const response= await fetch('http://localhost:4000/ForgotPwd',{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(userData)
            });
            if(response.status===200){
                const responseData=await response.json()
                if(responseData){
                    setDMessage("password updated successfully")
                }
            }
            else if(response.status===401){
                const errorData=await response.json()
                if(errorData)
                {
                    setDMessage("Password cannot be same")
                }
            }
            else{
                const errorData=await response.json()
                if(errorData){
                    //setResMessage(errorData)
                    if(response.status===404){
                        setDMessage("User not found")
                    }
                }
            }
        }
        catch(error){
            console.error('error occured')
        }
    }
    
    function handleSubmit(e){
        e.preventDefault();
        if(pwd===cPwd){
        authenticateUser();
        }
        else{
            setDMessage("Password doesn't match")
        }
    }
    return( 
    <div className="login-container">
        <h3> Forgot Password</h3>
        <label>User ID</label>
        <input 
        type='text'
        id='userId'
        value={userId}
        onChange={(e)=>{setUserId(e.target.value)}}
        />
        <label>Password</label>
        <input
        type='password'
        id='pwd'
        value={pwd}
        onChange={(e)=>{setPwd(e.target.value)}}
        />
        <label>Confirm Password</label>
        <input
        type='password'
        id='cPwd'
        value={cPwd}
        onChange={(e)=>{setCPwd(e.target.value)}}
        />
        <button type='submit' onClick={handleSubmit}>Submit</button>
        {dMessage}
        <br></br>
        <Link to={'/Signin'}>Sign in</Link>
    </div>
    )
}