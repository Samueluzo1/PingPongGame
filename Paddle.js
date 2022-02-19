const SPEED = .02;          // To make sure the computer has a maximum speed //
export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem ;
        this.reset();
    }

   get position() {    // Set the positon of my paddlee // 
return parseFloat(
    getComputedStyle(this.paddleElem).getPropertyValue("--position"));       // Ball.js codeline 14 - changed x to position //

}

set position(value) {
this.paddleElem.style.setProperty("--position", value);       // Ball.js codeline 21 //
}

rect() {
    return this.paddleElem.getBoundingClientRect();
}

reset () {               // Create a set up position for my paddle so it always resets to the center of my screen // 
    this.position = 50;
}                


update (delta, ballHeight)  {
         this.position += SPEED * delta * (ballHeight - this.position);   //So I am saying the ball will be incremented by an amount which will be the speed x the delta
}                                                                         // Then to determine if I want to move up or down is to take my ballHeight - current position)                  
}                                                                         // So if the ball is above the current position we move upward and if the ball is below the current position we will move downwards - giving us a negative or positive number //
                                                                        // Also this number is going to be larger when our paddle is further away from the ball so the computer can move faster when it is further away from the ball //