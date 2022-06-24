import Sound from "./Sound.js";

var soundObject = new Sound(0, 0, 0, 0, 0);
export var soundObject;

// export function getBass(){
//   return soundObject.bass;
// };

// export function setBass(val){
//   soundObject.bass = val;
// };

new p5(function(audio){
/**
 * Creating p5 canvas and initializing fast-fourier transformation of audio file. 
 */
 audio.setup = function(){
  let audio_values_canvas = audio.createCanvas(audio.windowWidth, audio.windowHeight);
  audio_values_canvas.parent("p5_audio_values_canvas");

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

  audio.fft.analyze();

  soundObject.bass = audio.fft.getEnergy("bass");
  soundObject.lowMid = audio.fft.getEnergy("lowMid");
  soundObject.mid = audio.fft.getEnergy("mid");
  soundObject.highMid = audio.fft.getEnergy("highMid");
  soundObject.treble = audio.fft.getEnergy("treble");

  let bins=[soundObject.bass, soundObject.lowMid, soundObject.mid, soundObject.highMid, soundObject.treble];
  audio.fill(1+1*(255/5)/255,(1+1)*(255/5),0);
  for (var i =0;i<5;i++){
    audio.rect((i*audio.width/5)+10, (audio.height/(5/4)), audio.width/15, audio.map(bins[i], 0, 255, 0,-(audio.height/(5/4))));
  }
  audio.noStroke();

  audio.fill("white");
  audio.textSize(18);
  audio.text("bass", (0*audio.width/5)+10, (audio.height/(5/4)) + 20)
  audio.text("lowMid", (1*audio.width/5)+10, (audio.height/(5/4)) + 20)
  audio.text("mid", (2*audio.width/5)+10, (audio.height/(5/4)) + 20)
  audio.text("highMid", (3*audio.width/5)+10, (audio.height/(5/4)) + 20)
  audio.text("treble", (4*audio.width/5)+10, (audio.height/(5/4)) + 20)
}
});