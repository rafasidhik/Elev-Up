const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("movies");
const resultsSection = document.getElementById("resultsSection");
const modal = document.getElementById("movieModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

searchBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchMovies();
    }
});
async function searchMovies() {
    const query = searchInput.value.trim();
    if (!query) {
        alert("Enter a movie name");
        return;
    }
    resultsSection.classList.remove("hidden");
    moviesContainer.innerHTML = "<h2>Searching...</h2>";
    try {
        const response = await fetch(
            `/api/movies?s=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        if (data.Response === "False") {
            moviesContainer.innerHTML =
            "<h2>No Movies Found</h2>";
            return;
        }
        displayMovies(data.Search);
    } catch (error) {
        moviesContainer.innerHTML =
        "<h2>Error Fetching Movies</h2>";
        console.error(error);
    }
}
async function displayMovies(movies) {
    moviesContainer.innerHTML = "";
    for (const movie of movies) {
        const detailsResponse = await fetch(
            `/api/movies?i=${movie.imdbID}`
        );
        const details = await detailsResponse.json();
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.innerHTML = `
        <img src="${details.Poster}" alt="${details.Title}">
        <div class="movie-info">
            <h3>${details.Title}</h3>
            <p>📅 ${details.Year}</p>
            <p>🎭 ${details.Genre}</p>
            <p class="rating">
                ⭐ ${details.imdbRating}
            </p>
            <div class="card-buttons">
                <button
                    class="details-btn"
                    onclick="showDetails('${details.imdbID}')">
                    Details
                </button>
            </div>
        </div>
        `;
        moviesContainer.appendChild(card);
    }
}
async function showDetails(id) {
    const response = await fetch(
        `/api/movies?i=${id}`
    );
    const movie = await response.json();
    modalBody.innerHTML = `
    <div class="modal-body">
        <img src="${movie.Poster}">
        <div class="modal-details">
            <h2>${movie.Title}</h2>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
            <p><strong>IMDb Rating:</strong> ⭐ ${movie.imdbRating}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
        </div>
    </div>
    `;
    modal.style.display = "flex";
}
closeModal.onclick = () => {
    modal.style.display = "none";
};
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};