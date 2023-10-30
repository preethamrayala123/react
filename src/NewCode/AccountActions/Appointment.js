import React,{useState,useEffect} from 'react'
import './Appointment.css'

export default function Appointments(){
    const[bookTab,showBookTab]=useState(false)
    const[viewTab,showViewTab]=useState(false)
    const[docList,setDocList]=useState([])
    const[docName,setDocName]=useState([])
    const[Specialization,setSpecialization]=useState([])
    const[docSpecialization,setDocSpecialization]=useState('')
    const[doc,setDoc]=useState('')
    const[appDate,setAppDate]=useState('')
    const[sTime,setSTime]=useState('')
    const[patName,setPatName]=useState('')
    const[patAge,setPatAge]=useState('')
    const userId=localStorage.getItem('userId')
    //const[eTime,setETime]=useState('')
    
    const fetchDoctors=async()=>{
        try{
        const response=await fetch('http://localhost:4000/fetchAvailableDoc',{
            method:'GET'
        })
        if(response.status===200){
            console.log('doctors fetched successfully')
            const responseData=await response.json()
            setDocList(responseData)
            const SpecializationList=[...new Set(responseData.map((doc)=>doc.Specialization))]
            setSpecialization(SpecializationList)
        }
        else{
            console.log('failed to fetch doctors')
        }
    }
    catch(error){
        console.error('error occurred',error)
    }
    }

    const handleAppointments=async(e)=>{
        e.preventDefault()
        try{
            const appData={
                userId:userId,
                patName:patName,
                patAge:patAge,
                specialization:docSpecialization,
                docName:doc,
                appDate:appDate,
                sTime:sTime,
            }
            const response=await fetch('http://localhost:4000/saveAppointment',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(appData)
            })
            if(response.status=200){
                console.log('Appointment saved successfully')
            }
            else{
                console.log('error saving appointments')
            }
        }
        catch(e){

        }
    }

    const handleBookApp=()=>{
        showBookTab(true)
        showViewTab(false)
    }

    const handleViewApp=()=>{
        showViewTab(true)
        showBookTab(false)
    }

    //for fetching all the available doctors list 
    useEffect(()=>{
        fetchDoctors()
    },[])
    const setTime=()=>{
        const utcDateTimeString = '2023-10-26T09:09:00.000+00:00';
const utcDateTime = new Date(utcDateTimeString);
const gmtMinus5DateTime = new Date(utcDateTime.getTime() - (5 * 3600000)); // Subtracting 5 hours in milliseconds

console.log('time is',gmtMinus5DateTime);
    }
    useEffect(()=>{
        setTime()
    },[])

    //for filtering doctors based on Specialization
    useEffect(()=>{
        const docList1=docList.filter((doc)=>doc.Specialization===docSpecialization).map((doc)=>doc.docName)
       setDocName(docList1)
    },[docSpecialization])

    //for setting end time

    // useEffect(()=>{
    //   //  const endTime=addOneHour(sTime)
    //     setETime(sTime)
    //     console.log(sTime)
    // },[sTime])

    return(
        <div>
            <h2>Book your appointment here</h2>
            <div className='button-bar'>
            <button className='button' onClick={handleBookApp}>Book</button>
            <button className='button' onClick={handleViewApp}>View</button>
           </div>

            {
                bookTab &&(
                    <div>
                        <form onSubmit={handleAppointments}>
                   <label>Name:</label>     
                   <input type='text' value={patName} onChange={(e)=>setPatName(e.target.value)}/>
                   <label>Age:</label>
                   <input type='number' value={patAge} onChange={(e)=>setPatAge(e.target.value)}/>
                   <label>Category</label>
                   <select value={docSpecialization} onChange={(e)=>setDocSpecialization(e.target.value)}>
                    <option value=""> Select Category</option>
                    {
                        Specialization.map((docDes)=>
                        <option key={docDes} value={docDes}>{docDes}</option>
                        )
                    }
                   </select>
                   <label>Available doctors:</label>
                    <select value={doc} onChange={(e)=>setDoc(e.target.value)}>
                        <option value="">select Doctor</option>
                        {
                           docName.map((doc)=>
                           <option key={doc} value={doc}>{doc}</option>
                           )
                        }
                    </select>    
                   <label>Date</label>
                   <input type='datetime-local' value={appDate} onChange={(e)=>setAppDate(e.target.value)}/>
                   <label>Start time:</label>
                   <input type='time' value={sTime} onChange={(e)=>setSTime(e.target.value)}/>
                   {/* <label>End time:</label>
                   <input type='time' value={eTime} onChange={(e)=>setETime(e.target.value)}/> */}
                   <button type='submit'>Book Appointment</button>
                   </form>
                    </div>
                )
            }
            {
                viewTab &&(
                    <div>
                    
                    </div>
                )
            }
        </div>
    )
}