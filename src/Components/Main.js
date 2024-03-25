import React, {useEffect, useState} from 'react'

import Food from './Food'






export default function Main() {
   const [FoodArray, setFoods] = useState([]);
  
  const API = "/api/auth/foodlist";
const fetchFoods = async (url) => {
  
     const res = await fetch(url);
     const data = await res.json();
    if(data.length > 0){
      setFoods(data);
    
      
    }
    
    
  
}


  useEffect(() =>{
    fetchFoods(API);
  
  })


 
  return (
    <div>


      
     <img src={ require('./Images/CR01.jpg')} className="img-fluid" alt="..."></img>
     
     <div className="FoodList row row-cols-1 row-cols-md-4 g-4 ">
   

      {FoodArray.map(food=>{
        return <div className="col">
        <div>
          <Food food = {food}/>
    
        </div>
        </div>
      })
      }

    </div>

</div>


    
  )
}
