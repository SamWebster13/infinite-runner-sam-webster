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
        this.load.image('ladder', './assets/fence.png')
        this.load.image('rail', './assets/fence.png')
        this.load.image('railFence', './assets/fence.png')
        this.load.image('roof1', './assets/fence.png')
        this.load.image('roof2', './assets/fence.png')

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
        this.load.audio('grid', './assets/grid-hartzmann-main-version-13277-02-49.wav')


    }

    create() {

    }
    
    update() {
        
      }

}