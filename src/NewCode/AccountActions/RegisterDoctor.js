import React,{useState} from 'react'

const RegisterDoctor = () => {
    const[docName,setDocName]=useState('')
    const[Specialization,setSpecialization]=useState('')
    const[isAvailable,setIsAvailable]=useState(false)

    const handleSaveDoctor=async()=>{
       const docData={
            docName:docName,
            Specialization:Specialization,
            isAvailable:true
        }
        try{
        const response=await fetch('http://localhost:4000/saveDoc',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(docData)
        })

        }
        catch(error){
            console.error(error)
        }

    }

    const saveDoctor=(e)=>{
        e.preventDefault()
        console.log()
        handleSaveDoctor()
    }
  return (
    <div>
        <form onSubmit={saveDoctor}>
            <label>Name:</label>
            <input type='text' value={docName} onChange={(e)=>setDocName(e.target.value)}required/>
            <label>Specialization:</label>
            <input type='text' value={Specialization} onChange={(e)=>setSpecialization(e.target.value)} required/>
            {/* <label>Available</label>
            <input type='checkbox' value={isAvailable} onChange={(e)=>setIsAvailable(!isAvailable)}/> */}
            <button type='submit'>Save</button>
        </form>
    </div>
  )
}

export default RegisterDoctor