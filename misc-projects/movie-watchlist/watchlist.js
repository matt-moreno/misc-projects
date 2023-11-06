const movieContainer = document.getElementById("movie-container")
const savedMovies = JSON.parse(localStorage.getItem("myMovies"))
const emptyHtml = `
<h3>Your watchlist is looking a little empty...</h3>
<a href="index.html">
    <i class="fa-solid fa-plus" style="color: #000000;"> Let's add some movies!
</a>`

window.addEventListener("click", removeMovie)

function removeMovie(e) {
    const imdbId = e.target.dataset.movieId
    const index = savedMovies.indexOf(imdbId)
    if (e.target.id === imdbId) {
        savedMovies.splice(index, 1)
        localStorage.setItem("myMovies", JSON.stringify(savedMovies))
        location.reload()
    }
}

if (savedMovies) {
    renderSavedMovies(savedMovies)
} else movieContainer.innerHTML = emptyHtml

if (savedMovies.length === 0) {
    movieContainer.innerHTML = emptyHtml
}


function renderSavedMovies(movies) {
    for (let movie of movies) {
        fetch(`http://www.omdbapi.com/?i=${movie}&apikey=fe60240b`)
        .then(res => res.json())
        .then(data => {
            movieContainer.innerHTML += `
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
                                    <i class="fa-solid fa-minus" style="color: #000000;"></i> Remove</button>
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
