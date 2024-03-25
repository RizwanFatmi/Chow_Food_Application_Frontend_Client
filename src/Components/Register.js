import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'


export default function Register() {

  const navigate = useNavigate();
 
  const[user,setUser] = useState({
    name: "", address: "",mobile: "",email: "",password: ""
  });

let name,value;


  const handleInputs = (e) =>{
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});

  }

const PostData = async (e) => {
    e.preventDefault();

    const {name, address, mobile, email, password} = user; 

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

      alert("This email is alredy used by another user");
    }
     
    else if(res.status==400){
      console.log(data)
      alert("Please enter valid details");
    }
    else{
      alert("Registration completed successfully");
     
      navigate("/login",{replace:true});
      
    }
    
    
}

  return ( 
    <div className='al'>
      
      <div className="container-sm orange">
        <div class="LoginLogo"><b>Register Here</b></div>
  <form className="px-4 py-3" method="POST" >
  <div className="mb-3">
      <label htmlfor="name" className="form-label"></label>
      <input type="Text" className="form-control" id="name" name ="name" 
        value = {user.name}
        onChange = {handleInputs}
      placeholder="Name"/>
    </div>
    <div className="mb-3">
      <label htmlfor="address" className="form-label"></label>
      <input type="Text" className="form-control" id="address" name ="address"
        value = {user.address}
        onChange = {handleInputs}
      placeholder="Address"/>
    </div>
    <div className="mb-3">
      <label htmlfor="mobile" className="form-label"></label>
      <input type="Text" className="form-control" id="mobile" name ="mobile"
        value = {user.mobile}
        onChange = {handleInputs}
      placeholder="Mobile Number"/>
    </div>
    <div className="mb-3">
      <label htmlfor="email" className="form-label"></label>
      <input type="email" className="form-control" id="email" name ="email"
        value = {user.email}
        onChange = {handleInputs}
      placeholder="Email ID"/>
    </div>
    <div className="mb-3">
      <label htmlfor="password" className="form-label"></label>
      <input type="password" className="form-control" id="password" name ="password"
        value = {user.password}
        onChange = {handleInputs}
      placeholder="Password"/>
    </div>
    
    <button type="submit" className="btn btn-outline-primary" onClick={PostData}>Register</button>
    <a href = "/login"><button type="button" className="btn btn-outline-primary ">Login</button></a>
  </form>
 
  
</div>



      
    </div>
  )
}
