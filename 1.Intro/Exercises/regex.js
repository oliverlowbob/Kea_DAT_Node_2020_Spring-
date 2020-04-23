let twinkleStarSong = "Twinkle, twinkle little star"
//gi efter matcher flere gange, samt upper og lowercase
console.log(twinkleStarSong.match(/twinkle/gi))

const humStr = "That's a humbug!"
const hugStr = "I need a hug."

//matcher alt efter hu
const huReg = /hu./

console.log(hugStr.match(huReg))
console.log(humStr.match(huReg))

console.log("He's a fun 'un'".match(/.un/gi))


//match alt der starter med b og slutter med g
console.log("I found big bugs in my bag".match(/b[aiu]g/ig))

console.log("I found big bugs in my bag".match(/[aeiou]/ig))


//range fra a-z 
console.log("I found big bugs in my bag".match(/[a-z]/ig))
