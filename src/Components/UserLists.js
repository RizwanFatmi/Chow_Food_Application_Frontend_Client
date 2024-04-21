import React, {useEffect, useState} from 'react'
import { Row } from 'react-bootstrap';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";





export default function UserLists() {
 
  const [userData, setUserData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [mainLoading, setMainLoading] = useState(true);
  const navigate = useNavigate();




  
  const userStatus1 =  () => {

    toast.warn("This function is under maintenance")
  }
   const fetchUser = async () => {
     setMainLoading(true);
     const res = await fetch("/api/auth/userlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPage,
        pageSize: 10, 
      }),
    });
    const data = await res.json();
    if (data.user.length > 0) {
      setUserData(data.user);
      setTotalPages(data.totalPages);
      setTotalItem(data.totalItems);
      const timeoutId = setTimeout(() => {
        setMainLoading(false);
    }, 3000);
  } else {
    // If no data is fetched, immediately set loading to false
    setMainLoading(false);
}
}

const userRole = localStorage.getItem("UserType");
  useEffect(() =>{
    if(userRole == "Admin"){
      fetchUser();
    }
    else{
      navigate('/login');
    }
  },[user])

  // DATE FORMAT FUNCTION:

  const formatDate=(inputDate)=> {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear().toString().substr(-2);
    return `${day} ${months[monthIndex]}' ${year}`;
  }

  


  // ACTIVE AND INACTIVE USER:


  const ActiveUser=async(_id)=>{
    const status = "Active";
    const res =  await fetch("/api/auth/changeuserstatus",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
       _id,status
      })
    
    }); 
    const data = await res.json();
    if(res.status===200){
      fetchUser();
      toast.success("User is active now");
    }
    else{
      toast.error("Server Error");
    
    }

  }

  const DeActiveUser=async(_id)=>{
    const status = "De-active";
    const res =  await fetch("/api/auth/changeuserstatus",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
       _id,status
      })
    
    }); 
    const data = await res.json();
    if(res.status===200){
      fetchUser();
      toast.success("User is not active now");
    }
    else{
      toast.error("Server Error");

    }
  }


  // Handle paginations:

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItem, setTotalItem] = useState(0);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  
  useEffect(() => {
    fetchUser();
}, [currentPage]);

  return (<>
    {mainLoading && userData.length === 0 ? (<>
      <Loading />
    </>) : (<>  
      {userData && userData.length > 0 ? (<>   
        <div className='ud px-4'>

<p style={{fontSize: "22px", fontWeight: "500", color: "#2980B9", textAlign: "center"}}>User List</p>
<div className="container-lg lg2 mt-1" style={{ overflowX: "auto" }}>
<table className="table m-0" style={{ backgroundColor: "white" }}>
<thead style={{ backgroundColor: "#2980B9", color: "white", position: "sticky", top: 0, zIndex: 1 }}>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">User Since</th>
      <th scope="col" style={{textAlign: "center"}}>Status</th>
      <th scope="col">Address</th>
      <th scope="col">Mobile</th>
      <th scope="col">Email ID</th>
      <th scope="col" style={{textAlign: "center"}}>Action</th>
   

    </tr>
  </thead>
  <tbody>
  { userData.map( (userData, index)=>(
  
  
  <tr key ={index}>
      <td style={{maxWidth: "200px"}}>{userData.name}</td>
      <td>{formatDate(userData.dateCreated)}</td>
      <td style={{textAlign:"center"}}>
       {userData.active?
        <p className=" mb-0  mx-auto" style={{color: "#11870C", backgroundColor: "#DEF8DC", borderRadius: "2px", fontSize: "13px", paddingBottom: "2px", marginTop: '3px', width: "100px"}}>Active</p>:
        <p className=" mb-0  mx-auto" style={{color: "#F00606", backgroundColor: "#FFEBEB", borderRadius: "2px", fontSize: "13px", paddingBottom: "2px", marginTop: '3px', width: "100px"}}>Not active</p>
       }
        </td>

      <td style={{maxWidth: "200px"}}>{userData.address}</td>
      <td>{(userData.mobile).slice(0,10)}</td>
      <td>{userData.email.slice(0, 30)} <br />{" "}
      {userData.email.slice(30, 60)}</td>
      <td style={{textAlign: "center", minWidth: "120px"}}>
      {userData.active?
        <button className="navButton" style= {{borderRadius: '5px', fontSize: "14px"}} onClick={()=>DeActiveUser(userData._id)}>De-Active</button>:
        <button className="navButton" style= {{borderRadius: '5px', fontSize: "14px"}} onClick={()=>ActiveUser(userData._id)}>Active</button>
       }
      </td>
      

     
    </tr>
  
))
}
   
    
  </tbody>
</table>

</div>
    {/*Pagination*/}
    {totalPages > 1? (<>
                <div className="pagination" style={{marginTop: "-40px", justifyContent: "center"}}>
                  <p
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <IoIosArrowBack
                      className={
                        currentPage === 1
                          ? "paginationBtndisabled"
                          : "paginationBtn"
                      }
                    />
                  </p>
                  <span style={{ fontSize: "16px", letterSpacing: "2px" }}>
                    {currentPage}/{totalPages}
                  </span>
                  <p
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <IoIosArrowForward
                      className={
                        currentPage === totalPages
                          ? "paginationBtndisabled"
                          : "paginationBtn"
                      }      
                    />
                  </p>
                </div>
                </>):(<></>)}
</div>
</>
        ) : (<>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
              <img src={require('./Images/NoDataHome.png')} className="img-fluid" alt="..." style={{ width: '90vw', height: 'auto', maxWidth: '600px' }} />
              <p style={{ fontSize: '25px', fontWeight: '500', color: '#A6A6A6', marginTop: '-70px' }}>User not found</p>
            </div>
          </div>
        </>)}
  </>)}
  <ToastContainer
      position="top-center"
      autoClose={5000}
      />
  </>)
}
