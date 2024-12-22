import React, {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/userActions";
import { CgShoppingCart } from "react-icons/cg";
import { TiDocumentText } from "react-icons/ti";
import { LuLogOut } from "react-icons/lu";
import { FcAbout } from "react-icons/fc";




export default function Navbar() {

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userType = localStorage.getItem('UserType');
  const [admin, setAdmin] = useState(false);
  

  const LogoutUser = () => {
    dispatch(logoutUser());
    navigate("/");
    window.location.reload();
  };

  const LogoutAdmin = () => {
    dispatch(logoutUser());
    navigate("/admin/food-entry");
    window.location.reload();
  };




  useEffect(() =>{   
  
  },[])





  return (<>
    <div>

  <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-0 mb-5 bg-body rounde py-2" >
  <div className="container-fluid">
       {user && userType == 'Admin'?
       <>
       <div style={{cursor: "pointer"}} className="navbar-brand pl-3" onClick={()=>navigate("/admin/food-entry")}>Chow Food</div>
       <b className="admin">Admin</b>
       </>:
       <>
        <div style={{cursor: "pointer"}} className="navbar-brand pl-3" onClick={()=>navigate("/")}>Chow Food</div>
       </>
       }
    <button
    style={{border: "solid 1px gray", borderRadius: "3px", backgroundColor: 'white'}}
    className="navbartoggler mr-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      <form className="d-flex">
        
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      



      {user ? (<>

      {userType == 'User'? (<>
        <li class="nav-item dropdown px-2">
          <a class="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           <b> {user.name}</b>
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><div style={{cursor: "pointer"}} class="dropdown-item" onClick={()=>navigate("/my-order")}><b><TiDocumentText style={{fontSize: "20px", marginRight: "4px", marginBottom: "3px"}} />Order History</b></div></li>
            <li><div style={{cursor: "pointer"}} class="dropdown-item" onClick={LogoutUser} ><b><LuLogOut style={{fontSize: "16px", marginRight: "6px", marginBottom: "5px", marginLeft: "2px"}} />Logout</b> </div></li>
           
          </ul>
        </li>
        <li className="nav-item px-2">  
        <div className="nav-link active" style={{cursor: "pointer"}} aria-current="page" onClick={()=>navigate("/cart")}><b><CgShoppingCart style={{fontSize: "22px", color: "#2980B9", marginRight: "4px", marginBottom: "5px"}}/>Cart</b></div>
      </li>
      </>):(<>
        <li class="nav-item px-2">
          <div class={`nav-link active  ${
                          location.pathname === "/admin/food-entry"
                            ? ' border-custome'
                            : ''
                        }`} style={{cursor: "pointer"}} aria-current="page" onClick={()=>navigate("/admin/food-entry")}><b>Food Entry</b></div>
        </li>
        <li class="nav-item px-2">
          <div class={`nav-link active  ${
                          location.pathname === "/admin/user-list"
                            ? 'border-custome'
                            : ''
                        }`} style={{cursor: "pointer"}} aria-current="page" onClick={()=>navigate("/admin/user-list")}><b>User List</b></div>
        </li>
        <li class="nav-item px-2">
          <div class={`nav-link active  ${
                          location.pathname === "/admin/order-list"
                            ? ' border-custome'
                            : ''
                        }`} style={{cursor: "pointer"}} aria-current="page" onClick={()=>navigate("/admin/order-list")}><b>Order List</b></div>
        </li>
        <li className="nav-item  px-2">
          <button className="navButton mt-1" onClick={LogoutAdmin}>Logout</button>
        </li>
        
      </>)}
       
      
      </>
      
        ):(<>
        <li className="nav-item  px-2">
          <button className="navButton" onClick={()=>navigate("/login")} style={{marginRight: "20px"}}>Login</button>
          <button className="navButton" onClick={()=>navigate("/register")}>Register</button>
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
    {admin? (<>
      <div id="adminBox" style={{position: "absolute", zIndex: "1",marginTop: "60px", marginLeft: "10px", border: '1px solid #ccc', padding: '10px', backgroundColor: 'white', width: '300px', borderRadius: '10px' }}>
      <span style={{ position: 'absolute', top: '-10px', right: '5px', cursor: 'pointer', fontSize: '30px', color: 'red' }} onClick={() => setAdmin(false)}>&times;</span>
      <div style={{textAlign: "center"}}><strong>Use this credential for <br/>ADMIN LOGIN:</strong></div>
      <div style={{marginTop: "20px"}}><strong>ID:</strong> info@chowfood.com</div>
      <div><strong>Password:</strong> chow@food!21</div>
    </div>
    </>):(<>
    <FcAbout onClick={()=>setAdmin(true)} style={{zIndex: "1", marginTop: "60px", position: "absolute", fontSize: "40px", marginLeft: "6px", color: "#ff6347", animation: "movingGlow 1.5s ease-in-out infinite", boxShadow: "0 0 5px rgba(255, 99, 71, 1)" }} />
<style>
  {`
    @keyframes movingGlow {
      0% { box-shadow: 0 0 5px rgb(83, 178, 255), 0 0 10px rgb(83, 178, 255), 0 0 15px rgb(83, 178, 255); border-radius: 5px }
      50% { box-shadow: 0 0 15px rgb(83, 178, 255), 0 0 30px rgb(83, 178, 255), 0 0 45px rgb(83, 178, 255); border-radius: 5px }
      100% { box-shadow: 0 0 5px rgb(83, 178, 255), 0 0 10px rgb(83, 178, 255), 0 0 15px rgb(83, 178, 255); border-radius: 5px }
    }
  `}
</style>
</>)}
    </>)
}
