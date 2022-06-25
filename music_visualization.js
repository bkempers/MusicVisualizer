import Sound from "./Sound.js";

new p5(function(music){
/**
 * Creating p5 canvas and initializing fast-fourier transformation of audio file. 
 */
 music.setup = function(){
  let music_visualizer_canvas = music.createCanvas(music.windowWidth, music.windowHeight);
  music_visualizer_canvas.parent("p5_music_visualizer_canvas");

  music.soundObject = new Sound(0, 0, 0, 0, 0);

  music.chanel = new BroadcastChannel("sound_value_chanel");
  music.chanel.addEventListener("message", (event) => {
    music.soundObject = event.data;
  });
  console.log(music.soundObject.bass);
}

/**
 * Calculates different audio frequency values & draws them on canvas.
 */
music.draw = function(){
  music.chanel.addEventListener("message", (event) => {
    music.soundObject = event.data;
  });

  music.background('grey');
  
  music.circle(music.windowWidth/2, music.windowHeight/2, 2*(music.soundObject.treble));
}

music.windowResized = function() {
  music.resizeCanvas(music.windowWidth, music.windowHeight);
}
});