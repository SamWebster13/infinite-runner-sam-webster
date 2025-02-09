/*
NAME: samuel webster
PROJECT TITLE: City Scraper

CITATIONS:
Physical art assets by Sam Webster

MUSIC:
'Grid' by Hartzmann, from Uppbeat 
*/ 

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene: [Menu, Play, credit],
  physics: {
      default: 'arcade', // Ensure arcade physics is used
      arcade: {
          gravity: { y: 300 }, // Adjust gravity if needed
          debug: false
      }
  }
};
let highScore = 0;  // Global high score variable

let game = new Phaser.Game(config)

//reserve keyboard bindings
let keyJUMP, keyRESET, keyLEFT, keyRIGHT

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
