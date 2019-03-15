class startScreen extends Phaser.Scene {
    constructor() {
        super({key:"startScreen"});
    }

    preload() { //where assets are loaded
    }

    create(){
        this.key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.text1 = this.add.text(300,300,"Press on the spacebar to start the game", { font:"36px Impact"});
    }

    update(delta) {
        if(this.key_2.isDown){
            this.scene.start("main");
        } else if(this.key_3.isDown){
            this.scene.start("loadScreen");
        }
    }
}