// Get your API key from Spoonacular (replace 'YOUR_API_KEY' with your actual API key)
const apiKey = '61bf392f4ac04f109438e3dba20594e8';

// Function to fetch recipes based on search query (ingredient)
async function fetchRecipes(query) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            displayRecipes(data.results);
        } else {
            document.getElementById('recipe-container').innerHTML = `<p>No recipes found for "${query}". Please try another ingredient!</p>`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display recipes on the page
function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = ''; // Clear any existing recipes

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p><a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">View Recipe</a></p>
        `;
        recipeContainer.appendChild(recipeDiv);
    });
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-bar').value.trim();

    if (query) {
        fetchRecipes(query);
    } else {
        alert('Please enter an ingredient to search.');
    }
});

// Event listener for Enter key on search bar (optional)
document.getElementById('search-bar').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = document.getElementById('search-bar').value.trim();

        if (query) {
            fetchRecipes(query);
        } else {
            alert('Please enter an ingredient to search.');
        }
    }
});
