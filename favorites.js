// Function to display the list of favorite movies
function displayFavourites() {
    // Get the container for displaying favorites list
    const favouritesListContainer = document.getElementById('favouritesList');
    favouritesListContainer.innerHTML = ''; // Clear the container

    // Retrieve the list of favorite movies from local storage
    const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];

    // Check if the favorites list is empty
    if (favouritesList.length === 0) {
        // Display a message when the favorites list is empty
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your favorites list is empty.';
        favouritesListContainer.appendChild(emptyMessage);
    } else {
        // Iterate through each favorite movie and create a card for it
        favouritesList.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('card', 'col-md-4', 'mb-4');
            movieCard.innerHTML = `
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <button class="btn btn-danger btn-sm remove-button" data-imdbid="${movie.imdbID}">Remove from Favourites</button>
                    <a href="movie.html?id=${movie.imdbID}" class="btn btn-secondary btn-sm more-button">More</a>
                </div>
            `;
            favouritesListContainer.appendChild(movieCard);
        });
    }

    // Add event listeners to remove buttons in each card
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromFavourites);
    });
}

// Function to remove a movie from the favorites list
function removeFromFavourites(event) {
    const imdbID = event.target.dataset.imdbid;
    const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];

    // Find the movie to remove from the favorites list
    const movieToRemove = favouritesList.find(movie => movie.imdbID === imdbID);

    if (movieToRemove) {
        // Filter out the movie to be removed and update the favorites list in local storage
        const updatedFavouritesList = favouritesList.filter(movie => movie.imdbID !== imdbID);
        localStorage.setItem('favourites', JSON.stringify(updatedFavouritesList));
        alert(`${movieToRemove.Title} has been removed from your favorites!`);
        // Refresh the display of favorites
        displayFavourites();
    } else {
        alert('Movie not found in favorites!');
    }
}

// Add an event listener to display favorites when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    displayFavourites();
});

// Add an event listener to display favorites when the 'favourites' link is clicked
const favouritesLink = document.querySelector('a[href="favourites.html"]');
favouritesLink.addEventListener('click', displayFavourites);
