var config = {
    type:Phaser.AUTO,
    width : 1200,
    height : 800,
    parent: 'play',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 100 }
        }
    },
    scene: [ startScreen, main ]
};

var game = new Phaser.Game(config);