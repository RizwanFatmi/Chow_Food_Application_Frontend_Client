import logo from './logo.svg';
import './App.css';

import React from "react";
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
  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route path='/' element = {<HomePage/>}/>
    <Route path='/login' element = {<LoginPage/>}/>
    <Route path='/register' element = {<RegisterPage/>}/>
    <Route path='/FoodEntry' element = {<AddFood/>}/>
    <Route path='/UserList' element = {<UserList/>}/>
    <Route path='/OrderList' element = {<OrderList/>}/>
    <Route path='/cart' element = {<CartScreen/>}/>
    <Route path='/MyOrder' element = {<MyOrderScreen/>}/>






    </Routes>
    </BrowserRouter>
   
    

</div> 
  );
}

export default App;
