class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene")
    }
    preload(){
        //load images/tile sprites
        this.load.image('cityFAR', './assets/cityFAR.png')
        this.load.image('cityMID', './assets/cityMID.png')
        this.load.image('box', './assets/box.png')
        this.load.image('building', './assets/building.png')
        this.load.image('fence', './assets/fence.png')
        this.load.image('ladder', './assets/ladder.png')
        this.load.image('rail', './assets/rail.png')
        this.load.image('railFence', './assets/railFence.png')
        this.load.image('roof1', './assets/roof1.png')
        this.load.image('roof2', './assets/roof2.png')
        this.load.image('backgroundMenu', './assets/backgroundMenu.png')
        //load animations / sprite sheets
        /*this.load.spritesheet('explosion', './assets/explosion.png',{
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9,
        })*/
        // load audio
        this.load.audio('jump', './assets/jump.wav')
        this.load.audio('step 1', './assets/step 1.wav')
        this.load.audio('step 2', './assets/step 2.wav')
        this.load.audio('grid', './assets/grid-hartzmann-main-version-13277-02-49.mp3')
        this.load.audio('hover', './assets/hoverTone.wav')
        this.load.audio('select', './assets/select.wav')
    }

    create() {
      this.sound.play('grid', { loop: true, volume: 0.2 }); // Adjust volume as needed

      
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

      let playButton = this.add.text(game.config.width / 2, game.config.height / 2 + 60, 'PLAY', menuConfig) // <-- Adjusted Y position
          .setOrigin(0.5)
          .setInteractive()
          .on('pointerover', () => {
            // Play sound on hover
            this.sound.play('hover');
            playButton.setStyle({ color: '#ef4591' }); // Hover effect
          })
          .on('pointerout', () => playButton.setStyle({ backgroundColor: '', color: '#E31E29' })) // Reset
          .on('pointerdown', () => {
            // Play sound on hover
            this.sound.play('select');
            playButton.setStyle({ color: '#ef4591' }); // Hover effect
            game.settings = {
              roofSpeed: 3,
            }
            this.scene.start('playScene');
          })
          // Credits Button (Moved further down too)
      let creditsButton = this.add.text(game.config.width / 2, game.config.height / 2 + 120, 'CREDITS', menuConfig) // <-- Adjusted Y position
          .setOrigin(0.5)
          .setInteractive()
          .on('pointerover', () => {
            // Play sound on hover
            this.sound.play('hover');
            creditsButton.setStyle({ color: '#ef4591' }); // Hover effect
          })
          .on('pointerout', () => creditsButton.setStyle({ backgroundColor: '', color: '#E31E29' })) // Reset
          .on('pointerdown', () => {
            // Play sound on hover
            this.sound.play('select');
            creditsButton.setStyle({ color: '#ef4591' }); // Hover effect
            this.scene.start('creditsscene');
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