import { useNavigate } from 'react-router-dom'
import React, {useEffect, useState} from 'react'





export default function Navbar() {
  const navigate = useNavigate();
  const [logData, setLogData] = useState([]);
  const [logOutData, setLogOut] = useState([]);
  
  const API = "/api/auth/logdata";
  const API2="/api/auth/logout"
const fetchlogData = async (url) => {
  
     const res = await fetch(url);
     const data = await res.json();
    
      setLogData(data);
     
    
}


  useEffect(() =>{
    fetchlogData(API);
    
  
  },[])

  const logout = async (url) => {

 const res1 = await fetch(API2);
 const data = await res1.json();

 if(res1.status===500){
  
  alert("Cannot LogOut... Server Error");

}
 else{

window.location.reload();
 }

}
  

const loginplease =()=>{
  alert("Please Login")
}




const [cartData, setCartData] = useState([]);
const [dataLength, setDataLength] = useState([]);
  
const API3 = "/api/auth/cartdata";
const fetchCart = async (url) => {

   const res = await fetch(url);
   const data = await res.json();
  
  if(data.length > 0){
    setCartData(data);
  }  

  

}


useEffect(() =>{
  fetchCart(API3);

},[])



  return (
    <div>


    
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-0 mb-5 bg-body rounde" >
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Chow Food</a>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="/" ><b>Home</b></a>
      </li>
      </ul>
      <form className="d-flex">
        
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      



      {logData ? (<>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           <b> {logData.name}</b>
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href='/MyOrder'><b>My Order</b></a></li>
            <li><a class="dropdown-item" onClick={logout}  ><b>LogOut</b> </a></li>
           
          </ul>
        </li>
        
        
        <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="/cart" ><b>Cart</b></a>
      </li>
      
      </>
      
        ):(<>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/login" ><b>Login</b></a>
        </li>
      
        <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="" onClick={loginplease}><b>Cart</b></a>
      </li>
      </>
        )}

        
        
       
      </ul>
      </div>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}
