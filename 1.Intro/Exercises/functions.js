function addition(x, y){
    return x + y;
}

console.log(addition(1,5));


function pokeMe(){
    console.log("Meow");
}


function approachSomeone(someoneToPoke){
    console.log("steps steps steps");
    someoneToPoke();
}

// approachSomeone(pokeMe);

const intro = function(name){
    console.log("Helllooooo im", name);
}

// intro("Dab");

const prepareIntro = (introFunc, name) => {
    console.log("Hmmm")
    introFunc(name);
}

prepareIntro(intro, "dab");

const me = {
    name: "Oliver",
    hobby: "adc" 
};

const aboutMe = (me) => {
    console.log("My Hobby is", me.hobby)
}

aboutMe(me);

const callLater = {
    toCall : () => {
        console.log("calling")
    }
};
callLater.toCall();
console.log(callLater);