import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function EditAddress(){
    const[aline1,setAline1]=useState('')
    const[aline2,setAline2]=useState('')
    const[city,setCity]=useState('')
    const[state,setState]=useState('')
    const[zipCode,setZipCode]=useState('')
   const addressId=localStorage.getItem('addressId')
   const Navigate=useNavigate()

    const fetchAddress=async()=>{
        try{
        const response=await fetch(`http://localhost:4000/fetchAddress/${addressId}`,{
            method:'GET'
        })
        if(response.status===200){
            const responseData=await response.json()
            setAline1(responseData.addLine1)
            setAline2(responseData.addLine2)
            setCity(responseData.city)
            setState(responseData.state)
            setZipCode(responseData.zipCode)
        }
        else{
            console.log('error occured while fetching data')
        }
        }
        catch(error){
            console.error('Internal error occured')
        }
    }
    const handleSave=async()=>{
        const userAddress={
            addLine1:aline1,
            addLine2:aline2,
            city:city,
            state:state,
            zipCode:zipCode,
        }
        console.log('save button clicked')
        try{
            const response=await fetch(`http://localhost:4000/saveUserAddress/${addressId}`,{
                method:'POST',
                headers:{
                'content-type':'application/json'
                },
                body:JSON.stringify(userAddress)
            })
            if(response.status===200){
                console.log('data saved succesfully')
            }
            else{
                console.log('error saving data')
            }
        }
        catch(error){

        }
    }

    const handleCancel=()=>{
        Navigate(-1)
    }

    useEffect(()=>{
        fetchAddress()
    },[])

    return(
        <div>
            <h1>Update address here</h1>
            <label htmlFor='Aline1'>Address line1:</label>
            <input type='text'
            id='Aline1'
            value={aline1}
            onChange={(e)=>{setAline1(e.target.value)}}
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
             <button onClick={handleSave}>Save</button> 
             <button onClick={handleCancel}>Cancel</button>
        </div>
    )
}