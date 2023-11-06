import {dogs, likedDogs} from "/data.js"
import DogCreator from "/Dog.js"

const dislikeBtn = document.getElementById("dislike-btn")
const likeBtn = document.getElementById("like-btn")
const dogProfile = document.getElementById("dog-profile")

for (let i = 0; i < dogs.length; i++) {
    console.log(dogs[i])
}

// Dislike button functionality
dislikeBtn.onclick = function() {
    renderNopeBadge()
    setTimeout(() => render(), 1500)
}

function renderNopeBadge() {
    document.getElementById("badge-nope").style.display = "flex"
    dislikeBtn.disabled = true
}

// Like Button functionality
likeBtn.onclick = function() {
    renderLikeBadge()
    setTimeout(() => render(), 1500)
}

function renderLikeBadge() {
    document.getElementById("badge-like").style.display = "flex"
    likeBtn.disabled = true 
}

// Renders page
function render() {
    dislikeBtn.disabled = false
    likeBtn.disabled = false
    // Try to understand the below
    const amountOfDogs = dogs.length

    if (amountOfDogs > 0) {
        const getDogData = dogs.shift()
        const renderDog = new DogCreator(getDogData)
        dogProfile.innerHTML = renderDog.getDogProfileHtml()
    } else {
        const likedPage = new DogCreator()
        dogProfile.innerHTML = likedPage.getFinalPageHtml()
        document.getElementById("bottom-bar").style.display = "none"
    }
}

render()