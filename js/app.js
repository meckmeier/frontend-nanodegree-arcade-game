// Enemies our player must avoid
var Enemy = function(initialX, initialY, speed) {
    // Variables applied to each of our instances go here
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = initialX;
    this.y = initialY;
    this.speed  = speed;
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed *dt;

    if(this.x > ctx.canvas.width) {
      this.x = -60;
      this.speed =  Math.floor(Math.random() * (300 - 70)) + 70;
      if (this === allEnemies[0]) {
        this.y = 80+ ( (Math.floor(Math.random() * (3 - 0))) * 80) ;
      }
    }

    if (player.x > this.x  && player.x < this.x + 50 && player.y > this.y && player.y < this.y + 50) {
          player.collison();
      }
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
  this.sprite = 'images/char-horn-girl.png';
  this.deadsprite = 'images/rock.png';
};
player.prototype.update = function(dt) {
};
player.prototype.collison = function(){
    this.sprite = this.deadsprite;

}
player.prototype.reset = function(){
  this.x = 200;
  this.y = 400;
  this.sprite = 'images/char-horn-girl.png';

}
player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
player.prototype.handleInput = function(keyPressed){
  var stepHorizontalLength = 100;
  var stepVerticalLength = 80;
  if (this.sprite === this.deadsprite) {
      player.reset();
  }
  if(keyPressed === 'up' && this.y > 0) {
    this.y = this.y - stepVerticalLength;
  }
  if(keyPressed === 'down' && this.y < ctx.canvas.height/2 +80) {
    this.y = this.y + stepVerticalLength;
  }
  if(keyPressed === "right" ) {
    this.x = this.x + stepHorizontalLength;
    if(this.x + 100> ctx.canvas.width ) {
      this.x = 0;
    }
  }
  if(keyPressed === "left") {
    this.x = this.x - stepHorizontalLength;
    if(this.x < 0 ) {
      this.x = ctx.canvas.width -100;
    }
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
  allEnemies.push(new Enemy(-60, 225, 54));
  allEnemies.push(new Enemy(-60, 150, 100));
  allEnemies.push(new Enemy(-50, 70, 200));
  allEnemies.push(new Enemy(-50, 150, 200));
  //allEnemies.push(new Enemy(-60, 60 + 85 * i, tempSpeed));

var player =new player;
player.x = 200;
player.y = 400;



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
