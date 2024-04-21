import logo from './logo.svg';
import './App.css';

import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/userActions';
import {
  BrowserRouter,
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './Screen/HomePage';
import LoginPage from'./Screen/LoginPage';
import RegisterPage from'./Screen/RegisterPage';
import AddFood from'./Screen/AddFood';
import FoodList from './Screen/FoodList'
import OrderList from'./Screen/OrderList';
import UserList from './Screen/UserList';
import CartScreen from './Screen/CartScreen';
import MyOrderScreen from './Screen/MyOrderScreen';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  
  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route path='/' element = {<HomePage/>}/>
    <Route path='/login' element = {<LoginPage/>}/>
    <Route path='/register' element = {<RegisterPage/>}/>
    <Route path='/admin/food-entry' element = {<AddFood/>}/>
    <Route path='/admin/user-list' element = {<UserList/>}/>
    <Route path='/admin/order-list' element = {<OrderList/>}/>
    <Route path='/cart' element = {<CartScreen/>}/>
    <Route path='/my-order' element = {<MyOrderScreen/>}/>






    </Routes>
    </BrowserRouter>
   
    

</div> 
  );
}

export default App;
