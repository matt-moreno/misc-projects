/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const convertBtn = document.getElementById("convert-btn")
const inputEl = document.getElementById("numInput")
const convTextOne = document.getElementById("conversionText1")
const convTextTwo = document.getElementById("conversionText2")
const convTextThree = document.getElementById("conversionText3")

convertBtn.addEventListener("click", function() {
    const feetToMeters = (inputEl.value/3.281).toFixed(3)
    const metersToFeet = (3.281 * inputEl.value).toFixed(3)
    const gallonsToLiters = (inputEl.value/0.264).toFixed(3)
    const litersToGallons = (0.264 * inputEl.value).toFixed(3)
    const poundsToKilos = (inputEl.value/2.204).toFixed(3)
    const kilosToPounds = (2.204 * inputEl.value).toFixed(3)
    
    convTextOne.innerHTML = `
    <p id="conversionText1">
    ${inputEl.value} meters = ${metersToFeet} feet | ${inputEl.value} feet = ${feetToMeters} meters
    </p>`
    
    convTextTwo.innerHTML = `
    <p id="conversionText2">${inputEl.value} liters = ${litersToGallons} gallons | ${inputEl.value} gallons = ${gallonsToLiters} liters
    </p>`
    
    convTextThree.innerHTML = `
    <p id="conversionText3">${inputEl.value} kilos = ${kilosToPounds} pounds | ${inputEl.value} pounds = ${poundsToKilos} kilos
    </p>`
    
  })  
