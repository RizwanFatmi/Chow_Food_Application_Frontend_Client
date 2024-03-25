import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate();
 
  const[login,setLogin] = useState({
  email: "",password: ""
  });

let name,value;


  const handleInputs = (e) =>{
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setLogin({...login, [name]:value});

  }

const PostData = async (e) => {
    e.preventDefault();

    const {email, password} = login; 

    if(email=='admin'&& password=='12345'){
      navigate("/FoodEntry",{replace:true}); 
    }

    else{

    const res =  await fetch("/api/auth/login",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
       email, password
      })
   
    });

    const data = await res.json();

    if(res.status===400){

      alert("Please try to login with correct credentials");
    }
     
    else if(res.status===500){
      console.log(data)
      alert("Server Error");
    }
    else{
      
     
      navigate("/",{replace:true});
      
    }
  }
    
}
  return ( 
    <div>
      

      <div className='alt'>
      <div className="container-sm orange">
        <div class="LoginLogo"><b>Admin/User Login</b></div>
  <form className="px-4 py-3" method='POST'>
    <div className="mb-3">
      <label htmlfor="email" className="form-label"></label>
      <input type="email" className="form-control" id="email" name='email'
         value = {login.email}
         onChange = {handleInputs}
      placeholder="Email ID"/>
    </div>
    <div className="mb-3">
      <label for="password" className="form-label"></label>
      <input type="password" className="form-control" id="password" name='password'
       value = {login.password}
       onChange = {handleInputs}
      placeholder="Password"/>
    </div>
    
    <button type="submit" className="btn btn-outline-primary" onClick={PostData} >Login </button>
    <a href = "/register"><button type="button" className="btn btn-outline-primary ">Register</button></a>
  </form>
 
  </div>
</div>
      
    </div>
  )
}
