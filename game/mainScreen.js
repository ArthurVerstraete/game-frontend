
class main extends Phaser.Scene {
    constructor() {
        super({key:"main"});
    }

    preload() {
        //Tanks
        this.load.image('tankblack','assets/tanks/tankblack.png');
        this.load.image('tankblue','assets/tanks/tankblue.png');
        this.load.image('tankcyan','assets/tanks/tankcyan.png');
        this.load.image('tankgreen','assets/tanks/tankgreen.png');
        this.load.image('tankgrey','assets/tanks/tankgrey.png');
        this.load.image('tankpurple','assets/tanks/tankpurple.png');
        this.load.image('tankred','assets/tanks/tankred.png');
        this.load.image('tankyellow','assets/tanks/tankyellow.png');
        //worldgen
        this.load.image('tile','assets/Tiles/tileAutumn_tile.png');
        this.load.image('selectedTile','assets/Tiles/tileDirt_tile.png');
        this.load.image('background','assets/background.jpg');
        //Animations
        this.load.spritesheet('explosion', 'assets/animations/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 9 });

        this.load.spritesheet('eastbullet', 'assets/animations/eastbullet.png', { frameWidth: 32, frameHeight: 32, endFrame: 4 });
        this.load.spritesheet('westbullet', 'assets/animations/westbullet.png', { frameWidth: 32, frameHeight: 32, endFrame: 4 });
        this.load.spritesheet('northeastbullet', 'assets/animations/northeastbullet.png', { frameWidth: 32, frameHeight: 32, endFrame: 4 });
        this.load.spritesheet('northwestbullet', 'assets/animations/northwestbullet.png', { frameWidth: 32, frameHeight: 32, endFrame: 4 });
        this.load.spritesheet('southeastbullet', 'assets/animations/southeastbullet.png', { frameWidth: 32, frameHeight: 32, endFrame: 4 });
        this.load.spritesheet('southwestbullet', 'assets/animations/southwestbullet.png', { frameWidth: 32, frameHeight: 32, endFrame: 4 });
    }

    init () {
        var canvas = this.sys.game.canvas;
        var fullscreen = this.sys.game.device.fullscreen;

        if (!fullscreen.available)
        {
            return;
        }

        canvas[fullscreen.request]();
    }

    create() {
        this.setupKeyBinds();
        this.background = this.add.image(1200/2, 800/2, 'background');
        this.setupFullScreen(this.background);

        this.map = new HexMap('tile', 'selectedTile', this, 22, 26, 60, 40,35);
        this.tankblack = new Tank('tankblack', this, this.map, 4, 4, 45);
        this.tankblue = new Tank('tankblue', this, this.map, 20, 1, 45);
        this.tankcyan = new Tank('tankcyan', this, this.map, 20, 20, 45);
        this.tankgreen = new Tank('tankgreen', this, this.map, 1, 10, 45);
        this.tankgrey = new Tank('tankgrey', this, this.map, 1, 20, 45);
        this.tankpurple = new Tank('tankpurple', this, this.map, 10, 20, 45);
        this.tankbred = new Tank('tankred', this, this.map, 10, 1, 45);
        this.tankyellow = new Tank('tankyellow', this, this.map, 20, 10, 45);

        //scoreboard
        this.nameText = this.add.text(10, 10, 'Name: Chickmagnet73', { font: '32px Arial', fill: '#000000' });
        this.scoreText = this.add.text(10, 48, 'Score: 0', { font: '32px Arial', fill: '#000000' });
        this.hitpointsText = this.add.text(10, 86, 'Hitpoints: 100', { font: '32px Arial', fill: '#000000' });

        var explosion = {
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { frames: [ 0, 1, 2, 3, 4 ] }),
            frameRate: 5,
            repeat: -1
        };

        var bullet = {
            key: 'shot',
            frames: this.anims.generateFrameNumbers('shot', { frames: [ 0, 1, 2, 3, 4 ] }),
            frameRate: 5,
            repeat: -1
        };

        this.anims.create(explosion);
        this.anims.create(bullet);
        this.add.sprite(300, 300, 'explosion').play('explode');
        this.add.sprite(200, 200, 'southeastbullet').play('shot');

        var explosion = game.add.sprite(200, 200, 'explosion');
        var shoot = game.add.sprite(200, 200, 'shoot');

        this.map.selectTile(1,1);


    }

/*     update(delta){
        if(this.key_Z.isDown){
            this.tank.forward();
        }
        if(this.key_S.isDown){
            this.tank.backward();
        }
        if(this.key_Q.isDown){
            this.tank.turnLeft();
        }
        if(this.key_D.isDown){
            this.tank.turnRight();
        }
    } */

    setupFullScreen (object){
        var fullscreenFunc = null;  //function for fullscreen
        
        document.querySelector('#play').addEventListener('click', function() {
            if(fullscreenFunc !== null) fullscreenFunc();
        });

        object.setInteractive();

        object.on('pointerover', function() {
            var canvas = this.sys.game.canvas;
            var fullscreen = this.sys.game.device.fullscreen;
            fullscreenFunc = function() {
                canvas[fullscreen.request]();
            };
        }, this);
    }

    setupKeyBinds() {
        this.key_Z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //controls tankblack
        this.input.keyboard.on('keyup_Z', function(event){
            this.tankblack.forward();
        },this);
        this.input.keyboard.on('keyup_S', function(event){
            this.tankblack.backward();
        },this);
        this.input.keyboard.on('keyup_Q', function(event){
            this.tankblack.turnLeft();
        },this);
        this.input.keyboard.on('keyup_D', function(event){
            this.tankblack.turnRight();
        },this);

        //controls tankblue
        this.input.keyboard.on('keyup_O', function(event){
            this.tankblue.forward();
        },this);
        this.input.keyboard.on('keyup_L', function(event){
            this.tankblue.backward();
        },this);
        this.input.keyboard.on('keyup_K', function(event){
            this.tankblue.turnLeft();
        },this);
        this.input.keyboard.on('keyup_M', function(event){
            this.tankblue.turnRight();
        },this);

        //controls tankyellow
        this.input.keyboard.on('keyup_UP', function(event){
            this.tankyellow.forward();
        },this);
        this.input.keyboard.on('keyup_DOWN', function(event){
            this.tankyellow.backward();
        },this);
        this.input.keyboard.on('keyup_LEFT', function(event){
            this.tankyellow.turnLeft();
        },this);
        this.input.keyboard.on('keyup_RIGHT', function(event){
            this.tankyellow.turnRight();
        },this);
    }
}