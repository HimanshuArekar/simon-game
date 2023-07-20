var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var start = false;

//  For the staring the game by pressing any key
$(document).keypress(function(){
    if (!start){
        $("h1").text("level "+level);
        nextSequence();
        start = true;
    }
});

// For creating random patterns
function nextSequence(){
    userClickPattern = [];
    level++;
    $("h1").text("Level " + level);
    randomNumber = Math.floor((Math.random()*4)+1);
    var randomChosenColor = buttonColor[randomNumber-1];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
};


//  For mouse key press interaction
$("button").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);

    playSound(userChosenColor);
    $("#"+userChosenColor).addClass("pressed");

    setTimeout(function(){
        $("#"+userChosenColor).removeClass("pressed");
    },100);
    checkanswer(userClickPattern.length-1);

});

// Make sound
function playSound(name){
    var sound = new Audio("./sounds/"+name+".mp3");
    sound.play();
};

//  Logic for checking the color pattern
function checkanswer(currentlevel){
    if (gamePattern[currentlevel] === userClickPattern[currentlevel]){
        // console.log("right");

        if (userClickPattern.length === gamePattern.length){
            setTimeout (function(){
                nextSequence();
            },1000);
        };
    }else{
        // Console.log("wrong");
        playSound("wrong");

        $("body").addClass("gameOver");

        setTimeout(function(){
            $("body").removeClass("gameOver");
        },800);

        $("h1").text("Game Over, press Any Key to Restart");
        startOver()
    }
}

//  to restart the game
function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
};


