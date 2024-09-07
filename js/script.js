// www.themealdb.com/api/json/v1/1/lookup.php?i=52772   by id
// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood


//  get variables
let input = document.querySelector('input'), searchBtn = document.querySelector('.fa-search'),
searchArea = document.querySelector('.results-area'),
detailssection=document.querySelector('.recipe-details');


// console.log(searchBtn,input)


searchBtn.addEventListener('click', getmeals);
// get meals func
async function getmeals() {
    let searchItem = input.value.trim();
    if(searchItem!='')
    {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchItem}`);
        response = await response.json();
             DisplayAllRecipes(response)
           
    }
  
   
}
// dispaly all recipes functions
function DisplayAllRecipes(response)
{
    
   if(response.meals==null)
   {
    searchArea.innerHTML='No DATA To Show'
    return;
   }
    let cartona = ``;
    for(let i=0 ; i< response.meals.length;i++)
    {
          cartona+= ` <div class="card">
          <div class="card-img">
              <img src="${response.meals[i].strMealThumb}" alt="">
          </div>
          <h2 class="my-3">${response.meals[i].strMeal}</h2>
          <a onclick="details(${response.meals[i].idMeal})">Get Recipe</a>
           
      </div>`
    }
    searchArea.innerHTML=cartona;
}

// details of a meal
async function details(id)
{
       let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)  ;
       response = await response.json()
       console.log(response)
       let RecipeDetails= document.querySelector('.recipe-details')
       let cartona = ``
       cartona+=`
       <i class="fa-solid fa-xmark"></i>
            <div class="text">
                <h3>${response.meals[0].strMeal}</h3>
                <h4>Instructions:</h4>
                <p>${response.meals[0].strInstructions}</p>
                <a href="${response.meals[0].strYoutube}">Watch Recipe</a>
            </div>
       `
       
       RecipeDetails.innerHTML=cartona;
       RecipeDetails.style.display='block';
       document.querySelector('.search-area').style.display='none'
}


// close details meal


detailssection.addEventListener('click',close)
function close(e)
{
    // console.log(e.target)
    if(e.target.classList.contains('fa-xmark'))
    {
        // console.log('hi')
       detailssection.style.display='none';
         document.querySelector('.search-area').style.display='flex'

    }
}