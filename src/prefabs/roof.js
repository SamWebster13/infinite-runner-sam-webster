class Roof extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        scene.physics.add.existing(this);
        this.body.setVelocityX(-150); // Move left at a constant speed
        this.body.immovable = true; // Don't get pushed by the player
        this.body.allowGravity = false; // Disable gravity so it doesn't fall
        this.setScale(0.4); // Resize the roof to 40% of original size
        this.body.setSize(this.width, this.height, true); // Adjust collision box

        this.offscreenBuffer = 100; // Extra buffer before resetting
    }

    update() {
        if (this.x + this.width < -this.offscreenBuffer) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width + Phaser.Math.Between(50, 150); // Respawn slightly ahead
    }
}
