import React,{useState} from 'react'
import './AHome.css'
import Account from './AccountActions/Account'
import Payment from './AccountActions/Payment'
import Address from './AccountActions/Address'
import Header from './HeaderHome'
import Appointments from './AccountActions/Appointment'
import RegisterDoctor from './AccountActions/RegisterDoctor'
// import Footer from './FooterHome'
export default function Home(){
    
    const storedComponent=localStorage.getItem('selectedComponent')
    const userType=localStorage.getItem('userType')
    const[selectComponent,setSelectComponent]=useState(storedComponent||'Account')
    const handleMenu=(component)=>{
        setSelectComponent(component)
        localStorage.setItem('selectedComponent',component)
    }


    return(
    <div>   
        <Header/> 
    <div className="container">
            <div className="left-half">
            <div className="menu">
          <ul className='menu-list'>
            <li onClick={()=>handleMenu('Account')}>Account</li>
            <li onClick={()=>handleMenu('Payment')}>Payment</li>
            <li onClick={()=>handleMenu('Address')}>Address</li>
            {userType==='Patient' &&
            <li onClick={()=>handleMenu('Appointment')}>Appointments</li>
            }
            {userType==='Doctor' &&
            <div>
            <li onClick={()=>handleMenu('RegDoctor')}>Register Doctor</li>
            {/* <li onClick={()=>handleMenu('Change availability')}>Change availability</li> */}
            </div>
            }
          </ul>
        </div>
            </div>
            <div className="divider"></div>
            <div className="right-half">
                {selectComponent==='Account' && <Account/>}
                {selectComponent==='Payment' && <Payment/>}
                {selectComponent==='Address' && <Address/>}
                {selectComponent==='Appointment' && <Appointments/>}
                {selectComponent==='RegDoctor' && <RegisterDoctor/>}
            </div>
        </div>
        </div>
    )
}