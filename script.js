             //settings
const resultEl = document.getElementById('results')
const lengthEl = document.getElementById('length')
const lowercaseEl = document.getElementById('lowercase')
const uppercaseEl = document.getElementById('uppercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')



const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
 }

 //clipboard element

 clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password) { return }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard!')
})




//generate 

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumbers = numbersEl.checked
    const hasSymbols = symbolsEl.checked
    

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbols, length)
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    if(typesCount === 0) {
        return ''
    }


    for(let i = 0; i < length; i+=typesCount) {
        typesArr.forEach(type =>{
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword
}


//lowercase
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 97)
}
//uppercase
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 65)
}
//number
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()*10) + 48)
}

//symbols
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]+<>/,.'
    return symbols[Math.floor(Math.random()* symbols.length)]
}

//console.log(getRandomSymbol())