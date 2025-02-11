class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this);
        this.ifPlayerAlive = true
        scene.physics.add.existing(this);

        this.body.setSize(this.width / 2, this.height / 2);
        this.body.setCollideWorldBounds(true);
        this.body.setSize(this.width * 0.8, this.height * 1.8);
        this.body.setOffset(this.width * 0.2, this.height * 0.2);

        // Create animations (only once)
        this.createAnimations(scene);

        // Set default animation to "running"
        this.setFlipX(true);

        this.isJumping = false; // Track jumping state
 
        
    }
    

    createAnimations(scene) {
        // Running Animation
        scene.anims.create({
            key: 'running',
            frames: scene.anims.generateFrameNumbers('run', { start: 0, end: 11 }),
            frameRate: 16,
            repeat: -1 // Loop indefinitely
        });

        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('run', { start: 0, end: 0 }),
            frameRate: 16,
            repeat: -1 // Loop indefinitely
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
            frames: scene.anims.generateFrameNumbers('death', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: 0
        });
    }

    update(cursors) {
        

        if(this.ifPlayerAlive){
            if (cursors.left.isDown) {
                this.body.setVelocityX(-100); // Move left
                this.play('running', true);
                this.setFlipX(false);               
                
            } else if (cursors.right.isDown) {
                this.body.setVelocityX(100); // Move right
                this.play('running', true);
                this.setFlipX(true);

            } else if (!cursors.right.isDown && !cursors.left.isDown && !Phaser.Input.Keyboard.JustDown(cursors.up)){
                this.body.setVelocityX(0); // Stop moving horizontally when no keys are pressed
                this.play('idle');
            }
            
            // Handle jumping
            if (Phaser.Input.Keyboard.JustDown(cursors.up) && this.body.blocked.down) {
                this.isJumping = true;
                this.body.setVelocityY(-200); // Adjust for jump strength
            }

            // If the player is still in the air, hold the last jump frame
            if (!this.body.blocked.down) {
                this.isJumping = true;
                if (this.anims.currentAnim && this.anims.currentAnim.key === 'jumping' && this.anims.currentFrame.index === 2) {
                    this.anims.pause();
                }
            } else {
                // When the player lands, resume running animation
                if (this.isJumping) {
                    this.isJumping = false;
                }
            }
        }
    }
}
