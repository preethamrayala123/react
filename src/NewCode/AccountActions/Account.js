import React,{useState,useEffect} from 'react'
import './Account.css'
export default function Account(){
    const userId=localStorage.getItem('userId')
    const[userName,setUserName]=useState('')
    const[email,setEmail]=useState('')
    const[curPwd,setCurPwd]=useState('')
    const[newPwd,setNewPwd]=useState('')
    const[cfmPwd,setCfmPwd]=useState('')
    const[errorMsg,setErrorMsg]=useState('')
    const[userShowValue,setUserShowValue]=useState(true)
    const[emailShowValue,setEmailShowValue]=useState(true)
    const[pwdShowValue,setPwdShowValue]=useState(true)
    const [accountData,setAccountData]=useState({})
    //function to pull the data of userID
    const Account=async()=>{
        const userData={
            userId:userId
        }
        try{
        const response= await fetch('http://localhost:4000/Account',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(userData)
        })
        if(response.status===200){
            const account=await response.json()
            //console.log(account)
            if(account){
            setAccountData(account)
            setUserName(account.userName)
            setEmail(account.email)
            }
        }
        
        else if(response.status===404){
            console.log("usernot found!!!")
        }
        
    }catch(error){
        console.log("an error occured",error)
    }
    }
    //function to save the data change
    const handleSave=async(value)=>{
       var accountData;
        if(value==='userName'){
        const accountUserData={
            userId:userId,
            userName:userName
        }
        accountData=accountUserData;
    }
        if(value==='email'){
            const accountEmailData={
                userId:userId,
                email:email
            }
            accountData=accountEmailData
        }
        if(value==='pwd')
        {
            if(newPwd!==cfmPwd){
                setErrorMsg('password doesnot match')
                return
            }
            const accountPwdData={
                userId:userId,
                currentPassword:curPwd,
                newPassword:newPwd,
            }
            accountData=accountPwdData
        }
        try{
        const response=await fetch('http://localhost:4000/saveUserInfo',{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(accountData)
                
        })
        if(response.status===200){
           // const responseData=await response.json()
             await Account()
             if(value==='userName')
             {
                setUserShowValue(!userShowValue)
            }
            if(value==='email'){
                setEmailShowValue(!emailShowValue)
            }
             if(value==='pwd'){
                setPwdShowValue(!pwdShowValue)
                setCurPwd('')
                setNewPwd('')
                setCfmPwd('')
             }
            setErrorMsg('password updated successfully')
        }
        if(response.status===401 && value==='pwd'){
            setErrorMsg('Incorrect password')
        }
    }
    catch(error){
        console.error("an error occured")
    }
    }
    const handleEdit=(value)=>{
        if(value==='userName'){
            setUserShowValue(!userShowValue)
        }
        if(value==='email'){
            setEmailShowValue(!emailShowValue)
        }
        if(value==='pwd'){
            setPwdShowValue(!pwdShowValue)
            console.log(pwdShowValue)
        }
        
    }
    useEffect(()=>{
        Account()
    },[])

    return(
        <div>
            {/* user name code appears here */}
        <div>
            {
            userShowValue?
            <div className='form-group '>
                <label>User name:</label>
                {accountData.userName}
                <button onClick={()=>handleEdit('userName')}>Edit</button>
            </div>
            :
            <div className='form-group '>
            <label>User Name:</label>
            <input
            type="text"
            id='userName'
            value={userName}
            onChange={(e)=>{setUserName(e.target.value)}}
            className='custom-text'
            />
            <button onClick={()=>handleSave('userName')}>Save</button>
            <button onClick={()=>handleEdit('userName')}>Cancel</button>
            </div>
    }
        {/* email code appears here */}
        </div>
        <div>
            {
                emailShowValue?
                <div className='form-group'>
                    <label>Email:</label>
                    {accountData.email}
                    <button onClick={()=>handleEdit('email')}>Edit</button>
                </div>
                :
                <div className='form-group'>
                    <label>Email:</label>
                    <input
                    type='text'
                    id='email'
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <button onClick={()=>handleSave('email')}>Save</button>
                    <button onClick={()=>handleEdit('email')}>Cancel</button>
                </div>    
            }
        </div>
        {/* password code appears here */}
        <div>
            {   
                pwdShowValue?
                <div className='form-group'>
                    <label>Password:</label>
                    ***********
                    <button onClick={()=>handleEdit('pwd')}>Change Password</button>
                </div>
                :
                <div className='form-group'>
                    <label>Current password</label>   
                    <input
                    type='password'
                    id='password'
                    value={curPwd}
                    onChange={(e)=>setCurPwd(e.target.value)}
                    />
                    <br></br>
                    <label>New password</label>
                    <input
                    type='password'
                    id='nPassword'
                    value={newPwd}
                    onChange={(e)=>setNewPwd(e.target.value)}
                    />
                    <br></br>
                    <label>Confirm password</label>
                    <input
                    type='password'
                    id='cPassword'
                    value={cfmPwd}
                    onChange={(e)=>setCfmPwd(e.target.value)}
                    />
                    <button onClick={()=>handleSave('pwd')}>Save</button>
                    <button onClick={()=>handleEdit('pwd')}>Cancel</button>
                </div>
            }
            {errorMsg}
        </div>
        </div>
    )
}