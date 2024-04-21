import React, {useEffect, useState} from 'react'
import Loading from './Loading';
import Food from './Food'


export default function Main() {
  const [FoodArray, setFoods] = useState([]);
  const [mainLoading, setMainLoading] = useState(true);
  const API = "/api/auth/foodlist";

 

  const fetchFoods = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    if (data.length > 0) {
        setFoods(data);
        const timeoutId = setTimeout(() => {
            setMainLoading(false);
        }, 3000);
    } else {
        // If no data is fetched, immediately set loading to false
        setMainLoading(false);
    }
}


useEffect(() => {
  fetchFoods(API);
}, []);


 
  

 
  return (<>
   {mainLoading && FoodArray.length === 0 ? (<>
      <Loading />
    </>) : (<>
      <div>
        {FoodArray && FoodArray.length > 0 ? (
          <>
           <img src={require('./Images/CR01.jpg')} className="img-fluid" alt="..." />
            <p style={{ fontSize: "25px", textAlign: "center", fontWeight: "900", color: '#2980B9' }}>Choose your food</p>
            <div className="FoodList mx-auto" style={{ display: "flex", flexWrap: "wrap", maxWidth: "1320px" }}>
              {FoodArray.map((food, index) => (
                <div className="FoodMapOfLandingPage" key={index}>
                  <Food food={food} />
                </div>
              ))}
            </div>
          </>
        ) : (<>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
              <img src={require('./Images/NoDataHome.png')} className="img-fluid" alt="..." style={{ width: '90vw', height: 'auto', maxWidth: '600px' }} />
              <p style={{ fontSize: '25px', fontWeight: '500', color: '#A6A6A6', marginTop: '-70px' }}>Data not available</p>
            </div>
          </div>
        </>)}
      </div>
    </>)}
   
 
 </>)}
