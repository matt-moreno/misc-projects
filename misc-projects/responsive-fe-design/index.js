let numberCounter = document.getElementById("num-counter") // pass in arguments
let saveNumber = document.getElementById("save-el")

let count = 0

function increase() {
    count += + 1
    numberCounter.innerText = count
}

function decrease() {
    count += - 1
    numberCounter.innerText = count
}

function save() {
    let saveNum = count + " - "
    saveNumber.textContent += saveNum
    count = 0
    numberCounter.textContent = count
}
