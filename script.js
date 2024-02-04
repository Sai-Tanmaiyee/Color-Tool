const hexInput = document.getElementById("hexInput")
const inputColor = document.getElementById("inputColor")
const sliderText = document.getElementById("sliderText")
const slider = document.getElementById("slider")
const alteredColor = document.getElementById("alteredColor")
const  alteredColorText=  document.getElementById("alteredColorText")
const ligthenText = document.getElementById("ligthenText")
const toggleBtn = document.getElementById("toggleBtn")
const darkenText = document.getElementById("darkenText")

toggleBtn.addEventListener("click", () => {
    if(toggleBtn.classList.contains('toggled')){
        toggleBtn.classList.remove('toggled')
        ligthenText.classList.remove('unselected')
        darkenText.classList.add('unselected')
    } else{
        toggleBtn.classList.add('toggled')
        ligthenText.classList.add('unselected')
        darkenText.classList.remove('unselected')
    }
    reset()
})

hexInput.addEventListener("keyup", () => {
    
    const hex = hexInput.value
    // if(!isValidHex(hex)) return
    let strippedHex = hex.replace("#", "")
    inputColor.style.background = "#" + strippedHex

    reset()
})

// function isValidHex = (hex) => {
//     strippedHex = hex.replace("#", "")
//     hex = "#" + strippedHex
//     return hex.length === 4 || hex.length === 7
// }

const convertHextoRGB = (hex) => {
    let strippedHex = hex.replace("#", "")
    if(strippedHex.length === 3) { 
        strippedHex[0] + strippedHex[0] 
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2]
    }

    const r = parseInt(strippedHex.substring(0, 2), 16)
    const g = parseInt(strippedHex.substring(2, 4), 16)
    const b = parseInt(strippedHex.substring(4, 6), 16)

    return {r, g, b}
}

const convertRGBToHex = (r, g, b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2)
    const secondPair = ("0" + g.toString(16)).slice(-2)
    const thirdPair = ("0" + b.toString(16)).slice(-2)

    const hex = "#" + firstPair + secondPair + thirdPair
    return hex;
}

slider.addEventListener("input", () => {
    sliderText.innerText = `${slider.value}%`

    const valueAddition = 
    toggleBtn.classList.contains("toggled") ?
    -slider.value :
    slider.value

    const newHex = alterColor(hexInput.value, valueAddition)
    alteredColor.style.background = newHex
    alteredColorText.innerText = `Altered Color ${newHex}`
})

const increaseWithIn0To255 = (hex, amount) => {
    return Math.min(255, Math.max(0, hex + amount))
}

const alterColor = (hex, percentage) => {
    const {r, g, b} = convertHextoRGB(hex)

    const amount = Math.floor((percentage/100) * 255)

    const newr =increaseWithIn0To255(r, amount)
    const newg = increaseWithIn0To255(g, amount)
    const newb = increaseWithIn0To255(b, amount)

    return convertRGBToHex(newr, newg, newb)
}

const reset = () => {
    slider.value = 0
    sliderText.innerText = `${slider.value}%`
    strippedHex = hexInput.value.replace("#", "")
    strippedHex = "#" + strippedHex
    alteredColor.style.backgroundColor = strippedHex
    alteredColorText.innerText = `Altered Color ${hexInput.value}`
}