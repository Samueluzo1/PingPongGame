// game will be running in an Update Loop //
// This means every single frame that passes I will call a function //
// The function I call will update the positions and the logic of all the pieces of the game //
// The computer AI will move the paddle. The ball will move in the current direction it is going //
// And I can move my paddle with my mouse also - this will update all the positons // 
import  Ball from "./Ball.js"
import  Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"))  // My ball is equal to a new ball and I just want to pass in the ball element //
// So above I have selected the ball HTML element (from the document...) and creating a new class for the ball and now I have access to it 

const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle")); 
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");


let lastTime   // check line 19
function update (time) {  // update loop will take in a time var for how much time has passed since the start of our program //
     if(lastTime != null) {         // if lastTime is not equal to null 
        const delta = time -  lastTime // to tke the time that gets passed in and vovert it to something called a delta - linked to line 13//
// Update code - only doing my update code if I have a last time. If I don't have a last time that means we dont have
//anything to compare to to get the delta //
    //console.log(delta)
     ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])      // both the rectangles passed into my ball //
    computerPaddle.update(delta, ball.y);  // The paddle needs to know where are ball is so it can move to that position //
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));

     document.documentElement.style.setProperty("--hue", hue + delta * .01); // All I am doing here is slowly changing the cube by the small amount every single time that the frame changes //                                                // taking the hue value and setting it 


    if(isLose()) handleLose()                   //We need determine if we have lost the game - in order to reset if the ball has gone off the side of the screen //
    
    }


    lastTime = time    // last time equal to our current time // // So everytime we call update I am taking my last time and subtracting our time from that last time to get our delta //
    //console.log(time) // go to console log to see code being run//
    window.requestAnimationFrame(update)
}

function isLose() {
const rect = ball.rect()
return (rect.right >= window.innerWidth || rect.left <= 0) // This is basically asking is the ball out of bounds on the right or left hand side - if so we have lost 
}

function handleLose() {
    const rect = ball.rect()                              // Increment the score //
    if(rect.right >= window.innerWidth) { //Means the player has scored// 
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;  // By default the text is set to 0  // set this equal to one more the text thats currently in it //
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    }

    ball.reset();  // resets my ball to the center of the screen //
    computerPaddle.reset();  //Also sets paddle back to the center //
}


document.addEventListener("mousemove", e => {
playerPaddle.position = (e.y / window.innerHeight) * 100; 
})


// to call this I will then do the following below //
window.requestAnimationFrame(update)  // As long a we keep requestion this it will loop.

        // So in the above from line I have created an infinite loop which is called update every single time that 
            //something on our screen is allowed to change - So every frame it's going to call the above function for us // 


// NOTE: setInterval(update, 10) not that accurate it may not run every lets say 10 milliseconds and also will run in between frames //
// With requestAnimationFrames what happens is every time that I can change what's on the screen the function will be called //
// Bascially JavaScript is clever enough to say you can't change anythig on the screen so don't even waste your time running code lol //


























