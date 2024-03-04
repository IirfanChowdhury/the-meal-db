const getInputField = (btnField) => {
    const searchInput = document.getElementById(btnField)
    const searchInputValue = searchInput.value
    searchInput.value = '';
    if(isNaN(searchInputValue) && searchInputValue != ''){
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputValue}`
        fetch(url)
        .then(res => res.json())
        .then(data => getFishMeal(data.meals))
        document.getElementById('search-field').style.boxShadow = ''
        document.getElementById('search-field').style.borderColor = ''
        document.getElementById('error-msg').style.display = 'none'
        
    }
    else{
        document.getElementById('search-field').style.boxShadow = '0 0 0 0.1rem red'
        document.getElementById('search-field').style.borderColor = 'red'
        document.getElementById('error-msg').style.display = 'block'
    }
}
const getFishMeal = (meals) => {
    const cardId = document.getElementById('card-id')
    cardId.textContent = '';
    document.getElementById('categories').style.display = 'none'
    const specificFood = document.getElementById('specific-food')
    specificFood.innerHTML = ''
    if(meals == null){
        document.getElementById('error-page').style.display = 'block'
        cardId.textContent = '';
        const specificFood = document.getElementById('specific-food')
        specificFood.textContent = ''
        document.getElementById('categories').style.display = 'none'
    }
    else{
        for (const meal of meals) {
            document.getElementById('error-page').style.display = 'none'
            const div = document.createElement('div')
            div.classList.add('col-lg-4', 'col-md-6')
            div.innerHTML = `
                            <div class="card-container">
                                <div class="card">
                                    <div class="card-face card-front">
                                        <img class="img-fluid" src="${meal.strMealThumb}" alt="Front Image">
                                        <h3 id="front-title">${meal.strMeal}</h3>
                                    </div>
                                    <div class="card-face card-back d-flex">
                                        <div id="back-title" class="w-100">
                                            <h3>${meal.strCategory}</h3>
                                            <h4>${meal.strArea}</h4>
                                            <p class="text-center">${meal.strInstructions.slice(0, 100)}</p>
                                            <button onclick="getSpecificMeal(${meal.idMeal})" class="btn btn-dark rounded-1 px-3 py-3 mt-2 fw-semibold"><a class="text-light text-decoration-none" href="#specific-food">More Details</a></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
            
            `
            cardId.appendChild(div)
        }
    }
}
const getSpecificMeal = (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => getSpecificMealDetails(data.meals[0]))
}
const getSpecificMealDetails = (food) => {
    const specificFood = document.getElementById('specific-food')
    const div = document.createElement('div')
    div.classList.add('row')
    div.innerHTML = `
    <div class="col-lg-12">
         <div class="text-center">
            <img class="img-fluid rounded-3" src="${food.strMealThumb}" alt="" srcset="">
         </div>
    </div>
    <div class="col-lg-12 text-light d-flex flex-column align-items-center my-4">
                <h1>Name : ${food.strMeal}</h1> 
                <h2>Category :${food.strCategory}</h2>
                <h3>Area : ${food.strArea}</h3>
                <p class="text-center">Instruction : ${food.strInstructions}</p>
                <a class="text-primary text-decoration-none" href="${food.strYoutube}">Click Here for Video</a>
    </div>
    
    `
    document.getElementById('categories').style.display = 'none'
    specificFood.innerHTML = ''
    specificFood.appendChild(div)
}
const getCategoriesData = (categorieName) => {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${categorieName}`
    fetch(url)
    .then(res => res.json())
    .then(data => categoriesItem(data.meals))
}
const categoriesItem = (meals) => {
    const cardId = document.getElementById('card-id')
    cardId.textContent = '';
    document.getElementById('categories').style.display = 'none'
    for(const meal of meals){
        console.log(meal);
        const div = document.createElement('div')
            div.classList.add('col-lg-4', 'col-md-6')
            div.innerHTML = `
                            <div class="card-container">
                                <div class="card">
                                    <div class="card-face card-front">
                                        <img class="img-fluid" src="${meal.strMealThumb}" alt="Front Image">
                                        <h3 id="front-title">${meal.strMeal}</h3>
                                    </div>
                                    <div class="card-face card-back d-flex">
                                        <div id="back-title" class="w-100">
                                            <h3>${meal.strCategory}</h3>
                                            <h4>${meal.strArea}</h4>
                                            <p class="text-center">${meal.strInstructions.slice(0, 100)}</p>
                                            <button onclick="getSpecificMeal(${meal.idMeal})" class="btn btn-dark rounded-1 px-3 py-3 mt-2 fw-semibold"><a class="text-light text-decoration-none" href="#main">More Details</a></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
            
            `
            cardId.appendChild(div)
    }
}

const categoriesFunction = (categoriesId , mainCategoryName) => {
    document.getElementById(categoriesId).addEventListener('click', function () {
        getCategoriesData(mainCategoryName)
    })
}




const searchField = (searchBtn , btnField) => {
    document.getElementById(searchBtn).addEventListener('click', () => {
        getInputField(btnField)
    
    })
}
searchField('search-btn' ,'search-field')

document.getElementById('home-back').addEventListener('click', function () {
    document.getElementById('categories').style.display = 'block'
    document.getElementById('error-page').style.display = 'none'
})
document.getElementById('search-field').addEventListener('focus', function(){
    document.getElementById('search-field').style.boxShadow = 'none'
    document.getElementById('search-field').style.boxShadow = ''
    document.getElementById('error-msg').style.display = 'none'
})
document.getElementById('navbar-toggler').addEventListener('click',() =>{
    const cardId = document.getElementById('card-id')
    cardId.textContent = '';
    document.getElementById('categories').style.display = 'block'
    const specificFood = document.getElementById('specific-food')
    specificFood.innerHTML = ''
})



categoriesFunction('fish-category' , 'fish')
categoriesFunction('salad-category' , 'salad')
categoriesFunction('beef-category' , 'beef')
categoriesFunction('chicken-category' , 'chicken')
categoriesFunction('soup-category' , 'soup')
categoriesFunction('cake-category' , 'cake')