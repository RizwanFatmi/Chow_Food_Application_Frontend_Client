import React, {useEffect, useState} from 'react'
import { Row } from 'react-bootstrap';



export default function Cart() {

  const [logData, setLogData] = useState([]);
  const API2 = "/api/auth/logdata";
  
const fetchlogData = async (url) => {
  
     const res = await fetch(url);
     const data = await res.json();
    
      setLogData(data);
     
    
}


  useEffect(() =>{
    fetchlogData(API2);
    
  
  },[])


  const [cartData, setCartData] = useState([]);
  
  const API = "/api/auth/cartdata";
const fetchCart = async (url) => {
  
     const res = await fetch(url);
     const data = await res.json();
    if(data.length > 0){
      setCartData(data);
    }  

  

}


  useEffect(() =>{
    fetchCart(API);
  
  },[])


  const DeleteCart = async (_id) =>{
    const res =  await fetch("/api/auth/deletecart",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
       _id
      })
    
    });
    
    const data = await res.json();
    
    if(res.status===500){
    
      alert("Cannot Delete!! Server Error");
    }
     
    else{
  
      
     
      alert("Deleted succesfully");
      window.location.reload();
      
    }
  
  }


  const PlaceOrder = async (_id) =>{
    const res =  await fetch("/api/auth/orderfood",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
       _id
      })
    
    });
    
    const data = await res.json();
    
    if(res.status===500){
    
      alert("Server Error");
    }
     
    else{
  
      
     
      alert("Order placed succesfully... You will receive your meal within 30 minuts");
      const res =  await fetch("/api/auth/deletecart",{
        method: "POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
         _id
        })
      
      });
      window.location.reload();
      
    }
  
  }
  
  return (
    <div>
      <table className="table tb">
  <thead >
    <tr>
      <th scope="col"></th>
      <th scope="col">Food</th>
      <th scope="col">Qty</th>
      <th scope="col">Price</th>
      <th scope="col">Total</th>
      <th scope="col"></th>
      <th scope="col"></th>
      

    </tr>
  </thead>
  <tbody>

 
  {cartData.map( (cartData)=>(
  
  <tr>
      <td><img src={cartData.image} className="img-thumbnail" alt="..." /></td>
      <td>{cartData.productname}</td>
      <td>{cartData.quantity}</td>
      <td>{cartData.price}</td>
      <td>{cartData.value}</td>
      <td scope="col"> <img src={require('./Images/Delete.jpg')} className=" btn btn2  btn-outline-danger" onClick={()=>DeleteCart(cartData._id)} ></img></td>
      <td><a href="#" className="btn btn3 btn-primary " onClick={()=>PlaceOrder(cartData._id)} ><b>Place Order</b></a></td> 
    </tr>

 
  
))
}

  </tbody>
</table>
    </div>
  )
}
