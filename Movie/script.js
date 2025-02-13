const apiKey = "5c0bac6b"; // Your OMDB API Key
const searchBox = document.getElementById("search-box");
const movieList = document.getElementById("movie-list");
const loader = document.getElementById("loader");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageNumber = document.getElementById("page-number");

let searchQuery = "";
let page = 1;
let totalPages = 1;
let debounceTimer = null;

// Fetch Movies from API
async function fetchMovies(query, page = 1) {
    if (!query) return;
    loader.style.display = "block";

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`);
        const data = await response.json();
        loader.style.display = "none";

        if (data.Search) {
            movieList.innerHTML = "";
            data.Search.forEach(movie => {
                const movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");
                movieCard.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <h3>${movie.Title} (${movie.Year})</h3>
                `;
                movieCard.addEventListener("click", () => showMovieDetails(movie.imdbID));
                movieList.appendChild(movieCard);
            });

            totalPages = Math.ceil(data.totalResults / 10); // Calculate total pages
            updatePaginationButtons();
        } else {
            movieList.innerHTML = "<p>No movies found!</p>";
            totalPages = 1;
            updatePaginationButtons();
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Update Pagination Controls
function updatePaginationButtons() {
    pageNumber.innerText = `Page ${page}`;
    prevBtn.disabled = page <= 1;
    nextBtn.disabled = page >= totalPages;
}

// Change Page Function
function changePage(step) {
    if ((step === -1 && page > 1) || (step === 1 && page < totalPages)) {
        page += step;
        fetchMovies(searchQuery, page);
    }
}

// Debounced Search
function debounceSearch() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        searchQuery = searchBox.value.trim();
        page = 1;
        fetchMovies(searchQuery, page);
    }, 500);
}

// Show Movie Details in Modal
async function showMovieDetails(movieID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieID}`);
        const data = await response.json();

        const movieDetails = document.getElementById("movie-details");
        movieDetails.innerHTML = `
            <h2>${data.Title} (${data.Year})</h2>
            <img src="${data.Poster}" width="100%">
            <p><strong>Plot:</strong> ${data.Plot}</p>
            <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
        `;

        document.getElementById("movie-modal").style.display = "flex";
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
}

// Close Modal
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("movie-modal").style.display = "none";
});
