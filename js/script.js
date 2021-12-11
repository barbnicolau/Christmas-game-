class Game {
  constructor(){
    this.canvas = document.createElement('canvas');
  }

  start = () => {
   this.canvas.width = 480;
   this.canvas.height = 270;
   this.context = this.canvas.getContext('2d');
   document.getElementById("game-area").appendChild(this.canvas);
  }
}

const game = new Game();

class Component {
  constructor(width, height, color, posX, posY){
    this.width = width;
    this.height = height;
    this.color = color;
    this.posX = posX;
    this.posY = posY;
  }

  update = () => {
    const ctx = game.context;
    
  }
}