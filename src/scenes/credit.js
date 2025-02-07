class credit extends Phaser.Scene {
    constructor() {
      super("creditsscene")
    }
     
        create() {
            this.cityFAR = this.add.tileSprite(0, 0, 1920, 1080, 'cityFAR').setOrigin(0,0)
            this.cityMID = this.add.tileSprite(0, 0, 1920, 1080, 'cityMID').setOrigin(0,0)
            this.cityFAR.setScale(0.4)
            this.cityMID.setScale(0.4)
            this.add.rectangle(0, borderUISize + borderPadding + 375, game.config.width, borderUISize * 2, 0xD2038).setOrigin(0, 0)
            this.backgroundMenu = this.add.tileSprite(0, 0, 640, 480, 'backgroundMenu').setOrigin(0,0)
            
            let menuConfig = {
                fontFamily: 'Orbitron',
                fontSize: '28px',
                backgroundColor: '#590B0F',
                color: '#E31E29',
                align: 'center',
                padding: { top: 5, bottom: 5 },
                fixedWidth: 250
            }
    
            // Title
            this.add.text(game.config.width / 2, game.config.height / 2 - 100, 'CREDITS', menuConfig).setOrigin(0.5);
    
            // Credits Text
            this.add.text(game.config.width / 2, game.config.height / 2, 'Game by: Sam Webster', { fontFamily: 'Orbitron', fontSize: '20px', color: '#E31E29' }).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 40, 'Music: Artist Name', { fontFamily: 'Orbitron', fontSize: '20px', color: '#E31E29' }).setOrigin(0.5);
    
            // Back Button
            let backButton = this.add.text(game.config.width / 2, game.config.height / 2 + 150, 'BACK', menuConfig)
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
        }

        update(){
            this.cityFAR.tilePositionX += .5
            this.cityMID.tilePositionX += 1
        }
}