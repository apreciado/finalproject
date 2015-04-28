function Starfield() {
	this.fps = 30;
	this.canvas = null;
	this.width = 0;
	this.height = 0;
	this.minVelocity = 15;
	this.maxVelocity = 30;
	this.stars = 100;
	this.intervalId = 0;
}


Starfield.prototype.initialise = function(div) {
	var self = this;

	
	this.containerDiv = div;
	self.width = window.innerWidth;
	self.height = window.innerHeight;

	window.addEventListener('resize', function resize(event) {
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.height;
		self.draw();
	});

	
	var canvas = document.createElement('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
var ctx = canvas.getContext("2d");

var spaceshipImage = new Image ();

spaceshipImage.src = "pictures/spaceship.png";

};

Starfield.prototype.start = function() {

	//	STARS
	var stars = [];
	for(var i=0; i<this.stars; i++) {
		stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,
		 (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	}
	this.stars = stars;

	var self = this;
	//	TIME
	this.intervalId = setInterval(function() {
		self.update();
		self.draw();	
	}, 1000 / this.fps);
};

Starfield.prototype.stop = function() {
	clearInterval(this.intervalId);
};

Starfield.prototype.update = function() {
	var dt = 1 / this.fps;
	 
	for(var i=0; i<this.stars.length; i++) {
		var star = this.stars[i];
		star.y += dt * star.velocity;
		//	If the star has moved from the bottom of the screen, spawn it at the top.
		if(star.y > this.height) {
			this.stars[i] = new Star(Math.random()*this.width, 0, Math.random()*3+1, 
		 	(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
		}
	}





};

Starfield.prototype.draw = function() {

	//	Get the drawing context.
	var ctx = this.canvas.getContext("2d");
	ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	//	Draw the background.
 	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, this.width, this.height);

	//	Draw stars.
	ctx.fillStyle = '#ffffff';
	for(var i=0; i<this.stars.length;i++) {
		var star = this.stars[i];
		ctx.fillRect(star.x, star.y, star.size, star.size);
	}

	//Draw ship
	ctx.fillStyle = '#33801A';
        //ctx.drawImage(this.spaceshipImage, shipx, shipy);

	ctx.fillRect(shipx, shipy, 150, 100);
	ctx.fillRect(shipx + 75, shipy + 50, 50, 50);



};

function Star(x, y, size, velocity) {
	this.x = x;
	this.y = y; 
	this.size = size;
	this.velocity = velocity;
}

//end of the canvas js start of Anna's code
//var canvas = document.getElementById("canvas");
//var ctx = canvas.getContext("2d");

//var spaceshipImage = new Image ();

//spaceshipImage.src = "pictures/spaceship.png";

//spaceshipImage.addEventListener("load", drawImage);

//function drawImage(){
//	ctx.drawImage(spaceshipImage, 320, 240)

//}

var imagesdt = 1000/30.0;
var shipx = 150;
var shipy = 220;
var horizdirection = 1;
var horizspeed = 0.3;
var vertspeed = 0.3;
var vertdirection = 1;




//var refresh = setInterval(update, 1000/30.0);



/*function update(){

//draws spaceship and makes it move

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, shipx, shipy);
    //ctx.drawImage(spaceshipImage, map.width - spaceshipImage.width, y);
	//x += speed * direction *dt;
	//if (x > map.width - spaceshipImage.width || x < 0)
		//direction = -direction;

}*/

document.addEventListener('keydown', function(event){
			handleKeyPress(event);
			});

function handleKeyPress(event){
		

//key code for spaceship to move

		if(event.keyCode == 37){
			//ctx.drawImage(baseImage, x, map.height - baseImage.height);
    			shipx += horizspeed * horizdirection * imagesdt;
  			horizdirection = -1;
			//if (shipx > Starfield.prototype.canvas.width - Starfield.prototype.spaceshipImage.width || shipx < 0)
				//horizdirection = -horizdirection;
			console.log("left arrow was pressed");
		}

		if(event.keyCode == 39){
			//ctx.drawImage(baseImage, x, map.height - baseImage.height);
   			 shipx += horizspeed * horizdirection * imagesdt;
			horizdirection = 1;
			//if (shipx > canvas.width - spaceshipImage.width || shipx < 0)
				//horizdirection = -horizdirection;
			console.log("right arrow was pressed");
		}
	//keycode for up is 38

		if(event.keyCode == 38){
		
		shipy -= vertspeed * vertdirection * imagesdt;
		vertdirection = 1;
		//if( shipy > canvas.height - spaceshipImage.height || shipy < 0)
			//vertdirection = -vertdirection;
		
		console.log("up arrow was pressed");
		}

	//keycode for down is 40

		if(event.keyCode == 40){

		shipy -= vertspeed * vertdirection * imagesdt;
		vertdirection = -1;
		//if (shipy > canvas.height - spaceshipImage.height || shipy < 0)
			//vertdirection = -vertdirection;

		console.log("down arrow was pressed");

		}
}

console.log("All done");




