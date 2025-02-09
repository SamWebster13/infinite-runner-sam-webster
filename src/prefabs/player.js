class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        scene.physics.add.existing(this);

        this.body.setSize(this.width / 2, this.height / 2);
        this.body.setCollideWorldBounds(true);
        this.setFlipX(true);
        // Create animations (only once)
        this.createAnimations(scene);

        // Set default animation to "running"
        this.play('running');
        
        this.isJumping = false; // Track jumping state

        
    }
    
    createAnimations(scene) {
        // Running Animation
        scene.anims.create({
            key: 'running',
            frames: scene.anims.generateFrameNumbers('run', { start: 0, end: 8 }),
            frameRate: 14,
            repeat: 0
        });

        // Jumping Animation
        scene.anims.create({
            key: 'jumping',
            frames: scene.anims.generateFrameNumbers('jump', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });

        // Dying Animation
        scene.anims.create({
            key: 'dying',
            frames: scene.anims.generateFrameNumbers('death', { start: 0, end:  9}),
            frameRate: 10,
            repeat: 0
        });
    }

    update(cursors) {
        if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.isJumping) {
            this.isJumping = true;
            this.body.setVelocityY(-300); // Adjust for jump strength
            this.play('jumping');
            this.on('animationcomplete-jumping', (anim, frame) => {
                if (this.isJumping) {
                    // Get the last frame from the animation
                    const lastFrame = anim.frames[anim.frames.length - 1];
                    // Set the sprite's frame to the last frame
                    this.setFrame(lastFrame.textureFrame);
                    // Pause the animation so it doesn't loop or clear the frame
                    this.anims.pause();
                }
            }, this);
        }
    
        // Check if player has landed on a roof
        if (this.body.blocked.down) {
            if (this.isJumping) {
                this.isJumping = false;
                this.anims.resume(); // In case it was paused on the jump's last frame
                this.play('running', true);
            }
        }
    
        // If player falls below the screen
        if (this.y > game.config.height) {
            this.die();
        }
    }
    
    die() {
        this.play('dying');
        this.body.setVelocityX(0); // Stop movement
        // Add game over logic here if necessary (e.g. restart or show game over screen)
    }
}
