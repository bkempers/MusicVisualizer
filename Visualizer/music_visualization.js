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
  music.visualizerSettings = new VisualizerSettings("white", "circle", "black", 0);

  music.chanel = new BroadcastChannel("sound_value_chanel");
  music.chanel.addEventListener("message", (event) => {
    music.soundObject = event.data;
  });
}

/**
 * Calculates different audio frequency values & draws them on canvas.
 */
music.draw = function(){
  music.rectMode(music.CENTER);
  music.angleMode(music.DEGREES);
  music.translate(music.windowWidth/2, music.windowHeight/2);

    document.querySelector("#colorpicker_one").onchange = e => {
    music.visualizerSettings.shapeColor1 = e.target.value;
  }

  document.querySelector("#background_color").onchange = e => {
    music.visualizerSettings.background = e.target.value;
  }

  document.querySelector("#circle_button").addEventListener("click", function(){
    music.visualizerSettings.shape = "circle";
  });

  document.querySelector("#square_button").addEventListener("click", function(){
    music.visualizerSettings.shape = "square";
  });

  document.querySelector("#rotation_range").onchange = e => {
    music.visualizerSettings.rotation = e.target.value;
  }

  music.chanel.addEventListener("message", (event) => {
    music.soundObject = event.data;
  });

  music.background(music.visualizerSettings.background);
  music.drawShape();
}

music.drawShape = function(){
  music.fill(music.visualizerSettings.shapeColor1);
  music.rotate(music.visualizerSettings.rotation);
  switch(music.visualizerSettings.shape){
    case "circle":
      music.circle(0, 0, 2*(music.soundObject.highlighted));
      break;
    case "square":
      music.rect(0, 0, music.soundObject.highlighted, music.soundObject.highlighted);
      break;
  }
}

music.windowResized = function() {
  music.resizeCanvas(music.windowWidth, music.windowHeight);
}
});