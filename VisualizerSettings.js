export default class VisualizerSettings{
    constructor(background, shape, shapeColor1, shapeColor2){
        this.background = background;
        this.shape = shape;
        this.shapeColor1 = shapeColor1;
        this.shapeColor2 = shapeColor2;
    }

    shapeColorOneChange(val){
        let color = document.querySelector("#colorpicker_one");
        color.addEventListener("change", (event) => {
            shapeColor1Change(event.target.value);
            console.log(e.target.value);
        });
    }
}