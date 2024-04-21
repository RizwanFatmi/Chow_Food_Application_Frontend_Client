import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const[users,setUser] = useState({
  email: "",password: ""
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
    if(users.email == "" || users.password == "" ){
      toast.error("email Id and password cannot be black")
    }
    else{
      setLoading(true);
       await dispatch(loginUser(users)); 
       setLoading(false);
    }
}



  return ( <>
    <div>
      

      <div className='al px-4'>
      
      <div className="container-sm shadow pt-3 ">
        <div class="LoginLogo">Login</div>
  <form className="px-4 pt-1 pb-3" method="POST" >
    <div className="mb-1">
      <label htmlfor="email" className="form-label"></label>
      <input type="email" className="form-control  py-2" id="email" name='email'
         value = {users.email}
         onChange = {handleInputs}
      placeholder="Email ID"/>
    </div>
    <div className="mb-1">
      <label for="password" className="form-label"></label>
      <input type="password" className="form-control  py-2" id="password" name='password'
       value = {users.password}
       onChange = {handleInputs}
      placeholder="Password"/>
    </div>
    <div style= {{textAlign: "center"}}>
    
    {loading?
   <button className="navButton mt-4 mb-1" style= {{borderRadius: '5px', width: "100%"}}>
     <div class="spinner-border" role="status" style={{fontSize: "8px", height: "20px", width: "20px", marginBottom: "-4px"}}>
      </div>
    </button>  :
     <button type="submit" className="navButton mt-4 mb-1" onClick={PostData} style= {{borderRadius: '5px', width: "100%"}}>Login</button>     
  }
    <p style={{fontSize: "14px"}}>Don't have an Account? <span className="" style={{color: "#2980B9", fontWeight: "500", cursor: "pointer"}} onClick={()=>navigate('/register')}>Sign up</span></p>
    </div>
  </form>
 
  </div>
</div>
      
    </div>
       <ToastContainer
       position="top-center"
       autoClose={5000}
       />
 </> )
}
