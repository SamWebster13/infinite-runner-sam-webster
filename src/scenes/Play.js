
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
        
        this.roofs = this.add.group(); // Create a group to store roofs
        let spacing = 200; // Base distance between buildings
        for (let i = 0; i < 10; i++) {
            let xPos = i * spacing + Phaser.Math.Between(50, 150); // Space out the roofs with some randomness
            let newRoof = new Roof(this, xPos, game.config.height - 25, this.getRandomRoofTexture());
            this.roofs.add(newRoof);
            this.roofCounter++; // Increase count
        }


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
            roof.update();
        });
        this.updateScore()
        this.player.update(this.cursors);
        console.log(this.player.y)
    
    
        if (this.player.y > game.config.height-70) {
            this.sound.stopByKey('grid')
    
            this.sound.play('deathSound');
            this.scene.start('gameoverScene');
        }
    }
    

}