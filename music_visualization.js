import Sound from "./Sound.js";
import VisualizerSettings from "./VisualizerSettings.js";

new p5(function(music){
/**
 * Creating p5 canvas and initializing fast-fourier transformation of audio file. 
 */
 music.setup = function(){
  let music_visualizer_canvas = music.createCanvas(music.windowWidth, music.windowHeight);
  music_visualizer_canvas.parent("p5_music_visualizer_canvas");

  music.soundObject = new Sound();
  music.visualizerSettings = new VisualizerSettings("white", "circle", "black");

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
  document.querySelector("#colorpicker_one").onchange = e => {
    console.log(e.target.value)
    music.visualizerSettings.shapeColor1 = e.target.value;
  }

  music.chanel.addEventListener("message", (event) => {
    music.soundObject = event.data;
  });

  music.background(music.visualizerSettings.background);
  music.drawShape();
}

music.drawShape = function(){
  music.fill(music.visualizerSettings.shapeColor1);
  switch(music.visualizerSettings.shape){
    case "ellipse":
      music.ellipse(music.windowWidth/2, music.windowHeight/2, 2*(music.soundObject.highlighted));
      break;
    case "circle":
      music.circle(music.windowWidth/2, music.windowHeight/2, 2*(music.soundObject.highlighted));
      break;
    case "square":
      music.square(music.windowWidth/3, music.windowHeight/4, (music.soundObject.highlighted));
      break;
  }
}

music.windowResized = function() {
  music.resizeCanvas(music.windowWidth, music.windowHeight);
}
});