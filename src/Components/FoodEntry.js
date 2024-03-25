import React, {useEffect, useState} from 'react'





export default function FoodEntry() {
  

  const[food,setFood] = useState({
    name: "", description: "",price: "",image: ""
  });


 


  const[editData,setEditData] = useState();



let name,value;


  const handleInputs = (e) =>{
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setFood({...food, [name]:value});

  }



  const handleInput = (e) =>{
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUFood({...uFood, [name]:value});
  

  }

const PostData = async (e) => {
    e.preventDefault();

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
      console.log(data)
      alert("Please enter valid details");
    }
    else{
      alert("Food Added successfully");
     
      window.location.reload();
      
      
    }
    
    
}
  //
  const [foodData, setFoodData] = useState([]);
  
  const API = "/api/auth/foodlist";
const fetchFoods = async (url) => {
  
     const res = await fetch(url);
     const data = await res.json();
    if(data.length > 0){
      setFoodData(data);

      
    
      
    }
    
    
  
}


  useEffect(() =>{
    fetchFoods(API);
  
  },[])

//
const DeleteFood = async (_id) =>{
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
  }
   
  else{

    
   
    alert("Food Deleted succesfully");
    window.location.reload();
    
  }

}



//





//

const[uFood,setUFood] = useState({
 
});
const UpdateFood =  (foodData) =>{

  setEditData(foodData);
  setUFood(foodData)
  
   }




   const UpdateFoodData = async (e) => {
    e.preventDefault();

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
      console.log(data)
      alert("Please enter valid details");
    }

    else if(res.status==500){
      console.log(data)
      alert("Cannot Update!! Server Error");
    }
    else{
      alert("Food Updated successfully");
     
      window.location.reload();
      
      
    }
    
    
}
  

  return ( 
    <div className='fe'> 

    
      
      <div className="d-flex  row-cols-md-2 ">   

    {editData ? (

      <><div className="container-sm orange ">
      <div class="LoginLogo"><b>Update Food</b></div>
<form className="px-4 py-3">
<div className="mb-3">
    <label htmlfor="name" className="form-label"></label>
    <input type="Text" className="form-control" id="name" name='name'
       value = {uFood.name}
      onChange = {handleInput}
    placeholder="Food Name"/>
  </div>
  <div className="mb-3">
    <label htmlfor="description" className="form-label"></label>
    <input type="Text" className="form-control" id="description" name='description'
       value = {uFood.description}
      onChange = {handleInput}
    placeholder="Description"/>
  </div>
  <div className="mb-3">
    <label htmlfor="price" className="form-label"></label>
    <input type="Text" className="form-control" id="price" name='price'
       value = {uFood.price}
      onChange = {handleInput}
    placeholder="Price"/>
  </div>
  <div className="mb-3">
    <label htmlfor="image" className="form-label"></label>
    <input type="Text" className="form-control" id="image" name='image'
       value = {uFood.image}
      onChange = {handleInput}
    placeholder="Image URL"/>
  </div>

 
  <button type="submit" className="btn btn-outline-primary " onClick={UpdateFoodData} >Update</button>

  <button type="submit" className="btn btn-outline-primary  " >Clear</button>

</form>
</div></>
    ):(<><div className="container-sm orange">
        <div class="LoginLogo"><b>Add New Food</b></div>
  <form className="px-4 py-3">
  <div className="mb-3">
      <label htmlfor="name" className="form-label"></label>
      <input type="Text" className="form-control" id="name" name='name'
         value = {food.name}
        onChange = {handleInputs}
      placeholder="Food Name"/>
    </div>
    <div className="mb-3">
      <label htmlfor="description" className="form-label"></label>
      <input type="Text" className="form-control" id="description" name='description'
         value = {food.description}
        onChange = {handleInputs}
      placeholder="Description"/>
    </div>
    <div className="mb-3">
      <label htmlfor="price" className="form-label"></label>
      <input type="Text" className="form-control" id="price" name='price'
         value = {food.price}
        onChange = {handleInputs}
      placeholder="Price"/>
    </div>
    <div className="mb-3">
      <label htmlfor="image" className="form-label"></label>
      <input type="Text" className="form-control" id="image" name='image'
         value = {food.image}
        onChange = {handleInputs}
      placeholder="Image URL"/>
    </div>

   
    <button type="submit" className="btn btn-outline-primary "  onClick={PostData}>Save</button>
 
    <button type="submit" className="btn btn-outline-primary  " >Clear</button>
  
  </form>
  </div>
  </>
 )}



<div>

<div className="container-md orange" >
<div class="LoginLogo"><b>Food List</b></div>
<table className="table table-light" >
  <thead>
    <tr>
      <th scope="col">S.no</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
  { foodData.map( (foodData, index)=>(
  
  
  <tr key ={index}>
      <td>{index+1}</td>
      <td>{foodData.name}</td>
      
      <td>{foodData.price}</td>
     <td> 
      <img src={require('./Images/Edit.jpg')} className=" btn btn2 btn-outline-warning" onClick={()=>UpdateFood(foodData)}></img>
       </td>
     <td> 
      <img src={require('./Images/Delete.jpg')} className=" btn btn2 btn-outline-danger" onClick={()=>DeleteFood(foodData._id)} ></img>
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
  )
}
