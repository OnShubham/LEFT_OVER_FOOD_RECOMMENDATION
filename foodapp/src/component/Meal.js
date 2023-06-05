import React, { useState } from "react";
import Mealitem from "./MealItem";
// import axios from "axios";

const Meal = () => {
    const [search, setSearch] = useState("");
    const [Mymeal, setMeal] = useState(null);
    // const APP_ID = "3bfa5a41";
    // const APP_KEY = "298ff82fdf63c442d2e01a09bf6fe85a"
    // const url = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const searchMeal = (evt) => {
        if (evt.key === "Enter") {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
                .then(res => res.json())
                .then(data => {
                    setMeal(data.meals);
                    setSearch("");
                })
        }
    }
    // const getData = async () => {
    //     const result = await axios.get(url);
    //     console.log(result)
    // }
    

    return (
        <>
            <div className="main">
                <div className="heading1">
                    {/*  onClick={getData} */}
                    <h1>Search Your Food Recipe</h1>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque tempore unde sed ducimus voluptates illum!</h4>
                </div>
                <div className="searchBox">
                    <input type="search" placeholder="Which meal you want" className="search-bar" onChange={(e) => setSearch(e.target.value)} value={search} onKeyPress={searchMeal} />
                </div>
                <div className="container1">
                    {   
                        (Mymeal === null) ? <p className="notSearch">Not found</p> : 
                        Mymeal && Mymeal.map((res) => {return <Mealitem key={res.idMeal} data={res} />
                        })    
                    }
                </div>
            </div>
        </>
    )
}

export default Meal;



// import React, { useState } from "react";
// import Mealitem from "./MealItem";

// const API_KEY = "50bfbe60e90248eba0b50991a0426cfe";

// const Meal = () => {
//   const [search, setSearch] = useState("");
//   const [Mymeal, setMeal] = useState(null);
//   const searchMeal = (evt) => {
//     if (evt.key === "Enter") {
//       fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${search}/information?apiKey=${API_KEY}`)
//         .then(res => res.json())
//         .then(data => {
//           setMeal(data.results);
//           setSearch("");
//         });
//     }
//   };

//   return (
//     <>
//       <div className="main">
//         <div className="heading1">
//           <h1>Search Your Food Recipe</h1>
//           <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque tempore unde sed ducimus voluptates illum!</h4>
//         </div>
//         <div className="searchBox">
//           <input
//             type="search"
//             placeholder="Which meal you want"
//             className="search-bar"
//             onChange={(e) => setSearch(e.target.value)}
//             value={search}
//             onKeyPress={searchMeal}
//           />
//         </div>
//         <div className="container1">
//           {(Mymeal === null) ? (
//             <p className="notSearch">Not found</p>
//           ) : (
//             Mymeal &&
//             Mymeal.map((res) => (
//               <Mealitem
//                 key={res.idMeal}
//                 data={res}
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Meal;
