import React, {useState,useEffect}from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './Address.css'

export default function Address(){
    const userId=localStorage.getItem('userId')
    const[addr,setAddr]=useState([])
    const Navigate=useNavigate()
    const[showAddAddress,setShowAddAddress]=useState(false)
    const[showEditAddress,setShowEditAddress]=useState(false)
    const[aline1,setAline1]=useState('')
    const[aline2,setAline2]=useState('')
    const[city,setCity]=useState('')
    const[state,setState]=useState('')
    const[zipCode,setZipCode]=useState('')
    const[resMessage,setResMessage]=useState('')
    const[addrId,setAddrId]=useState('')
    

    const accountAddresses=async()=>{
        const userData={
            userId:userId
        }
        try{
        const response=await fetch('http://localhost:4000/getAddresses',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(userData)
        })
        if(response.status===200){
            const responseData=await response.json()
            setAddr(responseData)
        }
        else{
            console.log('user not found')
        }
    }
    catch(error){
        console.error("Internal error occured")
    }
    }

    const handleEdit=async(id)=>{
        localStorage.setItem('addressId',id)
       // Navigate('/AccountHome/EditAddress')
       setShowEditAddress(true)
       const editAddr=addr.find((address)=>address._id===id)
       setAline1(editAddr.addLine1)
       setAline2(editAddr.addLine2)
       setCity(editAddr.city)
       setState(editAddr.state)
       setZipCode(editAddr.zipCode)
       setAddrId(editAddr._id)
    }

    const handleDelete=async(id)=>{
        console.log(id)
        try{
        const response=await fetch(`http://localhost:4000/deleteAddress/${id}`,{
            method:'DELETE'
        });
        if(response.status===200){
            //console.log('record deleted')
            accountAddresses()
        }
        else{
            console.log('error deleting record')
        }
    }
    catch(error){
        console.error("uncaught error",error)
    }
    }
    const clearAddressFields=()=>{
        setAline1('')
    setAline2('')
    setCity('')
    setState('')
    setZipCode('')
    setTimeout(() => {
        setResMessage('')
    }, 5000);
    }

    const handleSaveAddress=async(e)=>{
        e.preventDefault()
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
            console.log(responseData)
           // console.log('loop entered here')
            setResMessage(responseData.message)
            setShowAddAddress(false)
            accountAddresses()
            clearAddressFields()
        }
        else{
            const errorData=await response.json()
            setResMessage(errorData.message)
        }
    }

    const handleEditSave=async(id)=>{
        const userAddress={
            addLine1:aline1,
            addLine2:aline2,
            city:city,
            state:state,
            zipCode:zipCode,
        }
        try{
            const response=await fetch(`http://localhost:4000/saveUserAddress/${id}`,{
                method:'POST',
                headers:{
                'content-type':'application/json'
                },
                body:JSON.stringify(userAddress)
            })
            if(response.status===200){
                console.log('data saved succesfully')
                accountAddresses()
                setResMessage('Address updated successfully')
                setShowEditAddress(false)
                setTimeout(()=>{
                    setResMessage('')
                },5000)
            }
            else{
                console.log('error saving data')
            }
        }
        catch(error){

        }
    }

    const handleNewAddress=()=>{
         setShowAddAddress(true)
 
     }
 
     const handleCancel=()=>{
         setShowAddAddress(false)
     }
 
     const handleEditCancel=()=>{
         setShowEditAddress(false)
     }

    const closeHandleAddress=()=>{
        setShowAddAddress(false)
    }
    const closeHandleEditAddress=()=>{
        setShowEditAddress(false)
    }
    useEffect(()=>{
        accountAddresses()
    },[])


    return(
        <div>
            <button onClick={handleNewAddress}>Add new address</button>
            
            {showAddAddress&&(
                <div className='modal'>
                <div className='modalStyle'>
                    <span onClick={closeHandleAddress} className='closeModal'>&times;</span>
                <div>
                <form onSubmit={handleSaveAddress}>
            <h1>Enter new address here</h1>
            <label htmlFor='Aline1'>Address line1:</label>
            <input type='text'
            id='Aline1'
            value={aline1}
            onChange={(e)=>setAline1(e.target.value)}
            required
            />
            <label htmlFor='Aline2'> Address line2:</label>
            <input type='text'
            id='Aline2'
            value={aline2}
            onChange={(e)=>setAline2(e.target.value)}
            required
            />
            <label htmlFor='City'>City</label>
            <input type='text'
            id='City'
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            required
            />
            <label htmlFor='state'>State</label>
            <input
            type='text'
            id='state'
            value={state}
            onChange={(e)=>setState(e.target.value)}
            required
            />
            <label htmlFor='zipcode'>Zipcode</label>
            <input
            type='text'
            id='zipcode'
            value={zipCode}
            onChange={(e)=>setZipCode(e.target.value)}
            required
            />
            <br></br>
            <div className='button-modal'>
            <button type='submit'>Save</button>
            <button type='button' onClick={handleCancel}>Cancel</button>
            </div>
            </form>
                 </div> 
                 </div>  
                 </div>
            )
            }

            <br></br>

            {/* This code for displaying available addresses */}
            {
                <div>
                <div className='address-container'>
                    {
                        addr.map((address)=>(
                            <div className="address-box" key={address._id}>
                               <p> {address.addLine1}</p>
                               <p>{address.addLine2}</p>
                               <p>{address.city}</p>
                               <p>{address.state}</p>
                               <p>{address.zipCode}</p>
                               <div className='button-container'>
                                <button onClick={()=>handleEdit(address._id)}>Edit</button>
                                <button onClick={() => handleDelete(address._id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    }
                    
                </div> 
                <div className='successMessage'>
                {resMessage} 
                </div>
                </div>      
            }

            {/* This code for editing address */}

            {showEditAddress &&(
                 <div className='modal'>
                 <div className='modalStyle'>
                     <span onClick={closeHandleEditAddress} className='closeModal'>&times;</span>
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
            <div className='button-modal'>
             <button onClick={()=>handleEditSave(addrId)}>Save</button> 
             <button onClick={handleEditCancel}>Cancel</button>
             </div>
                </div>
                </div>
            )

            }
            
        </div>
    )
}