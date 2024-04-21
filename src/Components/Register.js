import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector } from "react-redux";


export default function Register() {

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const[users,setUser] = useState({
    name: "", address: "",mobile: "",email: "",password: ""
  });

  useEffect(() => {
    if(user){
      if(user.role == "User"){
      navigate("/");
      }
      else{
        navigate("/admin/food-entry");
      }
    }
  }, [user]);

let name,value;

  const handleInputs = (e) =>{
    name = e.target.name;
    value = e.target.value;

    setUser({...users, [name]:value});

  }

const PostData = async (e) => {
    e.preventDefault();
    const {name, address, mobile, email, password} = users; 


    if(name == "" || address == "" || mobile == "" || email == "" || password == ""){
     if(name==""){
      toast.error("Name is required");
     }
     else if(address==""){
      toast.error("Adress is required");
     }
     else if(mobile==""){
      toast.error("Mobile number is required");
     }
     else if(email==""){
      toast.error("Email is required");
     }
     else if(password==""){
      toast.error("Password is required");
     }
    }
    else{
      setLoading(true);
    const res =  await fetch("/api/auth/adduser",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, address, mobile, email, password
      })
    });
    const data = await res.json();
    if(res.status==404){
      toast.error("This email is alredy used by another user");
      setLoading(false);
    }
    else if(res.status==400){
     toast.error(data.errors[0].msg);
     setLoading(false);
    }
    else if(res.status == 200) {
      setLoading(false);
      toast.success("Registration completed successfully", {
        onClose: () => {
          navigate("/login", { replace: true });
        }
      });
    }
    
    
    }  
}

  return ( <>
    <div className='al px-4'>
      
      <div className="container-sm shadow pt-3 my-auto">
        <div class="LoginLogo">Register Here</div>
  <form className="px-4 py-3" method="POST" >
  <div className="mb-1">
      <label htmlfor="name" className="form-label"></label>
      <input type="Text" className="input" id="name" name ="name" 
        value = {users.name}
        onChange = {handleInputs}
      placeholder="Name"/>
    </div>
    <div className="mb-1">
      <label htmlfor="address" className="form-label"></label>
      <input type="Text" className="input" id="address" name ="address"
        value = {users.address}
        onChange = {handleInputs}
      placeholder="Address"/>
    </div>
    <div className="mb-1">
      <label htmlfor="mobile" className="form-label"></label>
      <input type="Text" className="input" id="mobile" name ="mobile"
        value = {users.mobile}
        onChange = {handleInputs}
      placeholder="Mobile Number"/>
    </div>
    <div className="mb-1">
      <label htmlfor="email" className="form-label"></label>
      <input type="email" className="input" id="email" name ="email"
        value = {users.email}
        onChange = {handleInputs}
      placeholder="Email ID"/>
    </div>
    <div className="mb-1">
      <label htmlfor="password" className="form-label"></label>
      <input type="password" className="input" id="password" name ="password"
        value = {users.password}
        onChange = {handleInputs}
      placeholder="Password"/>
    </div>
    <div style= {{textAlign: "center"}}>
    
    {loading?
    <button className="navButton mt-2 mb-1"style= {{borderRadius: '5px', width: "100%"}}>
      <div class="spinner-border" role="status" style={{fontSize: "8px", height: "20px", width: "20px", marginBottom: "-4px"}}>
      </div>
    </button>  :
    <button type="submit" className="navButton mt-2 mb-1" onClick={PostData} style= {{borderRadius: '5px', width: "100%"}}>Sing Up</button>      
  }
    <p style={{fontSize: "14px"}}>Already have an Account? <span className="" style={{color: "#2980B9", fontWeight: "500", cursor: "pointer"}} onClick={()=>navigate('/login')}>Login</span></p>
    </div>
  </form>
</div>  
    </div>

    <ToastContainer
      position="top-center"
      autoClose={5000}
      />
 </> )
}
