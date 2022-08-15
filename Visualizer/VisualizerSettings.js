export default class VisualizerSettings {
  constructor(shape, shapeColor1, rotation, x, y, w, h, offsetX, offsetY, selected, audio_attached) {
    this.shape = shape;
    this.shapeColor1 = shapeColor1;
    this.rotation = rotation;
    this.selected = selected;
    this.audio_attached = audio_attached;

    this.x = x;
    this.y = y;

    this.widthFactor = 0;
    this.heightFactor = 0;
    this.w = w + this.widthFactor;
    this.h = h + this.heightFactor;
    this.aspectRatio = w / h;

    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.dragging = false;
    this.rollover = false;

    this.resizing = false;
    this.isResizing = false;
    this.resizeBox = 40;
  }

  over(music) {
    // Is mouse over object
    if (music.mouseX > this.x - this.w && music.mouseX < this.x + this.w && music.mouseY > this.y - this.h && music.mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  resize(music) {
    // Is mouse over resize section
    if (music.mouseX > this.x + this.w - this.resizeBox && music.mouseX < this.x + this.w && music.mouseY > this.y + this.h - this.resizeBox && music.mouseY < this.y + this.h) {
      this.resizing = true;
    } else {
      this.resizing = false;
    }
  }

  update(music) {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = music.mouseX + this.offsetX;
      this.y = music.mouseY + this.offsetY;
    }
  }

  show(music) {
    //Display resize box in lower right hand corner
    music.stroke('black');

    if (this.isResizing) {
      if (music.mouseX - this.x + this.offsetX > 50) {
        this.w = music.mouseX - this.x + this.offsetX;
        this.h = music.mouseX - this.x + this.offsetX;
      } else {
        this.w = 50;
        this.h = 50;
      }
    }

    if (this.resizing || this.selected) {
      //Makes small triangle at the bottom right hand corner of shape's box
      var handleX1 = this.x + this.w - this.resizeBox;
      var handleY1 = this.y + this.h - this.resizeBox;
      var handleX2 = this.x + this.w;
      var handleY2 = this.y + this.h;
      music.noStroke();
      music.fill('green');
      music.beginShape();
      music.vertex(handleX1, handleY1 + this.resizeBox);
      music.vertex(handleX2, handleY1);
      music.vertex(handleX2, handleY2);
      music.endShape(music.CLOSE);
      music.stroke('black');
      music.line(handleX1, handleY1 + this.resizeBox, handleX2, handleY1);
      music.line(handleX1 + 15, handleY1 + this.resizeBox, handleX2, handleY1 + 15);
      music.line(handleX1 + 30, handleY1 + this.resizeBox, handleX2, handleY1 + 30);

      //Makes dashed outline of 'bounding' box for shape currently being hovered over.
      music.stroke('black');
      music.strokeWeight(2);
      music.noFill();
      music.drawingContext.setLineDash([5, 5]);
      music.rect(this.x, this.y, 2 * this.w, 2 * this.h);
    }

    music.strokeWeight(1);
    music.drawingContext.setLineDash([]);

    //Draw shape onto canvas
    music.stroke(0);
    if (this.dragging) {
      music.fill(50);
    } else if (this.rollover) {
      music.fill(100);
    } else if (this.selected) {
      music.fill(100);
    } else {
      music.fill(this.shapeColor1);
    }

    switch (this.shape) {
      case "circle":
        music.circle(this.x, this.y, 2 * this.h);
        break;
      case "square":
        music.rect(this.x, this.y, 2 * this.w, 2 * this.h);
        break;
      case "heart":
        this.heart(music, 2 * this.w);
        break;
      case "flower":
        this.flower(music);
        break;
    }
  }

  pressed(music) {
    if (music.mouseX > this.x + this.w - this.resizeBox && music.mouseX < this.x + this.w && music.mouseY > this.y + this.h - this.resizeBox && music.mouseY < this.y + this.h) {
      this.isResizing = true;

      this.offsetX = (this.x + this.w) - music.mouseX;
      this.offsetY = (this.y + this.h) - music.mouseY;
    } else if (music.mouseX > this.x - this.w && music.mouseX < this.x + this.w && music.mouseY > this.y - this.h && music.mouseY < this.y + this.h) {
      this.dragging = true;

      music.VisualizerShapeArray.forEach(function (element) {
        element.selected = false;
      });
      this.selected = true;

      this.offsetX = this.x - music.mouseX;
      this.offsetY = this.y - music.mouseY;
    }
  }

  released(music) {
    // Quit dragging
    this.dragging = false;
    this.isResizing = false;
  }

  rotateShape(music){

  }

  //Unique P5js shape functions
  heart(music, size){
    let offsetX = this.x;
    let offsetY = this.y - (this.h / 2);

    music.beginShape();
    music.vertex(this.offsetX, this.offsetY);
    music.bezierVertex(offsetX - size / 2, offsetY - size / 2, offsetX - size, offsetY + size / 3, offsetX, offsetY + size);
    music.bezierVertex(offsetX + size, offsetY + size / 3, offsetX + size / 2, offsetY - size / 2, offsetX, offsetY);
    music.endShape(music.CLOSE);
  }

  flower(music){
    music.angleMode(music.DEGREES);
    music.noStroke();

    music.ellipse(this.x, this.y, this.w/(3/2), 2*this.w);
    
    music.push();
    music.translate(this.x, this.y);
    music.rotate(60);
    music.ellipse(0, 0, this.w/(3/2), 2*this.w);
    music.pop();

    music.push();
    music.translate(this.x, this.y);
    music.rotate(120);
    music.ellipse(0, 0, this.w/(3/2), 2*this.w);
    music.pop();

    music.push();
    music.translate(this.x, this.y);
    music.rotate(180);
    music.ellipse(0, 0, this.w/(3/2), 2*this.w);
    music.pop();

    music.push();
    music.translate(this.x, this.y);
    music.rotate(240);
    music.ellipse(0, 0, this.w/(3/2), 2*this.w);
    music.pop();

    music.push();
    music.translate(this.x, this.y);
    music.rotate(300);
    music.ellipse(0, 0, this.w/(3/2), 2*this.w);
    music.pop();

    music.push();
    music.translate(this.x, this.y);
    music.rotate(360);
    music.ellipse(0, 0, this.w/(3/2), 2*this.w);
    music.pop();

    music.fill("white");
    music.ellipse(this.x, this.y, this.w-35, this.w-35);
  }


}