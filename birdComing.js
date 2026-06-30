/*******************************************************/
// P5.play: t01_create_sprite
// Create a sprite
/// Written by Kevin
/*******************************************************/
	
/*******************************************************/
// setup()
/*******************************************************/
function preload() {

  imgPlayer = loadImage('assets1/images/cannon_1.png');

  imgBird = loadImage('assets1/images/bird.png');

  imgOverBg = loadImage('assets1/images/skyline.jpg');

  imgGameBg = loadImage('assets1/images/skyline.jpg');

  imgBirdBoss = loadImage('assets1/images/boss.png');

  imgStartButton = loadImage('assets1/images/start-button.png');

  imgStartBird = loadImage('assets1/images/dopestImage.png');

  imgRestartButton = loadImage('assets1/images/restart.png');
}


function setup() {
	console.log("setup: ");
	cnv = new Canvas(windowWidth, windowHeight);

  player = new Sprite(100, height-100, 200, 50, 'k');
  imgPlayer.resize(200, 30);
  player.image = (imgPlayer);
  player.opacity = 0;

  base = new Sprite(5, height/2, 10, height, 'k')
  base.opacity = 0;

  playerProjectile = new Sprite(55555, 55555, 20, 'd');

  birdWave = new Group();

  birdBosses = new Group();

  projectilesGroup = new Group();

  bird = new Sprite(55555, 55555, 20, 20, 'k')

  restartButton = new Sprite(55555, 55555, 100, 's');

  playerTilt = 0;

  power = 0;

  birdIntensity = 1;

  bossFight = 'false';

  birdBossNum = 1;
  
  score = 0;

  lastBirdSpawn = 0;

  birdSpawnDelay = 1000; // milliseconds between birds

  birdsSpawned = 0;

  waveSpawning = 'false';

  gameState = 'start';

  startBird = new Sprite(width/2, height/2, 408, 612, 's');
  imgStartBird.resize(width, height);
  startBird.image = (imgStartBird);

  startButton = new Sprite(width/2, height/2 + 250, 500, 100, 's');
  startButton.color = ('white');
  startButton.image = (imgStartButton);
  imgStartButton.resize(500, 100);

  //howToPlayButton = new Sprite(width/2, height/2 + 350, 500, 100, 's');
  //howToPlayButton.color = ('blue');

  textSize(50)
  fill('black');
  stroke('white');
  text('how to play', width/2, height/2 + 250)
}

	
/*******************************************************/
// draw()
/*******************************************************/
let  currentUserID = null;
console.log("Running the game");
firebase.auth().onAuthStateChanged(authStateChanged);

function authStateChanged(user) {
  if (user == null) {
    currentUserID = null;
    console.log("No user logged in. Scores will not be saved.");
  } else {
    currentUser = user.uid;
    console.log("Logged in user ID: " + currentUser);
  }
}

function start() {
  background(imgGameBg);
  if (mouse.presses() && startButton.mouse.hovering()) {
    gameState = 'game';
    startButton.remove();
    startBird.remove();
    player.opacity = 100;
    player.opacity = 100;
    base.opacity = 100;

  }
}

function game() {


  background(imgGameBg);

// cheats //
  if (kb.pressed('p')){
    bossFight = 'true';
    birdIntensity = 11;
  }

  if (kb.pressing('o')){
    bird = new Sprite(width, random(100, height-100), 50, 50, 'd');
    bird.vel.x = -2;
    bird.img = imgBird;
    imgBird.resize(70,70);
    birdWave.add(bird)
  }

  if (kb.pressed('[')){
    birdIntensity = 101;
  }
//

  textSize(30)
  fill('white');
  stroke('gray');
  text('Power:' + power, 200, height-50,);
  fill('orange');
  stroke('red');
  text('WAVE: ' + (birdIntensity - 1), 100, 100);
  textSize(60)
  fill('white');
  stroke('black');
  text('Score:' + score, 300, 100,);

  player.rotation = playerTilt;

  for (let p of projectilesGroup) {
    p.vel.y += 0.5;
  }

// boss fight initiate //
  if ((birdIntensity-1) === 10) {

    bossFight = 'true';
    if (birdBossNum > 0){
      birdBoss = new Sprite(width, height/2, 100, 100, 'k');
      birdBoss.vel.x = -1;
	    birdBoss.img = (imgBirdBoss);
      imgBirdBoss.resize(200, 200);
      birdBossHP = 1000;
      birdBossNum = 0;
      birdBosses.add(birdBoss);
    }
  }

  if (kb.pressing('w')) {

    if (playerTilt>-90){
      playerTilt -= 1;
    }

	}

  if (kb.pressing('s')) {

    if (playerTilt<0){
      playerTilt += 1;
    }

	}
  if (mouse.pressing()) {
    if (power < 100) {
      power += 2;
    }

  }

  if (mouse.released()) {

    playerProjectileDamage = power;

      let radians = playerTilt * (Math.PI / 180);
      let barrelLength = 100;

      let spawnX = player.x + barrelLength * Math.cos(radians);
      let spawnY = player.y + barrelLength * Math.sin(radians);

      playerProjectile = new Sprite(spawnX, spawnY, 20, 'd');

      projectilesGroup.add(playerProjectile);

      playerProjectile.vel.x = power * Math.cos(radians);
      playerProjectile.vel.y = power * Math.sin(radians);
      playerProjectile.colour = ('black');

// bird hit detection //
      birdWave.collides(playerProjectile, birdHit);
	    function birdHit(_ssss,_playerProjectile) {
	      _ssss.remove();
        _playerProjectile.remove();
        score += 50;
      }

      birdBosses.collides(playerProjectile, birdBossHit);
	    function birdBossHit(_ssss,_playerProjectile) {
	      birdBossHP -= playerProjectileDamage;
        _playerProjectile.remove();
        score += 5;
        birdBoss.y = random(100, height-500);

        bird = new Sprite(birdBoss.x, birdBoss.y, 50, 50, 'k');
        bird.vel.x = -3;
        bird.img = imgBird;
        imgBird.resize(70,70);

        birdWave.add(bird);

      }
      power = 0;

  }

  // bird hit detection //
  if (bossFight === 'false' && birdWave.length === 0 && waveSpawning === 'false'){
    birdIntensity += 1;
    birdSpawned = 0;
    waveSpawning = 'true';
}

if (bossFight === 'false' && birdsSpawned < birdIntensity && waveSpawning === 'true') {

  if (millis() - lastBirdSpawn > birdSpawnDelay) {

    bird = new Sprite(width, random(100,height-100), 50, 50, 'd');
    bird.vel.x = -2;
    bird.img = imgBird;
    imgBird.resize(70,70);

    birdWave.add(bird);

    birdsSpawned++;
    lastBirdSpawn = millis();
  }
}

if (birdWave.length === 0 && birdsSpawned === birdIntensity) {
  birdsSpawned = 0;
  waveSpawning = 'false';
}

  if (bossFight == 'true'){
    fill('orange');
    stroke('red');
    textSize(50);
    text('Boss Bird Incoming! Health: ' + birdBossHP, width/2, height/2);

    if (birdBossHP < 1) {
      birdBoss.remove();
      bossFight = 'false';
      birdIntensity += 1;
    }
  }
}

function end() {
  text('GAME OVER, Your score was ' + score, width/2, height/2);


  if (mouse.presses() && restartButton.mouse.hovering()) {
    gameState = 'game';
    restartButtonButton.remove();
    base.opacity = 100;

    score = 0;
    birdIntensity = 2;

  }

    };

function hitBase() {
  //firebase write//
  // firebase write
if (currentUser) {
  const scoreRef = firebase.database()
    .ref("/birdComingHighscore/" + currentUser.uid);

  scoreRef.once("value").then((snapshot) => {
    const data = snapshot.val();

    if (!data || score > data.score) {
      scoreRef.set({
        score: score,
        name: currentUser.displayName || "Anonymous"
      });

      console.log(
        "Game ended, you got a new high score of " +
        score +
        " points!"
      );
    } else {
      console.log(
        "Game ended, you did not beat your high score of " +
        data.score +
        " points"
      );
    }
  });
}

  ///
  birdWave.removeAll();
    birdBosses.removeAll();
    console.log('gameover')
    gameState = 'end';

     restartButton = new Sprite(600, height/2, 100, 's');
     imgRestartButton.resize(100,100);
  restartButton.image = imgRestartButton;
  }

function draw() {

  birdWave.overlaps(base, hitBase);
  birdBosses.overlaps(base, hitBase);

  if (gameState === 'start'){
    start();
  }
  if (gameState === 'game'){
    game();
  }
  if (gameState === 'end'){
    end();
  }
}
	
/*******************************************************/
//  END OF APP
/*******************************************************/