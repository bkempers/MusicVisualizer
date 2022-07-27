export default class VisualizerSettings {
  constructor(shape, shapeColor1, rotation, x, y, w, h, offsetX, offsetY, selected) {
    this.shape = shape;
    this.shapeColor1 = shapeColor1;
    this.rotation = rotation;
    this.selected = selected;

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.dragging = false;
    this.rollover = false;
  }

  over(music) {
    // Is mouse over object
    if (music.mouseX > this.x - this.w && music.mouseX < this.x + this.w && music.mouseY > this.y - this.h && music.mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
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
    music.stroke(0);
    // Different fill based on state
    if (this.dragging) {
      music.fill(50);
    } else if (this.rollover) {
      music.fill(100);
    } else if(this.selected){
      music.fill(100);
    } else {
      music.fill(this.shapeColor1);
    }

    switch (this.shape) {
      case "circle":
        music.circle(this.x, this.y, 2 * (music.soundObject.highlighted));
        break;
      case "square":
        music.rect(this.x, this.y, 2 * (music.soundObject.highlighted), 2 * (music.soundObject.highlighted));
        break;
    }
  }

  pressed(music) {
    if (music.mouseX > this.x - this.w && music.mouseX < this.x + this.w && music.mouseY > this.y - this.h && music.mouseY < this.y + this.h) {
      this.dragging = true;
      music.VisualizerShapeArray.forEach(function(element){
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
  }
}