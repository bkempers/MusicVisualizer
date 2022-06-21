/**
 * Creating p5 canvas and initializing fast-fourier transformation of audio file. 
 */
function setup(){
  let music_canvas = createCanvas(displayWidth,displayHeight/2);
  music_canvas.parent("p5_canvas")

  fft = new p5.FFT();

  let mic = new p5.AudioIn();
  mic.start();
  fft.setInput(mic);

  draw();
}

/**
 * Calculates different audio frequency values & draws them on canvas.
 */
function draw(){
  background('black');

  fft.analyze();

  let bass = fft.getEnergy("bass");
  let lowMid = fft.getEnergy("lowMid");
  let mid = fft.getEnergy("mid");
  let highMid = fft.getEnergy("highMid");
  let treble = fft.getEnergy("treble");

  let bins=[bass,lowMid,mid,highMid,treble]
  fill(1+1*(255/5)/255,(1+1)*(255/5),0);
  for (var i =0;i<5;i++){
    rect((i*width/5)+10, (height/(5/4)), width/15, map(bins[i], 0, 255, 0,-(height/(5/3))));
  }
  noStroke();

  fill("white");
  textSize(18);
  text("bass", (0*width/5)+10, (height/(5/4)) + 20)
  text("lowMid", (1*width/5)+10, (height/(5/4)) + 20)
  text("mid", (2*width/5)+10, (height/(5/4)) + 20)
  text("highMid", (3*width/5)+10, (height/(5/4)) + 20)
  text("treble", (4*width/5)+10, (height/(5/4)) + 20)
}