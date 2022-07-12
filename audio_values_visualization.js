import Sound from "./Sound.js";

new p5(function(audio){
/**
 * Creating p5 canvas and initializing fast-fourier transformation of audio file. 
 */
 audio.setup = function(){
  let audio_values_canvas = audio.createCanvas(audio.windowWidth, audio.windowHeight);
  audio_values_canvas.parent("p5_audio_values_canvas");

  audio.soundObject = new Sound(0, 0, 0, 0, 0, 0, 0);
  audio.soundObject.highlighted = audio.soundObject.bass;
  audio.audioValues = ["bass", "lowMid", "mid", "highMid", "treble"];

  audio.chanel = new BroadcastChannel("sound_value_chanel");
  audio.chanel.postMessage(audio.soundObject);
  audio.chanel.addEventListener("load", (event) => {
    console.log("BroadcastChannel object has been created.")
  });

  audio.fft = new p5.FFT();
  audio.mic = new p5.AudioIn();

  audio.mic.start();
  audio.fft.setInput(audio.mic);
}

/**
 * Calculates different audio frequency values & draws them on canvas.
 */
audio.draw = function(){
  audio.background('black');

  audio.getAudioValues();

  let bins=[audio.soundObject.bass, audio.soundObject.lowMid, audio.soundObject.mid, audio.soundObject.highMid, audio.soundObject.treble];

  for (var i =0;i<5;i++){
    if(audio.soundObject.highlightedKey == audio.audioValues[i]){
      audio.fill(0, 255, 0);
    }
    else{
      audio.fill(0, 128, 0);
    }
    audio.rect((i*audio.width/5)+10, (audio.height/(5/4)), audio.width/15, audio.map(bins[i], 0, 255, 0,-(audio.height/(5/4))));

  }

  audio.fill("white");
  audio.textSize(18);

  audio.text("bass", (0*audio.width/5)+10, (audio.height/(5/4)) + 20)
  audio.text("lowMid", (1*audio.width/5)+10, (audio.height/(5/4)) + 20)
  audio.text("mid", (2*audio.width/5)+10, (audio.height/(5/4)) + 20)
  audio.text("highMid", (3*audio.width/5)+10, (audio.height/(5/4)) + 20)
  audio.text("treble", (4*audio.width/5)+10, (audio.height/(5/4)) + 20)
}

audio.mousePressed = function(){
    var x = audio.mouseX,
      y = audio.mouseY;

      if(((x > (0*audio.width/5))+10 && x < (0*audio.width/5)+10)){
        if (((audio.height/(5/4)) + 20) > y < ((audio.height/(5/4)) + 80)){
          audio.soundObject.highlightedKey = "bass";
        }
      }
}

audio.keyPressed = function(){
  //FN F1
  if(audio.keyCode == 112){
    audio.soundObject.highlightedKey = "bass";
    audio.soundObject.highlighted = audio.soundObject.bass;
  }
  //FN F2
  else if(audio.keyCode == 113){
    audio.soundObject.highlightedKey = "lowMid";
    audio.soundObject.highlighted = audio.soundObject.lowMid;
  }
  //FN F3
  else if(audio.keyCode == 114){
    audio.soundObject.highlightedKey = "mid";
    audio.soundObject.highlighted = audio.soundObject.mid;
  }
  //FN F4
  else if(audio.keyCode == 115){
    audio.soundObject.highlightedKey = "highMid";
    audio.soundObject.highlighted = audio.soundObject.highMid;
  }
  //FN F5
  else if(audio.keyCode == 116){
    audio.soundObject.highlightedKey = "treble";
    audio.soundObject.highlighted = audio.soundObject.treble;
  }
  else{
    audio.soundObject.highlightedKey = "bass";
    audio.soundObject.highlighted = audio.soundObject.bass;
  }
}

audio.getAudioValues = function(){
  audio.fft.analyze();

  audio.soundObject.bass = audio.fft.getEnergy("bass");
  audio.soundObject.lowMid = audio.fft.getEnergy("lowMid");
  audio.soundObject.mid = audio.fft.getEnergy("mid");
  audio.soundObject.highMid = audio.fft.getEnergy("highMid");
  audio.soundObject.treble = audio.fft.getEnergy("treble");

  audio.keyPressed();
  audio.mousePressed();

  audio.chanel.postMessage(audio.soundObject);
}

audio.windowResized = function() {
  audio.resizeCanvas(audio.windowWidth, audio.windowHeight);
}
});