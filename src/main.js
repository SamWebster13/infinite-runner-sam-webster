/*
NAME: samuel webster
PROJECT TITLE: City Scraper

CITATIONS:
Physical art assets by Sam Webster

MUSIC:
'Grid' by Hartzmann, from Uppbeat 
'Dance' by Benjamin Tissot, from Bensound

RUN DOWN:
City Scraper is a game I made with a kind of cyberpunk dystopian theme in mind, with a futuristic but grim background city scape. Essentially, 
our player runs across roof tops, being careful not to fall into the alleys inbetween buildings, lest they hit a game over state.

this assignment was killer, dragged me real low. However, my saving grace was that at the same time im taking this class, im taking 
artg 91, intro to game art production. Many of the assets made and used in this game I had to make and turn in as projects for 91, which
saved me a good amount on asset making. My favorite assets are the dynamic moving city in the background, made in adobe illustrator and designed 
with parallax scrolling in mind, as each layer of the city was made independently, so that I could move them at differing speeds. 

The buildings are simplistic, but I was running out of time and the assets I had been using were failing me so, had to improvise. The character 
animations similarly were tricky, as it was my first time actually animating. I often had to go back into aseprite and fix up the sprite sheet.

STRETCH GOALS I DIDNT GET TO DO:
This game was meant to be much more ambitious, though do to my work and other outside constraints, I had to focus more of my time into what 
I COULD do. Essentially the game wasnt supposed to fully end when you fell into an alley way, instead you would be sent to a second play scene, 
down on the surface streets and would either find a ladder to climb up, or hit a box and die for good, forcing a restart. 

Sadly, I didnt have time to implement this, despite the fact that I had all the assets and planning done for it, and youll see here in the assets 
folder such artifacts, such as the ladder, box, and building .pngs
*/ 

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene: [Menu, Play, credit, gameover],
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
