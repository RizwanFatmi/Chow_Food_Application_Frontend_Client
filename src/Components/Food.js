import React, {useEffect, useState} from 'react'


export default function Food({ food }) {
  
  
  const [logData, setLogData] = useState([]);
 
  
  const API = "/api/auth/logdata";
 
const fetchlogData = async (url) => {
  
     const res = await fetch(url);
     const data = await res.json();
    
      setLogData(data);
     
    
}


  useEffect(() =>{
    fetchlogData(API);
    
  
  },[])


  const[cartData,setCartData] = useState({});
  
  let name,value;
  
  const handleInputs = (e) =>{
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setCartData(value);

 

  }


const addToCart= async(food)=>{

  if(!logData){
    alert("Please Login")
  }

  else{


    //start
   
    
      if(cartData==1||cartData==2||cartData==3||cartData==4||cartData==5){

      const _id = food._id
      const quantity = cartData; 
  
      const res =  await fetch("/api/auth/addtocart",{
        method: "POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          _id,quantity
        })
     
      });
  
  
      if(res.status===500){
  
        alert("Server error");
      }
      
      else{
        alert("Added to Cart");

      
       
       
        
      }
      
    }
    else{
      alert("Please enter quantity between 1 to 5 ")
    }
  
   
  }
 


}
  
  return (
    <div>
      

      <div className="card ">
        <img src={food.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title"> {food.name}</h5>
          <p className="card-text">{food.description}</p>
          <h5 className="card-title">  Rs.  {food.price}/-</h5>
          <div class="d-flex flex-row bd-highlight mb-2">
      
          <input type="number" className="newone" id="name" name ="name" min={1} max={5} maxLength={1}
      onChange = {handleInputs}
      placeholder="Quantity"/>
          <a href="#" className="btn btn-primary" onClick={()=>addToCart(food)}>Order</a>
         


          </div>
        </div>
      </div>

    </div>
  )
}
