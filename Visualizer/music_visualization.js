import Sound from "./Sound.js";
import VisualizerSettings from "./VisualizerSettings.js";

let background;
let prevSelected = new Array();

new p5(function(music){
/*
 * Creating p5 canvas and initializing fast-fourier transformation of audio file. 
 */
 music.setup = function(){
  let music_visualizer_canvas = music.createCanvas(music.windowWidth, music.windowHeight);
  music_visualizer_canvas.parent("p5_music_visualizer_canvas");

  music.soundObject = new Sound();

  music.chanel = new BroadcastChannel("sound_value_chanel");

  music.VisualizerShapeArray = new Array();
  music.visualizerSettings = new VisualizerSettings("circle", "black", 0, music.windowWidth/2, music.windowHeight/2, music.soundObject.highlighted, music.soundObject.highlighted, 0, 0, true);
  music.VisualizerShapeArray.push(music.visualizerSettings);

  music.chanel.addEventListener("message", (event) => {
    music.soundObject = event.data;
    music.VisualizerShapeArray.forEach(function(element){
      element.w = music.soundObject.highlighted;
      element.h = music.soundObject.highlighted;
    });
  });

  document.querySelector("#background_color").onchange = e => {
    background = e.target.value;
  }
  
  document.querySelector("#colorpicker_one").onchange = e => {
    music.VisualizerShapeArray.forEach(function(element){
      if(element.selected == true)
        element.shapeColor1 = e.target.value;
    });
  }

  document.querySelector("#circle_button").addEventListener("click", function(){
    music.VisualizerShapeArray.forEach(function(element){
      if(element.selected == true)
        element.shape = "circle";
      else{
        let newCircle = new VisualizerSettings("circle", "black", 0, music.windowWidth/2, music.windowHeight/2, music.soundObject.highlighted, music.soundObject.highlighted, 0, 0, false);
        music.VisualizerShapeArray.push(newCircle);
      }
    });
  });

  document.querySelector("#square_button").addEventListener("click", function(){
    music.VisualizerShapeArray.forEach(function(element){
      if(element.selected == true)
        element.shape = "square";
      else{
        let newSquare = new VisualizerSettings("square", "black", 0, music.windowWidth/2, music.windowHeight/2, music.soundObject.highlighted, music.soundObject.highlighted, 0, 0, false);
        music.VisualizerShapeArray.push(newSquare);
      }
    });
  });

  document.querySelector("#rotation_range").onchange = e => {
    music.VisualizerShapeArray.forEach(function(element){
      if(element.selected == true)
        element.rotation = e.target.value;
    });
  }

  document.querySelector("#p5_music_visualizer_canvas").ondblclick = e =>{
    music.VisualizerShapeArray.forEach(function(element){
      element.selected = false;
    });
  }

  background = "white";
}

/**
 * Calculates different audio frequency values & draws them on canvas.
 */
music.draw = function(){
  music.rectMode(music.CENTER);
  music.angleMode(music.DEGREES);
  //music.translate(music.windowWidth/2, music.windowHeight/2);

  music.background(background);
  music.drawShape();
}

music.drawShape = function(){
  music.VisualizerShapeArray.forEach(function(element){
    element.over(music);
    element.update(music);
    element.show(music);
    music.rotate(element.rotation);
  });
}

music.mousePressed = function(){
  music.VisualizerShapeArray.forEach(function(element){
    element.pressed(music);
  });
}

music.mouseReleased = function(){
  music.VisualizerShapeArray.forEach(function(element){
    element.released(music);
  });
}

music.windowResized = function() {
  music.resizeCanvas(music.windowWidth, music.windowHeight);
}

});