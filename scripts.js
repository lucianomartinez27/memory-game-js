const cards = document.querySelectorAll('.memory-card');
const button = document.querySelector('.button')
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var intentos = 5;
document.getElementById('intentos').innerHTML = "INTENTOS:" + intentos;
var aciertos = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;
  checkForMatch();

}

function Reiniciar(){
  window.location.reload(false); 
}

function checkForMatch() {
  let isMatch = firstCard.dataset.hotodog === secondCard.dataset.hotodog;

  isMatch ? disableCards() : unflipCards();
}

function checkIntentos(){
  let totalIntentos = intentos ===  0;

  if (totalIntentos) {
      document.getElementById('intentos').innerHTML = ' LO SIENTO, PERDISTE!!! : (';
      cards.forEach(card => card.removeEventListener('click', flipCard)); 
  }
}

function checkAciertos(){
  let totalAciertos = aciertos === 6;

  if (totalAciertos) {
    document.getElementById('intentos').innerHTML = 'FELICITACIONES GANASTE!!! :)';
    confetti()
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  aciertos += 1;
  checkAciertos()
  checkIntentos();
  resetBoard();
  
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    intentos -= 1
    document.getElementById('intentos').innerHTML = "INTENTOS:" + intentos;
    resetBoard();
    checkIntentos();
  }, 1500);

}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function confetti() {
	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	//snowflake particles
	var mp = 80; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*10+1, //radius
			d: Math.random()*mp, //density
            color: "rgba(" + Math.floor((Math.random() * 255)) +", " + Math.floor((Math.random() * 255)) +", " + Math.floor((Math.random() * 255)) + ", 1)"
		})
	}
	
	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);
		
		
		
		for(var i = 0; i < mp; i++)
		{ 
			var p = particles[i];
            ctx.beginPath();
            ctx.fillStyle = p.color;
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*3, true);
            ctx.fill();
		}
		
		update();
	}
	
	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
                    particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d, color : p.color};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
                        particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d, color: p.color};
					}
					else
					{
						//Enter from the right
                        particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d, color : p.color};
					}
				}
			}
		}
	}
	
	//animation loop
	setInterval(draw, 10);
  
}
function shake(){
	setInterval(draw, 100);

}


cards.forEach(card => card.addEventListener('click', flipCard));
button.addEventListener('click', Reiniciar);