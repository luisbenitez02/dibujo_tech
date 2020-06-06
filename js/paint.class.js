import Point from './point.model.js'
import {
    TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE,
    TOOL_PAINT_BUCKET, TOOL_PENCIL, TOOL_BRUSH, TOOL_ERASER
} from "./tool.js";

import {getMouseCoordsOnCanvas} from './utility.js'

export default class Paint{
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.context = canvas.getContext("2d");
    }

    set activeTool(tool){
        this.tool = tool;
        console.log(this.tool);
        
    }

    init(){
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }

    onMouseDown(e){
        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);

        this.startPos = getMouseCoordsOnCanvas(e,this.canvas);
        console.log('Posicion inicial:',this.startPos);
        
    }

    onMouseMove(e){
        this.currentPos = getMouseCoordsOnCanvas(e,this.canvas);
        console.log(this.currentPos);

        switch(this.tool){
            case TOOL_LINE:
                this.drawShape();
                break;
            default:
                break;
        }
    }


    onMouseUp(e){
        this.canvas.onmousemove = null;
        document.onmouseup = null;
    }

    drawShape(){
        this.context.beginPath();
        this.context.moveTo(this.startPos.x,this.startPos.y);
        this.context.lineTo(this.currentPos.x,this.currentPos.y);
        this.context.stroke();
    }
}