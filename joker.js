var snake;
var scl = 40; // Zaidimo paveiksliuku dydzio ir judejimo greicio kintamasis
var food;
var laughSound;
var batmanImage;
var currentScene = 1;

// Uzkrauname garsus, paveiksliukus, sukuriame canvas ir globalius kintamuosius

function setup() {
	createCanvas(600,600);
	snake = new Snake();
	frameRate(10);
	pickLocation();
	laughSound = loadSound("sound/laugh.mp3");
	laughSound.playMode('restart');
	laughSound.setVolume(0.1);
	batmanImage = loadImage("images/batman.png");
};

function draw() {
	switch(currentScene){
		case 1:
			drawScene1();
			break;
			
		case 2:
			drawScene2();
			break;
			
		default:
			break;		
	}
};

function drawScene1(){
	background(187,187,187);
	textSize(40);
	fill(0);
	text("		Joker\nsnake game", 200, 100);
	fill(85,10,85);
	rect(250,200,150,50);
	fill(0);
	text("Start",280,240);
	if((mouseX>250 && mouseX<400)&&(mouseY>200 && mouseY<250)){
		fill(13,108,13,100);
		rect(250,200,150,50);
	}
}

function drawScene2(){
	background(187);
	snake.death();
	snake.update();
	snake.show();

	if(snake.eat(food)){
		pickLocation();
		laughSound.jump(6,2);
	}
	
	image(batmanImage,food.x, food.y, scl, scl); // nupiesiame nauja arba toliau perpiesiame batman'o png
}

// Funkcija randa nauja vieta batman'o paveiksliukui atsirasti

function pickLocation() {
	var cols = floor(width/scl);
	var rows = floor(height/scl);

	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);		
}

// Apdorojame mygtuku paspaudimus

function keyPressed(){
	if(keyCode === UP_ARROW) {
		snake.dir(0,-1);
	} else if (keyCode === DOWN_ARROW) {
		snake.dir(0,1);
 	} else if (keyCode === RIGHT_ARROW) {
		snake.dir(1,0);
	} else if (keyCode === LEFT_ARROW) {
		snake.dir(-1,0);
	}
}

function mouseClicked(){
	if(currentScene===1){
		if((mouseX>250 && mouseX<400)&&(mouseY>200 && mouseY<250)){
			currentScene=2;
		}
	}
}
