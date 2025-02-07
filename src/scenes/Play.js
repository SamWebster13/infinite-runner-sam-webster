class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }

    create() {
        //place tile sprite
        this.cityFAR = this.add.tileSprite(0, 0, 1920, 1080, 'cityFAR').setOrigin(0,0)
        this.cityMID = this.add.tileSprite(0, 0, 1920, 1080, 'cityMID').setOrigin(0,0)
        this.cityFAR.setScale(0.4)
        this.cityMID.setScale(0.4)
        this.add.rectangle(0, borderUISize + borderPadding + 375, game.config.width, borderUISize * 2, 0xD2038).setOrigin(0, 0)
        // green UI background
        // white borders
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        //this.add.rectangle(0, borderUISize + borderPadding + 375, game.config.width, borderUISize * 2, 0xD2038).setOrigin(0, 0)
        let menuConfig = {
            fontFamily: 'Orbitron',
            fontSize: '28px',
            backgroundColor: '',
            color: '#E31E29',
            align: 'center',
            padding: { top: 5, bottom: 5 },
            fixedWidth: 250
        }
        
        let backButton = this.add.text(game.config.width / 2 + 240, game.config.height / 2 -210, 'BACK', menuConfig)
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerover', () => {
                    // Play sound on hover
                    this.sound.play('hover');
                    backButton.setStyle({ color: '#ef4591' }); // Hover effect
                })
                .on('pointerout', () => backButton.setStyle({ backgroundColor: '', color: '#E31E29' })) // Reset
                .on('pointerdown', () => {
                    // Play sound on hover
                    this.sound.play('select');
                    backButton.setStyle({ color: '#ef4591' }); // Hover effect
                    this.scene.start('menuScene');
                })
                

        let resetButton = this.add.text(game.config.width / 2 + 100, game.config.height / 2 -210, 'RESET', menuConfig)
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerover', () => {
                    // Play sound on hover
                    this.sound.play('hover');
                    resetButton.setStyle({ color: '#ef4591' }); // Hover effect
                })
                .on('pointerout', () => resetButton.setStyle({ backgroundColor: '', color: '#E31E29' })) // Reset
                .on('pointerdown', () => {
                    // Play sound on hover
                    this.sound.play('select');
                    resetButton.setStyle({ color: '#ef4591' }); // Hover effect
                    this.scene.start('playScene');
                })

        this.roofs = this.add.group();

        // Call spawnRoof to create the first roof
        this.spawnRoof();
       


        //define keys

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
       

    }

    spawnRoof() {
        let newRoof = new roof(this, game.config.width, game.config.height - borderUISize - borderPadding + 50, 'roof1');
        newRoof.setScale(0.4)
        this.roofs.add(newRoof);
    }
    
    update() {
        this.cityFAR.tilePositionX += .5
        this.cityMID.tilePositionX += 1
        this.roofs.children.iterate(roof => {
            if (roof) {
                roof.update(); // Move each roof
            }
        });
    }
    

        
    
}