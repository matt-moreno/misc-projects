import {menuArray} from "./data.js"

const menu = document.getElementById("menu")
const orderedItems = document.getElementById("ordered-items")
const paymentModal = document.getElementById("payment-modal")
const completeOrder = document.getElementById("complete-order")
const order = document.getElementById("order")
const totalAmount = document.getElementById("total-amount")
const pay = document.getElementById("pay")
let total = 0

document.addEventListener("click", function(event){
    if(event.target.dataset.pizza || 
    event.target.dataset.hamburger ||
    event.target.dataset.beer) {
        addToOrder(event.target.dataset.pizza,
            event.target.dataset.hamburger,
            event.target.dataset.beer)
    }

    if (event.target === completeOrder){
        openModal()
    }

    if (event.target === pay) {
        closeModal(event)
    }
})

// Renders menu
function getMenu() {
    menuArray.forEach(function(item){
    menu.innerHTML += `
    <div class="foodItems">
        <h2 class="emojis">${item.emoji}</h2>
        <div class="foodDescription">
            <h3 class="itemName">${item.name}</h3>
            <p class="itemIngredients">${item.ingredients}</p>
            <h4 class="itemPrice">$${item.price}</h4>
        </div>
        <div class="iconContainer">
            <i class="fa-solid fa-plus addIcon" data-${item.name}=${item.id}></i>
        </div>
    </div>`
    })
    return menu
    }

// Adds the selected menu items to your order
function addToOrder(pizza, hamburger, beer) {
    // Add an empty array so we can add these items to the array?
    if (pizza){
        orderedItems.innerHTML +=
    `<div>
        <span class="orderedItems">${menuArray[0].name}</span>
        <span class="remove" id="remove">Remove</span>
        <span class="totalDue">$${menuArray[0].price}</span>
    </div>`
    } else if (hamburger) {
        orderedItems.innerHTML +=
    `<div>
        <span class="orderedItems">${menuArray[1].name}</span>
        <span class="remove" id="remove">Remove</span>
        <span class="totalDue">$${menuArray[1].price}</span>
    </div>`
    } else if (beer) {
        orderedItems.innerHTML +=
    `<div>
        <span class="orderedItems">${menuArray[2].name}</span>
        <span class="remove" id="remove">Remove</span>
        <span class="totalDue">$${menuArray[2].price}</span>
    </div>`
    }
    order.style.display = "block"
    getTotal(pizza, hamburger, beer)
}

// Adds the total of the selected items
function getTotal(pizza, hamburger, beer) {
    if (pizza) {
        total += + 14
    } else if (hamburger || beer) {
        total += + 12
    } 
    totalAmount.innerHTML =
    `<span class="orderedItems">Total price:</span>
    <span class="totalDue">$${total}</span>` 
}

// Add the removal of selected item function below


// Opens modal
function openModal() {
    paymentModal.style.display = "flex" 
}

// Closes modal and shows thank you message
function closeModal(event) {
    event.preventDefault()
    console.log("done")
    paymentModal.style.display = "none" 
    order.innerHTML =
    `<h2>Thanks for ordering</h2>`
}

getMenu()
