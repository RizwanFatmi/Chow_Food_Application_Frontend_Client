import React, {useEffect, useState} from 'react'
import { Row } from 'react-bootstrap';




export default function UserLists() {
 
  const [userData, setUserData] = useState([]);
  
  const API = "/api/auth/userlist";
const fetchUser = async (url) => {
  
     const res = await fetch(url);
     const data = await res.json();
    if(data.length > 0){
      setUserData(data);
    }  
}


  useEffect(() =>{
    fetchUser(API);
  
  },[])


  //

  


  const DeleteUser = async (_id) =>{
    const res =  await fetch("/api/auth/deleteuser",{
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
  
      
     
      alert("User Deleted succesfully");
      window.location.reload();
      
    }

  }

  return ( 
    <div className='ud'>

    
<div className="container-lg" >

<div class="LoginLogo"><b>User List</b></div>

<table className="table table-light" >
  <thead>
    <tr>
      <th scope="col">S.no</th>
      <th scope="col">Name</th>
      <th scope="col">Address</th>
      <th scope="col">Mobile</th>
      <th scope="col">Email ID</th>
      <th scope="col">Password</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
  { userData.map( (userData, index)=>(
  
  
  <tr key ={index}>
      <td>{index+1}</td>
      <td>{userData.name}</td>
      <td>{userData.address}</td>
      <td>{userData.mobile}</td>
      <td>{userData.email}</td>
      <td>{userData.password}</td>
      <td> 
      <img src={require('./Images/Delete.jpg')} className=" btn btn2 btn-outline-danger" onClick={()=>DeleteUser(userData._id)} ></img>
     </td>
     
    </tr>
  
))
}
   
    
  </tbody>
</table>

</div>

</div>
   
  )
}
