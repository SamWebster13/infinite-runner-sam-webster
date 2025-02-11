class gameover extends Phaser.Scene {
    constructor() {
      super("gameoverScene")
    }
    create() {
        this.music = this.sound.add('dance', { loop: true, volume: 0.5 });
        this.music.play();
    
      this.cityFAR = this.add.tileSprite(0, 0, 1920, 1080, 'cityFAR').setOrigin(0,0)
      this.cityMID = this.add.tileSprite(0, 0, 1920, 1080, 'cityMID').setOrigin(0,0)
      this.cityFAR.setScale(0.4)
      this.cityMID.setScale(0.4)
      this.add.rectangle(0, borderUISize + borderPadding + 375, game.config.width, borderUISize * 2, 0xD2038).setOrigin(0, 0)
      this.backgroundMenu = this.add.tileSprite(0, 0, 640, 480, 'backgroundMenu').setOrigin(0,0)

      let menuConfig = {
        fontFamily: 'Orbitron',
        fontSize: '28px',
        backgroundColor: '',
        color: '#E31E29',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
      }
    
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'CITY SCRAPER', menuConfig).setOrigin(0.5)

      let highScoreConfig = {
        fontFamily: 'Orbitron',
        fontSize: '28px',
        backgroundColor: '',
        color: '#FFFFFF',
        align: 'center',
        padding: { top: 5, bottom: 5 },
        fixedWidth: 100
    };
    // Create the high score text (for example, top-right of the screen)
    // We'll assume game.config.width is the game width:
    this.scoreHigh = this.add.text(borderUISize, borderUISize + borderPadding, highScore, highScoreConfig);

      let playButton = this.add.text(game.config.width / 2, game.config.height / 2 + 60, 'RESET', menuConfig) // <-- Adjusted Y position
          .setOrigin(0.5)
          .setInteractive()
          .on('pointerover', () => {
            this.sound.play('hover');
            playButton.setStyle({ color: '#ef4591' }); 
          })
          .on('pointerout', () => playButton.setStyle({ backgroundColor: '', color: '#E31E29' })) // Reset
          .on('pointerdown', () => {
            this.sound.play('select');
            playButton.setStyle({ color: '#ef4591' }); 
            game.settings = {
              roofSpeed: 3,
            }
            this.sound.stopByKey('dance')
            this.scene.start('playScene')
          })

          let menuButton = this.add.text(game.config.width / 2, game.config.height / 2 + 120, 'MENU', menuConfig) // <-- Adjusted Y position
          .setOrigin(0.5)
          .setInteractive()
          .on('pointerover', () => {
            this.sound.play('hover');
            menuButton.setStyle({ color: '#ef4591' }); 
          })
          .on('pointerout', () => playButton.setStyle({ backgroundColor: '', color: '#E31E29' })) // Reset
          .on('pointerdown', () => {
            this.sound.play('select');
            menuButton.setStyle({ color: '#ef4591' }); 
            game.settings = {
              roofSpeed: 3,
            }
            this.sound.stopByKey('dance')
            this.scene.start('menuScene')
          })


      let creditsButton = this.add.text(game.config.width / 2, game.config.height / 2 + 180, 'CREDITS', menuConfig) // <-- Adjusted Y position
          .setOrigin(0.5)
          .setInteractive()
          .on('pointerover', () => {
            this.sound.play('hover');
            creditsButton.setStyle({ color: '#ef4591' }); 
          })
          .on('pointerout', () => creditsButton.setStyle({ backgroundColor: '', color: '#E31E29' })) // Reset
          .on('pointerdown', () => {
            this.sound.play('select');
            creditsButton.setStyle({ color: '#ef4591' }); 
            this.sound.stopByKey('dance')
            this.scene.start('creditsscene')
          })

    this.add.text(game.config.width/2, game.config.height/2, 'USE SPACE TO JUMP', menuConfig).setOrigin(0.5)
    menuConfig.backgroundColor = '#E31E29'
    menuConfig.color = '#000'
    this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, '', menuConfig).setOrigin(0.5)

    

    }
    
    update() {
      this.cityFAR.tilePositionX += .5
      this.cityMID.tilePositionX += 1
    }
}
