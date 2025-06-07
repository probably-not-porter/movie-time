function feedback() {
    //sound();
    emoji();
    update_selected();
}
// Generates a random integer between the min and max
var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// play sound for click
function sound() {
    let newaudio = audio.cloneNode();
    newaudio.volume = audioVol;
    newaudio.play();
}
function update_selected() {
    let name = wheel.items[wheel.getCurrentIndex()]._label;
    document.getElementById("selected_item").innerText = name;
}
// emit emoji across screen
function emoji() {
    var pos = getRandomInteger(window.innerWidth * -1, window.innerWidth);
    $("body").append(
        `<img style="left: ${pos}px" class="particle" src="https://cdn4.iconfinder.com/data/icons/reaction/32/${fbReactions[getRandomInteger(0, fbReactions.length - 1)]}-512.png" />`,
    );
    $(".particle")
        .toArray()
        .forEach(function (particle) {
            var bounds = Math.random() * screen.width;
            $(particle).animate(
                { top: "-100%", opacity: 0 },
                getRandomInteger(1000, 2000),
                function () {
                    $(particle).remove();
                },
            );
        });
}
