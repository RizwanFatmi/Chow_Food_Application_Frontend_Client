import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function Food({ food }) {
  const { user } = useSelector((state) => state.user);
  const [cartData, setCartData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setCartData((prevCartData) => ({
      ...prevCartData,
      [food._id]: value, // Use food ID as key
    }));
  };

  const addToCart = async () => {
    setLoading(true);
    if (!user) {
      setLoading(false);
      toast.warn("Please Login");
    } else {

      const userId = user && user._id;
      const foodId = food._id;
      const quantity = cartData[foodId];

      if (!quantity) {
        setLoading(false);
        toast.warn("Please enter order quantity");
        return;
      }
      const res = await fetch("/api/auth/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          foodId,
          quantity,
        }),
      });

      if (res.status === 500) {
        setLoading(false);
        toast.error("Server error");
      } else {
        
        toast.success("Added to Cart", {
          onClose: () => {
            setLoading(false);  
            setCartData({
              ...cartData,
              [foodId]: ""});
          }
        });  
    
      }
    }
  };

  const truncateName = (name, maxLength) => {
    if (name.length <= maxLength) {
      return name;
    } else {
      return name.slice(0, maxLength - 3) + '...';
    }
  };

  return (
    <>
      <div>
        <div className="card shadow" style={{ maxWidth: '300px', border: "none", borderRadius: "10px" }}>
          <img src={food.image} className="card-img-top" alt="..." style={{ height: '200px', width: "300px", borderRadius: "10px 10px 0 0" }} />
          <div className="card-body">
            <p className="card-title" style={{ fontSize: "18px", fontWeight: "500", color: "#343434" }}>{truncateName(food.name, 27)}</p>
            <p className="card-text" style={{ fontSize: "14px", fontWeight: "400", color: "#808080", marginTop: "-8px" }}>{truncateName(food.description, 43)}</p>
            <p className="card-title" style={{ fontSize: "17px", fontWeight: "500", color: "#343434" }}>₹ {food.price}.00</p>
            <div className="row">
              <div className="col">
                <input
                  type="number"
                  className="px-2"
                  id={`quantity-${food._id}`} // Unique ID for quantity input field
                  name="quantity"
                  min={1}
                  max={5}
                  maxLength={1}
                  onChange={handleInputs}
                  value={cartData[food._id] || ''} // Controlled input value
                  placeholder="Quantity"
                  style={{ width: "100%", borderRadius: "5px", outline: "none", marginTop: "1px", border: "1px solid gray" }}
                />
              </div>
              <div className="col">
              {loading?
      <button className="navButton" style={{ borderRadius: '5px', width: "100%", height: "30px"}}>Buy</button>  :
     <button className="navButton" onClick={addToCart} style={{ borderRadius: '5px', width: "100%", height: "30px" }}>Buy</button> 
   }
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} />
    </>
  );
}
