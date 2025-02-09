const MAX_ROOFS = 10;  


class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }
    preload(){
        this.load.audio('grid', './assets/grid-hartzmann-main-version-13277-02-49.mp3')
        this.load.path = './assets/'
        this.load.spritesheet('death', 'death sheet.png', {
            frameWidth: 32,
            frameHeight: 64,
        })
        this.load.path = './assets/'
        this.load.spritesheet('run', 'run sheet.png', {
            frameWidth: 32,
            frameHeight: 64,
        })
        this.load.path = './assets/'
        this.load.spritesheet('jump', 'jump sheet.png', {
            frameWidth: 46,
            frameHeight: 64,
        })

    }
    create() {
        // Initialize current score
        this.p1Score = 0;
        
        // Play background music
        this.music = this.sound.add('grid', { loop: true, volume: 0.5 });
        this.music.play();
    
        // Place tile sprites
        this.cityFAR = this.add.tileSprite(0, 0, 1920, 1080, 'cityFAR').setOrigin(0, 0);
        this.cityMID = this.add.tileSprite(0, 0, 1920, 1080, 'cityMID').setOrigin(0, 0);
        this.cityFAR.setScale(0.4);
        this.cityMID.setScale(0.4);
        this.add.rectangle(0, borderUISize + borderPadding + 375, game.config.width, borderUISize * 2, 0xD2038).setOrigin(0, 0);
    
        // Create the player object
        this.player = new Player(this, 100, game.config.height - 150, 'player');
    
        // Enable physics for the player (now that it has been created)
        this.physics.world.enable(this.player);
        
        // Initialize the roofs group
        this.roofs = this.add.group();
        this.createInitialRoof();

        // Spawn roofs
        this.spawnRoof();

        // Enable physics for each roof
        this.roofs.children.iterate((roof) => {
            this.physics.world.enable(roof);
        });

        this.physics.add.collider(this.player, this.roofs);

    
        // Enable keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
    
        // Score display
        let menuConfig = {
            fontFamily: 'Orbitron',
            fontSize: '28px',
            backgroundColor: '',
            color: '#E31E29',
            align: 'center',
            padding: { top: 1, bottom: 1 },
            fixedWidth: 175
        };
    
        // Back button
        let backButton = this.add.text(game.config.width / 2 + 240, game.config.height / 2 - 210, 'BACK', menuConfig)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => {
                this.sound.play('hover');
                backButton.setStyle({ color: '#ef4591' });
            })
            .on('pointerout', () => backButton.setStyle({ backgroundColor: '', color: '#E31E29' }))
            .on('pointerdown', () => {
                this.sound.play('select');
                backButton.setStyle({ color: '#ef4591' });
                this.sound.stopByKey('grid');
                this.scene.start('menuScene');
            });
    
        // Reset button
        let resetButton = this.add.text(game.config.width / 2 + 100, game.config.height / 2 - 210, 'RESET', menuConfig)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => {
                this.sound.play('hover');
                resetButton.setStyle({ color: '#ef4591' });
            })
            .on('pointerout', () => resetButton.setStyle({ backgroundColor: '', color: '#E31E29' }))
            .on('pointerdown', () => {
                this.sound.play('select');
                resetButton.setStyle({ color: '#ef4591' });
                this.sound.stopByKey('grid');
                this.scene.start('playScene');
            });
    
        // Spawn roofs
        this.roofs = this.add.group(); // Group to manage roofs
        this.spawnRoof(); // Initial roof

        // Set up a timer to spawn roofs every 3 seconds
        this.time.addEvent({
            delay: 500, // Delay of 3 seconds
            callback: this.spawnRoof, // Function to call on each timer tick
            callbackScope: this, // Keep the correct context (this refers to the scene)
            loop: true // Repeat the event indefinitely
        });
        
    
        // Score configuration (if you need to show score)
        let scoreConfig = {
            fontFamily: 'Orbitron',
            fontSize: '28px',
            backgroundColor: '',
            color: '#D3D3D3',
            align: 'center',
            padding: { top: 5, bottom: 5 },
            fixedWidth: 100
        };
        this.scoreLeft = this.add.text(borderUISize, borderUISize + borderPadding +50, this.p1Score, scoreConfig);

        let highScoreConfig = {
            fontFamily: 'Orbitron',
            fontSize: '28px',
            backgroundColor: '',
            color: '#000',
            align: 'center',
            padding: { top: 5, bottom: 5 },
            fixedWidth: 100
        };
        // Create the high score text (for example, top-right of the screen)
        // We'll assume game.config.width is the game width:
        this.scoreHigh = this.add.text(borderUISize, borderUISize + borderPadding, highScore, highScoreConfig);

    }
    

    spawnRoof() {
        // If the number of roofs exceeds the cap, reset and recycle a roof
        if (this.roofs.getChildren().length >= MAX_ROOFS) {
            let oldRoof = this.roofs.getFirstAlive(); // Get the first active roof
            oldRoof.x = game.config.width;  // Reset position
            oldRoof.setTexture(this.getRandomRoofTexture()); // Set new texture
            oldRoof.setScale(0.4);  // Reset scale if needed
        } else {
            // If the cap is not exceeded, spawn a new roof
            let newRoof = new Roof(this, game.config.width, game.config.height - borderUISize - borderPadding + 50, this.getRandomRoofTexture());
            newRoof.setScale(0.4);
            this.roofs.add(newRoof); // Add new roof to the group
        }
    }
    createInitialRoof() {
        // Create an initial roof at the back left of the screen where the player spawns
        let initialRoof = new Roof(this, this.player.x -25, this.player.y + 150, 'roof1');
        initialRoof.setScale(0.4);
        this.roofs.add(initialRoof);
        
        
    }

    // Helper function to get a random roof texture
    getRandomRoofTexture() {
        const textures = [ 'roof2', 'roof3','roof4', 'roof5']; // List all your roof textures here
        const randomIndex = Phaser.Math.Between(0, textures.length - 1);
        return textures[randomIndex];
    }

    updateScore() {
        // Increase score over time
        this.p1Score++;
        this.scoreLeft.text = this.p1Score;

        // Update high score if necessary
        if (this.p1Score > highScore) {
            highScore = this.p1Score;
            this.scoreHigh.text = highScore;
        }
    }

    update() {
    this.cityFAR.tilePositionX += .5;
    this.cityMID.tilePositionX += 1;

    this.roofs.children.iterate((roof) => {
        if (roof) {
            // Manually update the x position
            roof.x -= game.settings.roofSpeed;
            // If the roof has a physics body, update its position as well
            if (roof.body) {
                roof.body.x = roof.x;
                
            }
        }
    });
    this.updateScore()
    this.player.update(this.cursors);
}

}