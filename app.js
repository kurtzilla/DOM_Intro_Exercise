console.log("Javascript is alive!");
/*
1. Change the greeting from "Hello, There!" to "Hello, World!".
2. Set the background color of each `<li>` to `yellow`.
3. Create an image tag, set its `src` attribute to `http://49.media.tumblr.com/tumblr_m6qt1rjPSz1rxjzkho1_500.gif`,
 and append the to the `#greeting` div.
*/
//<div id="greeting">
var greet = document.getElementById("greeting");
greet.innerText = "Hello, World!";
var lis = document.getElementsByTagName("li");
for(var i=0;i<lis.length; i++) {
    lis[i].style.backgroundColor = 'yellow';
}

var newImg = document.createElement('img');
newImg.src = 'http://49.media.tumblr.com/tumblr_m6qt1rjPSz1rxjzkho1_500.gif';
greet.appendChild(newImg);


/*4. Add the class of `selected` to an `<li>` when it is clicked. Remove it from any other `li`s as well.
5. Change the image to be the most recently clicked food item.
6. When the gray div is moused over, it's removed from the DOM.
7. When the orange div is moused over, its width doubles. When the mouse moves out of the div, it returns to its original size.
8. When the reset button is clicked - remove the `selected` class from each `<li>` and change the image to `panic.jpeg`.
9. When the 1, 2, 3, 4, 5, 6, 7, 8, 9, or 0 key is pressed, the page alerts the message "I HATE NUMBERZZZ!"

*/
var deselectLis = function() {
    for(var i=0;i<lis.length;i++){
        removeClass(lis[i], 'selected');
    }
}

var removeClass = function(element, className){
    //console.log('remove it');
    element.classList.remove(className);
};

for(var i=0;i<lis.length;i++){
    lis[i].addEventListener("click", function() {
        console.log(this);
        deselectLis();
        this.classList.add('selected');

        //get inner text of li to feed content for altTxt and imgSrc
        var inner = this.innerText;
        var imgSrc = './images/' + inner + '.jpeg';
        var altTxt = inner;

        //get img
        var clickImg = document.querySelector('#essentials + div > img');
        clickImg.src = imgSrc;
        clickImg.alt = altTxt;
    });
}

//http://red-team-design.com/removing-an-element-with-plain-javascript-remove-method/
document.querySelector('#ghosting').addEventListener("mouseover", function() {
    this.parentNode.removeChild(this);
});

document.querySelector('#resize').addEventListener("mouseover", function() {
    //console.log('hallo');
    this.style.width = '400px';
});

document.querySelector('#resize').addEventListener("mouseout", function() {
    this.style.width = '200px';
});

document.querySelector('#reset').addEventListener("click", function() {
    deselectLis();
    var clickImg = document.querySelector('#essentials + div > img');
    clickImg.src = './images/panic.jpeg';;
    clickImg.alt = 'panic';
});

//9. When the 1, 2, 3, 4, 5, 6, 7, 8, 9, or 0 key is pressed, the page alerts the message "I HATE NUMBERZZZ!"
//let's do a body append child - and use css to style absolute/obnoxious!!!
document.onkeypress = function(e) {
    e = e || window.event;
    var alertP = document.getElementById('alerter');

    if (e.keyCode >= 48 && e.keyCode <= 57) {
        console.log(e.keyCode);

        var alertP = document.getElementById('alerter');

        if(!alertP){
            alertP = document.createElement("p");
            alertP.id = 'alerter';
            alertP.innerText = 'I HATE NUMBERZZZ!';

            document.body.insertBefore(alertP,document.body.childNodes[0]);
            }
    } else if(alertP){
        alertP.parentNode.removeChild(alertP);
    }
};

var konamiCode = [38,38,40,40,37,39,37,39,66,65];
var latestAttempt = [];

document.onkeydown = function checkKey(e) {

    e = e || window.event;

    //init array if empty and the sequence has begun
    //
    if(latestAttempt.length == 0 && e.keyCode == 38){
        console.log('init konami');
        latestAttempt.push(e.keyCode);

    } else if(latestAttempt.length > 0 &&
        [37,38,39,40,65,66].indexOf(e.keyCode) > -1 ){
            console.log('attempt at sequence ' + e.keyCode);
            latestAttempt.push(e.keyCode);

            for(var i=0;i<latestAttempt.length;i++){
                if(konamiCode[i] !== latestAttempt[i]) {
                    console.log('sequence reset')
                    latestAttempt = [];//reset
                } else if(konamiCode[i] === latestAttempt[i] && (i == konamiCode.length - 1)) {
                    //we have matched all the way to the end of the code - show the div!
                    var winnerP = document.createElement('p');
                    winnerP.id = 'winner';
                    winnerP.innerText = 'YOU ARE AN EVENT HANDLER GURUUUUUUUUU!';
                    document.body.insertBefore(winnerP,document.body.childNodes[0]);
                }
            }
    } else {
        var winner = document.getElementById('winner');

        if(winner){
            winner.parentNode.removeChild(winner);
        }
        latestAttempt = [];//reset
    }
}
