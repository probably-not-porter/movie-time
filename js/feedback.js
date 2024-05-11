// Generates a random integer between the min and max
var getRandomInteger = function(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min
}

// play sound for click
function sound(){
    let newaudio = audio.cloneNode()
    newaudio.volume = audioVol;
    newaudio.play();
    emoji();
}

// emit emoji across screen
function emoji(){
    var pos = getRandomInteger(window.innerWidth * -1,window.innerWidth)
    $('body').append(`<img style="left: ${pos}px" class="particle" src="https://cdn4.iconfinder.com/data/icons/reaction/32/${fbReactions[getRandomInteger(0,fbReactions.length - 1)]}-512.png" />`)
    $('.particle').toArray().forEach(function(particle){
        var bounds = Math.random() * screen.width;
        console.log(bounds)
            $(particle).animate({ top: '-100%', opacity: 0}, getRandomInteger(1000, 2000) , function(){
                $(particle).remove()
            })
    })

}