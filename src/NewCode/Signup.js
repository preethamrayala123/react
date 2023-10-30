import React,{useState}from 'react'
import './Signup.css'
import{Link} from 'react-router-dom'

export default function SignUp(){
    const[userName,setUserName]=useState('')
    const[userId,setUserID]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const[error,setError]=useState('')
    const[userType,setUserType]=useState('')
    const[s,setS]=useState('')

    const createUser = async () => {
      
        const userData = {
          userId:userId,
          userName: userName,
          email: email,
          password: password,
          userType:userType
        };
      
        try {
            const response = await fetch('http://localhost:4000/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            });
          
            //console.log('Response Status:', response.status);
            if (response.ok) {
                console.log('data sent succesfully')
              const responseData = await response.json();
              setError(responseData);
             // console.log('Response Data:', responseData);
            } else {
              const errorData = await response.json(); // Assuming the error response contains JSON data
              console.error('Error Data:', errorData);
              setError(errorData);
              console.log("error occured")
            }
          } catch (error) {
            console.error('An error occurred:', error);
            //setError('An error occurred while processing your request.');
          }
          
        
      }
      function isValidEmail(value){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      }
    const handleSubmit=(e)=>{
        e.preventDefault()
        setError('')
        if(password!==confirmPassword){
        setS("Password doesn't match")
        }
        else if(!(isValidEmail(email))){
            setS('Not a valid email')
        }
        else{
            setS('')
           createUser();
        }
        console.log(userType)
    }
    return(
        <div className="login-container">
          <form onSubmit={handleSubmit}>
          <h3>Create your account</h3>
            <div>
            <label>User ID</label>
              <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e)=>setUserID(e.target.value)}
              required
              />
             </div>
             <div>
             <label>User Name</label>
            <input
             type="text"
             id="userName"
             value={userName}
             onChange={(e)=>setUserName(e.target.value)}
             ></input>
             </div>
             <div>
            <label>Email</label>
            <input 
            type="Email" 
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            ></input>
            </div>
            <div>
            <label>Password</label>
            <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            ></input>
            </div>
            <div>
            <label>Confirm password</label>
            <input 
            type="password" 
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            ></input>
            <label>User Type</label>
            <select value={userType} onChange={(e)=>setUserType(e.target.value)} required>
            <option value="">Select user type</option>
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
            </select>
            <br></br>
            </div>
            <button type='submit'>Sign Up</button>
             {error.message} 
             {s}
             <hr className='line'/>
            <Link to={'/Signin'}>
            <button>Sign in</button>
            </Link>
            </form>
        </div>
    )
}