//Timer
var text;
var finalCountDown;
var timedEvent;
var timeRemaining;
var rect;
var graphics;

class Main extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }

  preload() {
    //tanks
    this.load.image("tankblack", "assets/tanks/tankblack.png");
    this.load.image("tankblue", "assets/tanks/tankblue.png");
    this.load.image("tankcyan", "assets/tanks/tankcyan.png");
    this.load.image("tankgreen", "assets/tanks/tankgreen.png");
    this.load.image("tankgrey", "assets/tanks/tankgrey.png");
    this.load.image("tankpurple", "assets/tanks/tankpurple.png");
    this.load.image("tankred", "assets/tanks/tankred.png");
    this.load.image("tankyellow", "assets/tanks/tankyellow.png");
    this.load.image("background", "assets/tanks/background.jpg");
    this.load.image("destroyedTank", "assets/tanks/destroyedTank.png");
    this.map = new HexMap(this, 60, 40, 100, "MapConfiguration.json");

    //Animations
    this.load.spritesheet("explosion", "assets/animations/explosion.png", {
      frameWidth: 64,
      frameHeight: 64,
      endFrame: 9
    });
  }

  init() {
    var canvas = this.sys.game.canvas;
    // var fullscreen = this.sys.game.device.fullscreen;

    // if (!fullscreen.available)
    // {
    //     return;
    // }

    // canvas[fullscreen.request]();
  }
  createTankSprite(data) {
    let dataInput = data;
    let username = dataInput.players.name;
    let color = dataInput.players.tank.color;
    let x = dataInput.players.tank.position.x;
    let y = dataInput.players.tank.position.y;
    let addons = dataInput.players.tank.addons;
    let rotation = dataInput.players.tank.rotation;
    username = new Tank(username, color, x, y, addons, rotation);
  }

  create() {
    this.background = this.add.image(1200 / 2, 800 / 2, "background");
    let scene = this;
    this.map.loaded.then(() => {
      scene.map.generateMap();

      scene.mqtt = new Mqtt(scene);
      //scoreboard

      //Timer
      console.log(this);
      text = this.add
        .text(100, 37, "", { fontSize: 24, font: "Arial", fill: "#FFFFFF" })
        .setOrigin(0.5, 0.5);
      finalCountDown = this.add
        .text(600, 350, "", { fontSize: 72, font: "Arial", fill: "#D10000" })
        .setOrigin(0.5, 0.5);
      timedEvent = this.time.delayedCall(15000, scene.onEvent, [], this);

      text.setStroke("#000000", 8);
      finalCountDown.setStroke("#000000", 8);

      //Progress bar for timer
      rect = new Phaser.Geom.Rectangle(200, 37, 500, 20);
      graphics = this.add.graphics();
      graphics.fillRectShape(rect);
      graphics.fillStyle(0x000000);
      rectOutside = new Phaser.Geom.Rectangle(200, 37, 500, 20);
      graphics = this.add.graphics();
      graphics.fillRectShape(rectOutside);
      graphics.fillStyle(0x000000);
    });

    //explosion
    var explosion = {
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }),
      frameRate: 5,
      repeat: 0
    };
    this.anims.create(explosion);
  }

  update(delta) {
    //Timer update
    timeRemaining =
      15000 -
      timedEvent
        .getElapsed()
        .toString()
        .substr(0, 5);
    text.setText("Time left: ");
    if (timeRemaining <= 5000) {
      finalCountDown.setText(15 - timedEvent.getElapsedSeconds().toString().substr(0, 2));
      if (timeRemaining == 0) {
        finalCountDown.setText(" ");
      }
    }

    //Progress bar for timer
    graphics.clear();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(175, 29, (window.innerWidth / 18) * 15, 18);
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(175, 29, (window.innerWidth / 18000) * timeRemaining, 18);
  }
  //Empty onEvent for Length
  onEvent() {
    console.log("Timer has ended");
  }
}
