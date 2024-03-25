import React, {useEffect, useState} from 'react'

export default function MyOrder() {

    const [orderData, setOrderData] = useState([]);
  
    const API = "/api/auth/myorder";
  const fetchOrder = async (url) => {
    
       const res = await fetch(url);
       const data = await res.json();
      if(data.length > 0){
        setOrderData(data);
      }  
  }
  
  
    useEffect(() =>{
      fetchOrder(API);
    
    },[])
  
  
    //
  
    
  
  
  
    return ( 
      <div className='ud'>
  
      
  <div className="container-lg lg2" >
  
  <div class="LoginLogo"><b>My Order List</b></div>
  
  <table className="table table-light" >
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Date</th>
        <th scope="col">Food Name</th>
        <th scope="col">Qty</th>
        <th scope="col">Price</th>
        <th scope="col">Value</th>
       
      </tr>
    </thead>
    <tbody>
    { orderData.map( (orderData, index)=>(
    
    
    <tr key ={index}>
       <td><img src={orderData.image} className="img-thumbnail" alt="..." /></td>
        <td>{orderData.date}</td>
        <td>{orderData.productname}</td>
        <td>{orderData.quantity}</td>
        <td>{orderData.price}</td>
        <td>{orderData.value}</td>
        
       
      </tr>
    
  ))
  }
     
      
    </tbody>
  </table>
  
  </div>
  
  </div>
     
    )
  }
  