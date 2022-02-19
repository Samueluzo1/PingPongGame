const INITIAL_VELOCITY = 0.025   // I can mess around with this number to try and tweak to find the exact value I want //
const VELOCITY_INCREASE = .00001; // Notice the speed of the ball//

export default class Ball {
  constructor(ballElm) {
    // Parsing in the element that corresponds to our ball
    this.ballElm = ballElm; // means the ball element is being passed in the ball class so I can use it an interact with it
    this.reset();
}


  get x() {
    // creating some helper functions
    return parseFloat(getComputedStyle(this.ballElm).getPropertyValue("--x")); // this is just going to return to us a value which is x remember x = 50 in the css code under .ball
  } // to get that css property we need to get computed style and we pass it in our ball element
  // we already pass the x from the css code line 38
  // So basically converted my CSS ball 50 into a JavaScript number I can use

  set x(value) {
    // also going to create a setter for c and the setter here //
    this.ballElm.style.setProperty("--x", value);
  }


  // Y function below //

  get y() {
    // creating some helper functions
    return parseFloat(getComputedStyle(this.ballElm).getPropertyValue("--y")); // this is just going to return to us a value which is x remember x = 50 in the css code under .ball
  } // to get that css property we need to get computed style and we pass it in our ball element
  // we already pass the x from the css code line 38
  // So basically converted my CSS ball 50 into a JavaScript number I can use

  set y(value) {
    // also going to create a setter for c and the setter here //
    this.ballElm.style.setProperty("--y", value);
  }

 rect() { // this function is created so it bounces off the top and bottom of the screen //
return this.ballElm.getBoundingClientRect();
 }

 reset() {
this.x = 50;
this.y = 50;
this.direction = { x: 0 }   ;                // find out what are direction is //
while(Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {                                 // creating my value of x and y in a while loop //
const heading = randomNumberBetween(0, 2* Math.PI)   // two high is the equiviant of 360 degrees // // we have created a random value between 0-2PI to determine my direction //
this.direction = { x: Math.cos(heading), y: Math.sin(heading) }  //Then I have taken that direction and coverted it to an x and y position //
} 
//console.log(this.direction);
 this.velocity = INITIAL_VELOCITY;                           // Specifing my velocity //
}


  update(delta, paddleRects) {
this.x += this.direction.x * this.velocity * delta;     // make sure we multiply my delta onto the end of this. This is because if we have log delays in animations of my frames  thats going to be a large delta //
this.y += this.direction.y *  this.velocity * delta;
const rect = this.rect();       // linked to rect function // 
this.velocity += VELOCITY_INCREASE * delta;  // check code line 2//   // To speed up the ball //



if (rect.bottom >= window.innerHeight || rect.top <= 0) {   //if the bottom of my rectangle is greater or equal to the window this code means we have gone past the bottom  of the screen or if the rectangle at the top is less than or equal to 0 this means we've gone off the top of the screen //
    this.direction.y *= -1;  // All I am doing here is flipping the y direction //   

}

// check if any of my paddle rects had a collison 
if (paddleRects.some(r => isCollision(r, rect))) {  // this function just loops through all of the different paddle rectangles. If any of them return true for this click collison function it's going to return true for the entine thing // 
    this.direction.x *= -1;  
}
}
}

function randomNumberBetween(min, max) {                         // because in console.log Uncaught ReferenceError messaged appeared //
    return Math.random() * (max-min) + min;  // So what this does is a random number between 0-1 I then use max - min to make sure its going to scale to be between the range then add the minimum on  just so its always making sure the min in the lowest number I can get //
}
// Check dev tools console log to see the x and why directions you get after the above cod //

function isCollision(rect1, rect2){ // so if we have a collision with any of the paddles swap our x direction //
    return rect1.left <= rect2.right && 
    rect1.right >= rect2.left && 
    rect1.top <= rect2.bottom && 
    rect1.bottom >= rect2.top;                 //checking that the left side of it is less than or equal to the right side of our rack 2
}   // essentially just want to check all the sides of our rect1.

