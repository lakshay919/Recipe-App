let result = document.querySelector(".result");
let searchBtn = document.querySelector(".search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s="


searchBtn.addEventListener("click", () => {
    let search = document.getElementById("search-input").value;
    console.log(search)
    if (search !== "") {
        fetch(url + search).then(response => response.json()).then((data) => {
            let myMeal = data.meals[0];
            let meal = myMeal.strMeal;
            let mealArea = myMeal.strArea;
            let instruction = myMeal.strInstructions;
            let mealImage = myMeal.strMealThumb;
            let count = 1;
            let ingridients = [];

            for (let i in myMeal) {
                let measure = "";
                let ingridient = "";
                if (i.startsWith("strIngredient") && myMeal[i]) {
                    ingridient = myMeal[i];
                    measure = myMeal["strMeasure" + count];
                    count += 1;
                    ingridients.push(`${measure} ${ingridient}`)
                }
            }

            result.innerHTML = `
            <div class="img">
                <img src=${mealImage} alt="">
            </div>
            <div class="name-container">
              <h2>${meal}</h2>
              <h3>${mealArea}</h3>
            </div>
             <ul class="meal-ingridients"></ul>
              <div class="instructions">
                <button class="remove">X</button>
                <p>4${instruction}</p>
              </div>
            <button class="show">View Recipe</button>
            `
            let showInstuction = document.querySelector(".instructions")
            let parent = document.querySelector(".meal-ingridients")
            let showRecipe = document.querySelector(".show")
            let removeRecipe = document.querySelector(".remove")

            showRecipe.addEventListener("click", () => {
                showInstuction.classList.add("active")
            })

            removeRecipe.addEventListener("click", () => {
                showInstuction.classList.remove("active")
            })

            ingridients.forEach((i) => {
                let child = document.createElement("LI")
                child.innerText += i
                parent.appendChild(child);
            })
        }).catch(() => {
            result.innerHTML = `<h3>Recipe not found</h3>`
        })
    }
    else {
        result.innerHTML = `<h3>Input field cannot be empty</h3>`
    }
});