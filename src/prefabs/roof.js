class Roof extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this, true);
        // Disable gravity for this roof so it won't fall.
        this.body.allowGravity = false;
        this.moveSpeed = game.settings.roofSpeed;
        this.setOrigin(0, 1);
    }

    update() {
        this.x -= this.moveSpeed;
        // (Recycling logic handled in Play.js update)
    }
}
