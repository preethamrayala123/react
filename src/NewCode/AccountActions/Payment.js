import React, { useState,useEffect } from 'react';
import './Modal.css';

const Payment = () => {
    const userId=localStorage.getItem('userId')
  const [showModal, setShowModal] = useState(false);
  const[nameOnCard,setNameOnCard]=useState('')
  const[expiryYear,setExpiryYear]=useState()
  const[expiryMonth,setExpiryMonth]=useState()
  const[cardNumber,setCardNumber]=useState('')
  const[cvv,setCvv]=useState('')
  const[errorMessage,setErrorMessage]=useState('')
  const[savedCards,setSavedCards]=useState([])
  const[editCard,setEditCard]=useState(false)

  const years=[]
  const currentYear=new Date().getFullYear();
  let currentMonth=new Date().getMonth();
  currentMonth=currentMonth+1;
  for(let i=0;i<10;i++){
    years.push(currentYear+i)
  }
  const month=[]
  for(let i=0;i<12;i++){
    month.push(i+1)
  }
  

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    
  };


  const saveCard=async()=>{
    const cardData={
        userId:userId,
        name:nameOnCard,
        cardNumber:cardNumber,
        year:expiryYear,
        month:expiryMonth,
        cvv:cvv
    }
    try{
    const response=await fetch('http://localhost:4000/saveCard',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(cardData)
    })
    if(response.status===200){
        console.log("card details saved succesfully")
        closeModal()
         getSavedCards()
         setNameOnCard('')
        setExpiryYear('')
        setExpiryMonth('')
        setCardNumber('')
        setCvv('')
    }
    else{
        console.log('failed saving card data')
    }
}
catch(error){
    console.error('error occurred',error)
}
  }

  const getSavedCards=async()=>{
    const response=await fetch(`http://localhost:4000/getSavedCards/${userId}`,{
        method:'GET'
    })
    if(response.status===200){
        const responseData=await response.json()
        console.log(responseData)
        setSavedCards(responseData)
    }

  }

  const handleSave=(e)=>{
    e.preventDefault()
    let year=parseInt(expiryYear)
    let month=parseInt(expiryMonth)
    
    // if(nameOnCard.trim()===''){
    //     setErrorMessage('fields are mandatory')
    // }
    
    if(month<currentMonth && currentYear===year)
    {
        return(setErrorMessage('Month cannot be a previous month')) 
    }
    else{
        setErrorMessage('')
        saveCard()
    }
  }

  const editCardData=(id)=>{
    setEditCard(true)
    const getCardDetails=savedCards.find((card)=>card._id===id)
    if(getCardDetails){
    setNameOnCard(getCardDetails.name)
       
}
  }

  const deleteCardData=async(id)=>{
    try{
    const response=await fetch(`http://localhost:4000/deleteCard/${id}`)
    if(response.status===200){
        console.log('data deleted')
    }
    else{
        console.log('error deleting record')
    }
    }
    catch(error){
        console.log(error)
    }
  }

  const closeEditCard=()=>{
    setEditCard(false)
  }

  useEffect(()=>{
    getSavedCards()
  },[])

  return (
    <div>
      <button onClick={openModal}>add new payment method</button>
      {
        showModal &&(
            <form onSubmit={handleSave}>
            <div className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={closeModal}>&times;</span>
                <div>
                    
                <label>Name on card:</label>
                <input type='text' value={nameOnCard} onChange={(e)=>{setNameOnCard(e.target.value)}} required />
                <label>Card number:</label>
                <input type='text' value={cardNumber} onChange={(e)=>{setCardNumber(e.target.value)}}/>
                <label>Expiry year:</label>
                <select id='year' value={expiryYear} onChange={(e)=>{setExpiryYear(e.target.value)}}>
                    <option value="">Select year</option>
                    {
                        years.map((year)=>(
                            <option key={year} value={year}>{year}</option>
                        ))
                    }
                </select>
                <label>Month</label>
                <select id='month' value={expiryMonth} onChange={(e)=>{setExpiryMonth(e.target.value)}}>
                    <option value="">Select month</option>
                    {
                        month.map((mon)=>(
                            <option key={mon} value={mon}>{mon}</option>
                        ))
                    }
                </select>
                <label>CVV</label>
                <input type='text' value={cvv} onChange={(e)=>{setCvv(e.target.value)}}/>
                <button type='submit'>Save</button>
                <button onClick={closeModal}>Cancel</button>
                {errorMessage}
                
                </div>
             </div> 
             
             </div>
             </form>  
        )
      }
      {
        savedCards.map((card)=>(
            <div key={card._id}>
                <p>Name:{card.name}</p>
                <p>Card number:{card.cardNumber}</p>
                <p>Expiry year:{card.year}</p>
                <p>Expiry month:{card.month}</p>
                <button onClick={()=>editCardData(card._id)}>Edit</button>
                <button onClick={()=>deleteCardData(card._id)}>Delete</button>
            </div>    
        ))
      }
      {
        editCard &&(
            <div className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={closeEditCard}>&times;</span>
                <div>
                <label>Name on card:</label>
                <input type='text' value={nameOnCard} onChange={(e)=>{setNameOnCard(e.target.value)}}/>
                
                </div>    
            </div>
            </div>
        )

      }
    </div>
  );
};

export default Payment;
