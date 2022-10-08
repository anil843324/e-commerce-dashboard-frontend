
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes} from "react-router-dom"

import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import Profile from './pages/Profile';

import Footer from './components/Footer';
import SignUp from "./pages/SignUp"
import PrivateComponent from './components/PrivateComponent';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Navbar/>
   
     <Routes>
       
         <Route element={<PrivateComponent/>}> 

        <Route path='/' element={ <Products/>}/>
        <Route path='/add' element={ <AddProduct/>}/>
        <Route path='/update/:id' element={ <UpdateProduct/>}/>
        <Route path='/profile' element={ <Profile/>}/>
        <Route path='*' element={ <NotFound/>}/>
        </Route>

        <Route path='/signup' element={ <SignUp/>}/>
        
        <Route path='/login' element={ <Login/>}/>

     </Routes>
      <Footer/>
     
    </>
  );
}

export default App;
