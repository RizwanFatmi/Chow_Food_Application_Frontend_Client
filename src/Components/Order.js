import React, {useEffect, useState} from 'react'
import { Row } from 'react-bootstrap';


export default function Order() {

  const [orderData, setOrderData] = useState([]);
  
  const API = "/api/auth/orderlist";
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

    
<div className="container-lg" >

<div class="LoginLogo"><b>Order List</b></div>

<table className="table table-light" >
  <thead>
    <tr>
      <th scope="col">S.no</th>
      <th scope="col">Date</th>
      <th scope="col">User Name</th>
      <th scope="col">Address</th>
      <th scope="col">Mobile</th>
      <th scope="col">Email ID</th>
      <th scope="col">Food Name</th>
      <th scope="col">Qty</th>
      <th scope="col">Price</th>
      <th scope="col">Value</th>
     
    </tr>
  </thead>
  <tbody>
  { orderData.map( (orderData, index)=>(
  
  
  <tr key ={index}>
      <td>{index+1}</td>
      <td>{orderData.date}</td>
      <td>{orderData.username}</td>
      <td>{orderData.address}</td>
      <td>{orderData.mobile}</td>
      <td>{orderData.email}</td>
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
