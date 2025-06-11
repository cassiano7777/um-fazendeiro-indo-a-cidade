let fazendeiro;

let obstaculos = [];

let velocidade = 5;

let pontos = 0;

let jogoAtivo = true;

function setup() {

  createCanvas(670, 400);

  fazendeiro = new Fazendeiro();

}

function draw() {

  background(220);

  

  if (jogoAtivo) {

    fazendeiro.move();

    fazendeiro.show();

    

    // Adicionar obstáculos

    if (frameCount % 60 === 0) {

      obstaculos.push(new Obstaculo());

    }

    

    // Mostrar e mover obstáculos

    for (let i = obstaculos.length - 1; i >= 0; i--) {

      obstaculos[i].move();

      obstaculos[i].show();

      

      // Verificar colisão

      if (obstaculos[i].hits(fazendeiro)) {

        console.log("Colidiu!");

        jogoAtivo = false; // Para o jogo em caso de colisão

      }

      

      // Remover obstáculos que saíram da tela

      if (obstaculos[i].offscreen()) {

        obstaculos.splice(i, 1);

        pontos += 1; // Aumenta a pontuação ao desviar de um obstáculo

      }

    }

    // Verifica se desviou de 100 obstáculos

    if (pontos >= 100) {

      jogoAtivo = false; // Para o jogo ao atingir 100 pontos

      fill(0);

      textSize(32);

      textAlign(CENTER, CENTER);

      text("Você chegou à Cidade!", width / 2, height / 2);

    }

    

    // Exibir pontuação

    fill(0);

    textSize(24);

    text("Obstáculos desviados: " + pontos, width - 290, 20)

  
//ganhar
    
  fill(100);
    
  textSize(24);
  
  
  text("Obstáculos desviados: " + pontos, width - 290, 20)
 
  } else {
  
  
    fill(255, 0, 0);

    textSize(32);

    textAlign(CENTER, CENTER);

    text("Fim de Jogo!", width / 2, height / 2 + 40);

  }

}

class Fazendeiro {

  constructor() {

    this.x = width / 2;

    this.y = height - 50;

    this.size = 30;

  }

  move() {

    if (keyIsDown(LEFT_ARROW)) {

      this.x -= velocidade;

    }

    if (keyIsDown(RIGHT_ARROW)) {

      this.x += velocidade;

    }

    

    // Limitar movimento dentro da tela

    this.x = constrain(this.x, this.size / 2, width - this.size / 2);

  }

  show() {

    fill(100, 200, 100);

    rect(this.x, this.y, this.size, this.size);

  }

}

class Obstaculo {

  constructor() {

    this.x = random(width);

    this.y = -20;

    this.size = random(20, 50);

    this.speed = random(2, 5);

  }

  move() {

    this.y += this.speed;

  }

  show() {

    fill(200, 0, 0);

    rect(this.x, this.y, this.size, this.size);

  }

  hits(fazendeiro) {

    return (

      fazendeiro.x < this.x + this.size &&

      fazendeiro.x + fazendeiro.size > this.x &&

      fazendeiro.y < this.y + this.size &&

      fazendeiro.y + fazendeiro.size > this.y

    );

  }

  offscreen() {

    return this.y > height;

  }

}