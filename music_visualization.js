import Sound from "./Sound.js";
//import soundObject from "./audio_values_visualization.js";

new p5(function(music){
/**
 * Creating p5 canvas and initializing fast-fourier transformation of audio file. 
 */
 music.setup = function(){
  let music_visualizer_canvas = music.createCanvas(music.windowWidth, music.windowHeight);
  music_visualizer_canvas.parent("p5_music_visualizer_canvas");

}

/**
 * Calculates different audio frequency values & draws them on canvas.
 */
music.draw = function(){
  music.background('grey');
  music.circle(music.windowWidth/2, music.windowHeight/2, 100);
}
});