import { mainBlog, blogData } from "/js/data.js";

// Renders blogs on main page
function render() {
    document.getElementById("main-blog").innerHTML =`
        <p class="main-date">${mainBlog.date}</p>
        <h1>${mainBlog.titleOne}<br>${mainBlog.titleTwo}</h1>
        <p class="main-content">${mainBlog.content}.</p>`

    blogData.forEach(function(data) {
        document.getElementById("blog-post").innerHTML +=`
        <img 
        class="blog-image"
        src="${data.image}" 
        alt="${data.alt}">
        <p class="blog-date">${data.date}</p>
        <h1>${data.title}</h1>
        <p>${data.content}</p>` 
    })
}

render()