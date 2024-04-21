import React, {useEffect, useState} from 'react';
import Loading from './Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin7Line } from "react-icons/ri";


export default function FoodEntry() {
  const[food,setFood] = useState({
    name: "", description: "",price: "",image: ""
  });
  const[editData,setEditData] = useState();
  const { user } = useSelector((state) => state.user);
  const [mainLoading, setMainLoading] = useState(true);
  const navigate = useNavigate();
let name,value;


  const handleInputs = (e) =>{
    name = e.target.name;
    value = e.target.value;
    setFood({...food, [name]:value});
  }

  const handleInput = (e) =>{
    name = e.target.name;
    value = e.target.value;
    setUFood({...uFood, [name]:value});
  }


  const clear = () =>{
    setFood({...food, 
      name:"",
      description: "",
      price: "",
      image: "",
    });
    setUFood({...uFood,
      _id:"",
      name:"",
      description: "",
      price: "",
      image: "",
    });
    setEditData({...uFood,
      _id: "",
      name:"",
      description: "",
      price: "",
      image: "",
    });
  }

const PostData = async (e) => {
    e.preventDefault();
    setMainLoading(true);
    const {name, description, price, image} = food; 

    const res =  await fetch("/api/auth/addfood",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, description, price, image
      })
   
    });

    const data = await res.json();
   if(res.status==400){
     setMainLoading(false);
      toast.error("Please enter valid details");
    }
    else{
      const timeoutId = setTimeout(() => {
        setMainLoading(false);
    }, 3000);
    fetchFoods();
    clear();
    toast.success("Food Added successfully");
  } 
    
    }
    
    

  //
  const [foodData, setFoodData] = useState([]);
  
const fetchFoods = async () => {
    setMainLoading(true);
     const res = await fetch("/api/auth/foodlist");
     const data = await res.json();
    if(data.length > 0){
      setFoodData(data);
      const timeoutId = setTimeout(() => {
        setMainLoading(false);
    }, 3000);
  } else {
    // If no data is fetched, immediately set loading to false
    setMainLoading(false);
}
    
    
    
  
}


const userRole = localStorage.getItem("UserType");
  useEffect(() => {
    if (userRole == "Admin") {
      fetchFoods();
    } else {
      navigate("/login");
    }
  }, [user]);


//
const DeleteFood = async (_id) =>{
  setMainLoading(true);
  const res =  await fetch("/api/auth/deletefood",{
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
    setMainLoading(false);
  }
   
  else{
    fetchFoods();
    const timeoutId = setTimeout(() => {
      setMainLoading(false);
  }, 3000);
    toast.success("Food Deleted succesfully");
    
  }

}



//





//

const[uFood,setUFood] = useState({
 
});
const UpdateFood =  (foodData) =>{
  window.scrollTo(0, 0);
  setEditData(foodData);
  setUFood(foodData)
  
   }




   const UpdateFoodData = async (e) => {
    e.preventDefault();
    setMainLoading(true);
    const {_id,name, description, price, image} = uFood; 

    const res =  await fetch("/api/auth/updatefood",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
       _id, name, description, price, image
      })
   
    });

    const data = await res.json();

  
     
   if(res.status==400){
      toast.error("Please enter valid details");
      setMainLoading(false);
    }

    else if(res.status==500){
      setMainLoading(false);
      alert("Cannot Update!! Server Error");
    }
    else{
      fetchFoods();
      const timeoutId = setTimeout(() => {
        setMainLoading(false);
    }, 3000);
    clear();
      toast.success("Food Updated successfully");  

    }    
}
  

  return ( <>
   {mainLoading && foodData.length === 0 ? (<>
      <Loading />
    </>) : (<>  
    <div className='fe px-4'> 

    
      
      <div className="mx-auto " style={{marginTop: "120px", maxWidth: "1300px"}}>   

    {editData && editData._id ? (

      <>    <div className="containermd shadow p-4 pt-1" style={{ borderRadius: "10px", border: "none"}}>
      <div class="LoginLogo mt-2"><b>Update Food</b></div>
<div className="">
<div className="my-3">
    <input type="Text" className="form-control" id="name" name='name'
       value = {uFood.name}
      onChange = {handleInput}
    placeholder="Food Name"/>
  </div>
  <div className="mb-3">
    <input type="Text" className="form-control" id="description" name='description'
       value = {uFood.description}
      onChange = {handleInput}
    placeholder="Description"/>
  </div>
  <div className="mb-3">
    <input type="number" className="form-control" id="price" name='price'
       value = {uFood.price}
      onChange = {handleInput}
    placeholder="Price"/>
  </div>
  <div className="mb-3">
    <input type="Text" className="form-control" id="image" name='image'
       value = {uFood.image}
      onChange = {handleInput}
    placeholder="Image URL"/>
  </div>

  <button className="navButton mr-4 " onClick={UpdateFoodData} style= {{borderRadius: '5px', fontSize: "18px"}}>Update</button>
  <button onClick={clear} className="navButton " style= {{borderRadius: '5px', fontSize: "18px"}} >Clear</button>
 


</div>
</div></>
    ):(<>
    <div className="containermd orange shadow p-4 pt-1" style={{ borderRadius: "10px", border: "none"}}>
        <div class="LoginLogo"><b>Add New Food</b></div>
  <div className="">
  <div className="my-3">
      <input type="Text" className="form-control" id="name" name='name'
         value = {food.name}
        onChange = {handleInputs}
      placeholder="Food Name"/>
    </div>
    <div className="mb-3">
      <input type="Text" className="form-control" id="description" name='description'
         value = {food.description}
        onChange = {handleInputs}
      placeholder="Description"/>
    </div>
    <div className="mb-3">
      <input type="number" className="form-control" id="price" name='price'
         value = {food.price}
        onChange = {handleInputs}
      placeholder="Price"/>
    </div>
    <div className="mb-3">
      <input type="Text" className="form-control" id="image" name='image'
         value = {food.image}
        onChange = {handleInputs}
      placeholder="Image URL"/>
    </div>

    <button className="navButton mr-4 " onClick={PostData} style= {{borderRadius: '5px', fontSize: "18px"}}>Save</button>
    <button onClick={clear} className="navButton " style= {{borderRadius: '5px', fontSize: "18px"}}>Clear</button>

  
  </div>
  </div>
  </>
 )}



<div>

<div className="containermd2 shadow" style={{ overflowX: "auto", borderRadius: "10px", border: "none", height: "450px" }}>
<div class="LoginLogo"><b>Food List</b></div>
<table className="table m-0" style={{ backgroundColor: "white" }}>
<thead style={{ backgroundColor: "#2980B9", color: "white", position: "sticky", top: 0, zIndex: 1 }}>

    <tr>
    <th scope="col">Sr. No.</th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
  { foodData.map( (foodData, index)=>(
  
  
  <tr key ={index}>
      <td>{index+1}</td>
      <td style={{maxWidth: "100px"}}>{(foodData.name)}</td>
      <td style={{maxWidth: "100px"}}>{(foodData.description)}</td>
      
      <td> ₹ {foodData.price}.00</td>
     <td> 
      <LiaEdit className="Edit" onClick={()=>UpdateFood(foodData)}/>
       </td>
     <td> 
      <RiDeleteBin7Line className="Delete" onClick={()=>DeleteFood(foodData._id)} />
     </td>
    </tr>
  
))
}
   
    
  </tbody>
</table>
</div>

</div>







</div>
      
    </div>
    </>)}
    <ToastContainer
      position="top-center"
      autoClose={2000}
      />
 </> )
}
