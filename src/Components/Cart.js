import React, {useEffect, useState} from 'react'
import Loading from './Loading';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RxCross2 } from "react-icons/rx";




export default function Cart() {

  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [mainLoading, setMainLoading] = useState(true);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();
  const [totalValue, setTotalValue] = useState(0);
  const [totalQty, setTotalQty] = useState(0);


  // Your fetchCart function
  const fetchCart = async () => {
      setMainLoading(true);
      const userId = user && user._id;
      const res = await fetch("api/auth/cartdata", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              userId,
          })
      });
      const data = await res.json();
      if (data.length > 0) {
          let qty = 0; // Initialize total here
          let total = 0; // Initialize total here
          data.forEach(item => {
              qty += parseInt(item.quantity);
              total += parseInt(item.quantity) * parseFloat(item.foodId.price);
          });
          setTotalQty(qty); // Update totalValue state
          setTotalValue(total); // Update totalValue state
          setCartData(data);
          const timeoutId = setTimeout(() => {
              setMainLoading(false);
          }, 3000);
      } else {
          // If no data is fetched, immediately set loading to false
          setMainLoading(false);
          setCartData([]);
      }
  }

const userRole = localStorage.getItem("UserType");
  useEffect(() =>{
    if(user && user.role == "User"){
    fetchCart();
    }
    else{ 
      if(userRole && userRole == "User"){
     
    }
    else{
      navigate('/login');
    }
    }
  },[user])


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
    
      toast.error("Cannot Delete!! Server Error");
    }
     
    else{
      toast.success("Deleted succesfully");
      fetchCart();
      
    }
  
  }


  const PlaceOrder = async () =>{
    setLoading(true);
    const userId = user && user._id;
    const res =  await fetch("/api/auth/orderfood",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
       userId
      })
    });
    const data = await res.json();
    if(res.status===500){
      setLoading(false);
      toast.error("Server Error");
    }
    else{
      
      toast.success("Order placed succesfully... You will receive your meal within 30 minuts", {
        onClose: () => { 
          navigate("/my-order", { replace: true });
        }
      });
    }
  
  }


  const truncateName = (name, maxLength) => {
    if (name.length <= maxLength) {
      return name;
    } else {
      return name.slice(0, maxLength - 3) + '...';
    }
  };
  
  return (<>
   {mainLoading && cartData.length === 0 ? (<>
      <Loading />
    </>) : (<>
      <div
                  className="mx-4"
                  style={{ overflowX: "auto" }}
                >
    {cartData && cartData.length > 0 ? (<>

      <table className="table tb mx-auto  mb-0"  style= {{color: "#898787"}}>
  <thead >
    <tr>
      <th scope="col" style={{width: "250px"}}></th>
      <th scope="col" style= {{color: "#5E5E5E", width: "200px", minWidth: "200px"}}>Food</th>
      <th scope="col" style={{textAlign: 'center', color: "#5E5E5E"}}>Qty</th>
      <th scope="col" style={{textAlign: 'center', color: "#5E5E5E"}}>Price</th>
      <th scope="col" style={{textAlign: 'center', color: "#5E5E5E"}}>Total</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
  {cartData.map( (cartData)=>(
  <tr>
      <td><img src={cartData.foodId.image} className="img-thumbnail" alt="..." style={{ height: "100px", width: "150px" }}/></td>
      <td>
      <div style={{height: "100px", overflow: "hidden"}}>
        <b style={{color: "#5E5E5E"}}>{cartData.foodId.name}</b><br/>{cartData.foodId.description}
        </div>
        </td>
       
      <td style={{textAlign: 'center'}}>{cartData.quantity}</td>
      <td style={{textAlign: 'center', minWidth: "120px"}}>₹ {cartData.foodId.price}.00</td>
      <td style={{textAlign: 'center', minWidth: "120px"}}>₹ {parseInt(cartData.quantity) * parseFloat(cartData.foodId.price)}.00</td>
      <td scope="col" style={{textAlign: 'end', fontSize: "20px"}}> <RxCross2 className="CardDeleteBtn" onClick={()=>DeleteCart(cartData._id)} style={{marginTop: "-10px"}}/></td>
      <td></td> 
    </tr>
))
}
  </tbody>
</table>
<div className="table tb mx-auto  my-0 py-3" style={{textAlign: "end", paddingRight: "30px"}}>
<p style={{fontSize: "16px", fontWeight: '500', color: "#4B4B4B"}}>Total Quantity: <span style={{color: "#5E5E5E", fontWeight: "400"}}>{totalQty}</span></p>
<p style={{fontSize: "16px", fontWeight: '500', color: "#4B4B4B"}}>Total Value: <span style={{color: "#5E5E5E", fontWeight: "400"}}>₹ {totalValue}.00</span></p> 
{loading?
  <button className="navButton" style={{borderRadius: "5px", fontSize: "22px", width: "200px", backgroundColor: '#CFCECE'}}>Place Order</button>     :
   <button className="navButton" onClick={PlaceOrder} style={{borderRadius: "5px", fontSize: "22px", width: "200px"}}>Place Order</button>   
  }
</div>
</>
        ) : (<>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
              <img src={require('./Images/NoDataHome.png')} className="img-fluid" alt="..." style={{ width: '90vw', height: 'auto', maxWidth: '600px' }} />
              <p style={{ fontSize: '25px', fontWeight: '500', color: '#A6A6A6', marginTop: '-70px' }}>Cart is empty</p>
            </div>
          </div>
        </>)}
    </div>


</>)}
<ToastContainer position="top-center" autoClose={2000} />
  </>)
}
