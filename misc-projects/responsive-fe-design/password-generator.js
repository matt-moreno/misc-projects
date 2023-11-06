const characters =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let passLength = 12
let passOne = document.getElementById("firstPass")
let passTwo = document.getElementById("secondPass")

function generateChar() {
    let randomCharactersOne = Math.floor(Math.random() * characters.length)
    return characters[randomCharactersOne]
}

function generateRandomPass() {
    let randomPass = ""
    for (i = 0; i < passLength; i++) {
        randomPass += generateChar()
    }
    return randomPass
}

function generatePasswords() {
    const password = generateRandomPass()
    // const passwordTwo = generateRandomPassTwo()
    const passwordTwo = generateRandomPass()
    
    passOne.textContent = password
    passTwo.textContent = passwordTwo
} 
