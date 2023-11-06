function DogCreator(data) {
    Object.assign(this, data)
    const {name, avatar, age, bio} = this

    this.getDogProfileHtml = function() {   
        return `
        <img id="badge-like" src="images/badge-like.png">
        <img id="badge-nope" src="images/badge-nope.png">
        <img class="dog-photo" src=${avatar}>
        <div class="bottom-left-text">${name}, ${age}<br>
        <span class="bio-subtext">${bio}</span>
        </div>`    
        }

    this.getFinalPageHtml = function() {
            return `
            <h1>CONGRATULATIONS<h1>
            <h2>These are all the dogs you liked</h2>`
    }

} 

export default DogCreator 