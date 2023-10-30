import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function NewAddress(){
    const userId=localStorage.getItem('userId')
    const[aline1,setAline1]=useState('')
    const[aline2,setAline2]=useState('')
    const[city,setCity]=useState('')
    const[state,setState]=useState('')
    const[zipCode,setZipCode]=useState('')
    const[resMessage,setResMessage]=useState('')
    const Navigate=useNavigate()

    const saveAddress=async()=>{
        const newAddr={
            userId:userId,
            aline1:aline1,
            aline2:aline2,
            city:city,
            state:state,
            zipCode:zipCode
        };

        const response= await fetch('http://localhost:4000/saveNewAddress',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newAddr)
        })
        if(response.status===200){
            const responseData=await response.json()
            setResMessage(responseData.message)
        }
        else{
            const errorData=await response.json()
            setResMessage(errorData.message)
        }
    }
    
    const handleSave=(e)=>{
        e.preventDefault()
        console.log('printing')
        saveAddress()
    }
    const handleCancel=()=>{
        Navigate(-1)
    }
    return(
        <div>
            <form onSubmit={handleSave}>
            <h1>Enter new address here</h1>
            <label htmlFor='Aline1'>Address line1:</label>
            <input type='text'
            id='Aline1'
            value={aline1}
            onChange={(e)=>{setAline1(e.target.value)}}
            required
            />
            <label htmlFor='Aline2'> Address line2:</label>
            <input type='text'
            id='Aline2'
            value={aline2}
            onChange={(e)=>{setAline2(e.target.value)}}
            />
            <label htmlFor='City'>City</label>
            <input type='text'
            id='City'
            value={city}
            onChange={(e)=>{setCity(e.target.value)}}
            />
            <label htmlFor='state'>State</label>
            <input
            type='text'
            id='state'
            value={state}
            onChange={(e)=>setState(e.target.value)}
            />
            <label htmlFor='zipcode'>Zipcode</label>
            <input
            type='text'
            id='zipcode'
            value={zipCode}
            onChange={(e)=>setZipCode(e.target.value)}
            />
            <br></br>
            <button type='submit'>Save</button>
            <button type='button' onClick={handleCancel}>Cancel</button>
            {resMessage}
            </form>
        </div>
    )
}