class roof extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.add.existing(this)
        this.moveSpeed = game.settings.roofSpeed
        this.setOrigin(0, 1)

    }

    update(){
        this.x -= this.moveSpeed; // Move the roof to the left
        if (this.x <= -this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}