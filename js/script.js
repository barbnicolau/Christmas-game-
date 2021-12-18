window.onload = () => {

  //criação elementos
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const scoreElement = document.getElementById("score");
  const lifeElement = document.getElementById("life");
  const presents = [];
  const socksUgly = [];
  const music = new Audio("../song/Christmas Village - Aaron Kenny.mp3");
  music.volume = 0.3;

  let animationId = null;
  let frames = 0;
  let score = 0;
  let life = 1;

  document.getElementById("start").onclick = () => {
    startGame();
  };

  document.getElementById("reset").onclick = () => {
    resetGame();
  };

  //inicio do jogo
  function startGame() {
    init();
    music.play();
    animationId = setInterval (updateCanvas,20)
    //animationId = requestAnimationFrame(updateCanvas);
    //updateCanvas();
  }

  //reiniciar o jogo
  function resetGame() {
    stopGame();
    clearCanvas();
    music.pause();
    music.currentTime = 0;
    placeHolder();
    scoreElement.innerHTML = 0;
    lifeElement.innerHTML = 0;
  }

  //atualizar o canvas
  const updateCanvas = () => {
    console.log(life)
    frames += 1;
    clearCanvas();
    background.draw();
    showScore();
    showLife();
    santa.draw();
    updatePresents();
   

    for (let i = 0; i < presents.length; i += 1) {
      if (santa.checkCollision(presents[i])) {
        presents.splice(i, 1);
        score += 1;
      }
    }
    updateSocks();
    
    for (let i = 0; i < socksUgly.length; i += 1) {
      if (santa.checkCollision(socksUgly[i])) {
        socksUgly.splice(i, 1);
        life -= 1;
      }
    }

    if (life <= 0) {
      console.log("life")
      stopGame();
      setTimeout(() => {
        gameOver();
      }, 1000);
    } else {
      //animationId = requestAnimationFrame(updateCanvas);
    }
  }

  function init() {
    animationId = null;
    frames = 0;
    score = 0;
    life = 1;
  }

  function placeHolder() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "50px Winter Christmas";

    let img = new Image();
    img.src = "../Images/winterbg.png";

    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.fillText("Vamos jogar!", 200, 200);
    };
  }

  function gameOver() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";

    let img = new Image();
    img.src = "../Images/gameover.jpg";

    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.fillText("Fim do Jogo!", 200, 200);
    };
  }

  function stopGame() {
    //cancelAnimationFrame(animationId);
    clearInterval(animationId)
    lifeElement.innerHTML = 0;
  }

  function showLife() {
    lifeElement.innerHTML = life;
  }

  function showScore() {
    scoreElement.innerHTML = score;
  }
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  

  class Background {
    constructor() {
      this.posX = 0;
      this.posY = 0;

      const img = new Image();

      img.onload = () => {
        this.img = img;
      };
      img.src = "../Images/winterbg.png";
    }
    draw() {
      ctx.drawImage(this.img, this.posX, this.posY, canvas.width, 450);
    }
  }
  const background = new Background();

  class Santa {
    constructor(x, y, w, h) {
      console.log("santa");
      this.posX = x;
      this.posY = y;
      this.width = w;
      this.height = h;
      this.speed = 60;

      const img = new Image();
      img.onload = () => {
        this.img = img;
      };
      img.src = "../Images/santa.png";
    }

    draw() {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
      }

    moveLeft() {
      if (this.posX > 20) {
        this.posX -= this.speed;
      }
    }

    moveRight() {
      if (this.posX < 400) {
        this.posX += this.speed;
      }
    }

    top() {
      return this.posY;
    }

    bottom() {
      return this.posY + this.height;
    }

    left() {
      return this.posX;
    }

    right() {
      return this.posX + this.width;
    }

    checkCollision(obstacle) {
      return !(
        this.top() > obstacle.bottom() ||
        this.bottom() < obstacle.top() ||
        this.left() > obstacle.right() ||
        this.right() < obstacle.left()
      );
    }
  }

  const santa = new Santa(220,240, 150, 150);

  class Obstacle {
    constructor(source, x, y, w, h, s){
      this.posX = x;
      this.posY = 0;
      this.width = w;
      this.height = h;
      this.speed = s;

      const img = new Image();
      img.src = source;
      img.onload = () => {
        this.img = img;
      }
    }
    draw() {
      ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }
    move() {
      this.posY += this.speed;
    }

    top() {
      return this.posY;
    }

    bottom() {
      return this.posY + this.height;
    }

    left() {
      return this.posX;
    }

    right() {
      return this.posX + this.width;
    }
  }


  function createPresent() {
    console.log("present")
    const posX = Math.floor(Math.random() * 400) + 20;

    presents.push(
      new Obstacle("../Images/present.png", posX, this.posY, 50, 50, 3)
    );
  }

  function updatePresents() {
    for (let i = 0; i < presents.length; i += 1) {
      presents[i].move();
      presents[i].draw();
    }
    if (frames % 60 === 0) {
      createPresent();
    }
  }

  function createSocks() {
    const posX = Math.floor(Math.random() * 400) + 20;

    socksUgly.push(
      new Obstacle("../Images/uglysocks.png", posX, this.posY, 60, 60, 2)
    );
  }

  function updateSocks() {
    for (let i = 0; i < socksUgly.length; i += 1) {
      socksUgly[i].move();
      socksUgly[i].draw();
    }
    if (frames % 300 === 0) {
      createSocks();
    }
  }

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        santa.moveLeft();
        break;
      case "ArrowRight":
        santa.moveRight();
        break;
      case "ArrowUp":
        santa.moveUp();
        break;
      case "ArrowDown":
        santa.moveDown();
    }
  });
};
