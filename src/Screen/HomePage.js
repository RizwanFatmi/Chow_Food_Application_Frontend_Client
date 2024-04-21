import React, {useEffect, useState} from 'react';
import Navbar from '../Components/Navbar'
import Main from '../Components/Main'
import { useNavigate } from 'react-router-dom';
import {useSelector } from "react-redux";




export default function HomePage() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("UserType");
useEffect(() =>{
    if(userRole && userRole == "Admin"){
      navigate('/admin/food-entry');
  }
},[user]);
  return (
    <div>
      <Navbar/>
    <Main/>
    </div>
  )
}
