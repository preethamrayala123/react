import logo from './logo.svg';
import './App.css';
import Signin from './NewCode/Signin'
import Signup from './NewCode/Signup'
import Home from './NewCode/AHome'
import ForgotPwd from'./NewCode/Forgotpwd'
import {Routes,Route} from'react-router-dom'
import NewAddress from './NewCode/AccountActions/NewAddress'
import EditAddress from './NewCode/AccountActions/EditAddress';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Signin' element={<Signin/>}/>
        <Route path='/AccountHome' element={<Home/>}/>
        <Route path='/ForgotPassword' element={<ForgotPwd/>}/>
        <Route path='/AccountHome/NewAddress' element={<NewAddress/>}></Route>
        <Route path='/AccountHome/EditAddress' element={<EditAddress/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
