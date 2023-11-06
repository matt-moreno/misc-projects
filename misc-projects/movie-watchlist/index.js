const search = document.getElementById("search")
const searchBtn = document.getElementById("search-btn")
const movieList = document.getElementById("movie-list")
let savedMovies = JSON.parse(localStorage.getItem("myMovies"))
// localStorage.clear()

// Checks if movie data is saved to local storage to prevent overwriting.
if (!savedMovies) {
    savedMovies = []
} 

searchBtn.addEventListener("click", getSearchData)
window.addEventListener("click", setMovieId)

function getSearchData(e) {
    movieList.innerHTML = ``
    e.preventDefault()
    getMovieData(search.value)
}

// Gets array of movie names and passes it to render movies function.
function getMovieData(movies) {
    fetch(`http://www.omdbapi.com/?s=${movies}&type=movie&apikey=fe60240b`)
        .then(res => res.json())
        .then(data => {
            renderMovies(data.Search)
        })
}

// Iterates through movie array, gets the imdbID, passes id to API,
// and then renders the movie list html.
function renderMovies(movies) {
    for (let movie of movies) {
        const imdbId = movie.imdbID
        fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=fe60240b`)
            .then(res => res.json())
            .then(data=> {
                movieList.innerHTML += `
                <div class="movie-container">
                    <div class="movie-wrapper">

                        <div class="movie-poster-wrapper">
                            <img src="${data.Poster}" class="movie-image">
                        </div>
                    
                        <div class="movie-info-container">
                            <div class="movie-title">
                                <div class="title-wrapper">
                                    <p>${data.Title}<p>
                                </div>
                                <div class="rating-container">
                                    <img src="Images/star-icon.png" class="star-icon">
                                    <p class="rating">${data.Ratings[0].Value.replace("/10", "")}</p>
                                </div>
                            </div>

                            <div class="movie-details">
                                <div>
                                    <p>${data.Runtime}</p> 
                                </div>
                                <div>
                                    <p>${data.Genre}</p>
                                </div>
                                <div>
                                    <button
                                    id="${data.imdbID}"
                                    data-movie-id="${data.imdbID}"
                                    class="add-watchlist">
                                    <i class="fa-solid fa-plus" style="color: #000000;"></i> Watchlist</button>
                                </div>
                            </div>

                            <div class="movie-description">
                                <p>${data.Plot}</p>
                            </div>     
                        </div>

                    </div>
                </div>`
            })    
    }
}

// Saves imdbID to local storage
function setMovieId(e){
    const watchlistId = document.getElementById(e.target.id)
    const imdbId = e.target.dataset.movieId
    if (e.target.id === imdbId) {
        savedMovies.push(imdbId)
        localStorage.setItem("myMovies", JSON.stringify(savedMovies))
        watchlistId.textContent = "Added"
        watchlistId.disabled = true
    }
}