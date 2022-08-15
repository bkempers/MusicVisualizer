import Sound from "./Sound.js";
import VisualizerSettings from "./VisualizerSettings.js";

let background;

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
  music.visualizerSettings = new VisualizerSettings("circle", "black", 0, music.windowWidth/2, music.windowHeight/2, music.soundObject.highlighted, music.soundObject.highlighted, 0, 0, true, true);
  music.VisualizerShapeArray.push(music.visualizerSettings);

  music.chanel.addEventListener("message", (event) => {
    music.soundObject = event.data;
    music.VisualizerShapeArray.forEach(function(element){
      if(element.audio_attached == true){
        element.w = music.soundObject.highlighted;
        element.h = music.soundObject.highlighted;
      }
    });
  });

  document.querySelector("#background_color").onchange = e => {
    background = e.target.value;
  }
  
  document.querySelector("#colorpicker_one").onchange = e => {
    music.VisualizerShapeArray.forEach(function(element){
      if(element.selected == true)
        element.shapeColor1 = e.target.value;
        console.log(element.shapeColor1);
    });
  }

  document.querySelector("#circle_button").addEventListener("click", function(){
    music.VisualizerShapeArray.forEach(function(element){
      if(element.selected == true)
        element.shape = "circle";
      else{
        let newCircle = new VisualizerSettings("circle", "black", 0, music.windowWidth/2, music.windowHeight/2, music.soundObject.highlighted, music.soundObject.highlighted, 0, 0, false, true);
        music.VisualizerShapeArray.push(newCircle);
      }
    });
  });

  document.querySelector("#square_button").addEventListener("click", function(){
    music.VisualizerShapeArray.forEach(function(element){
      if(element.selected == true)
        element.shape = "square";
      else{
        let newSquare = new VisualizerSettings("square", "black", 0, music.windowWidth/2, music.windowHeight/2, music.soundObject.highlighted, music.soundObject.highlighted, 0, 0, false, true);
        music.VisualizerShapeArray.push(newSquare);
      }
    });
  });

  document.querySelector("#heart_button").addEventListener("click", function(){
    music.VisualizerShapeArray.forEach(function(element){
      if(element.selected == true)
        element.shape = "heart";
      else{
        let newHeart = new VisualizerSettings("heart", "black", 0, music.windowWidth/2, music.windowHeight/2, music.soundObject.highlighted, music.soundObject.highlighted, 0, 0, false, true);
        music.VisualizerShapeArray.push(newHeart);
      }
    });
  });

  document.querySelector("#flower_button").addEventListener("click", function(){
    music.VisualizerShapeArray.forEach(function(element){
      if(element.selected == true)
        element.shape = "flower";
      else{
        let newFlower = new VisualizerSettings("flower", "black", 0, music.windowWidth/2, music.windowHeight/2, music.soundObject.highlighted, music.soundObject.highlighted, 0, 0, false, true);
        music.VisualizerShapeArray.push(newFlower);
      }
    });
  });

  document.querySelector("#audio_attachment_button").addEventListener("click", function(){
    for(var i = 0; i < music.VisualizerShapeArray.length; i++){
      if(music.VisualizerShapeArray[i].selected)
        music.VisualizerShapeArray[i].audio_attached  = !music.VisualizerShapeArray[i].audio_attached;
    }
  });

  document.querySelector("#delete_button").addEventListener("click", function(){
    for(var i = 0; i < music.VisualizerShapeArray.length; i++){
      if(music.VisualizerShapeArray[i].selected)
        music.VisualizerShapeArray.splice(i ,1);
    }
  });

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

  music.background(background);
  music.drawShape();
}

music.drawShape = function(){
  music.VisualizerShapeArray.forEach(function(element){
    element.over(music);
    element.resize(music);
    element.update(music);
    element.show(music);
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

music.keyPressed = function(){
  music.VisualizerShapeArray.forEach(function(element){
    if(element.selected)
      element.rotateShape(music);
  });
}

music.windowResized = function() {
  music.resizeCanvas(music.windowWidth, music.windowHeight);
}

});