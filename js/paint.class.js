import Point from './point.model.js'
import {
    TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE,
    TOOL_PAINT_BUCKET, TOOL_PENCIL, TOOL_BRUSH, TOOL_ERASER, TOOL_CIRCLE_PARAM, TOOL_SQUARE_PARAM, TOOL_TRIANGLE_PARAM
} from "./tool.js";

import {getMouseCoordsOnCanvas, encontrarDistancia} from './utility.js'
import Fill from './fill.class.js';

export default class Paint{
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.context = canvas.getContext("2d");
        this.undoStack = [];
        this.undoLimit = 10;// TODO controla maximo de "back"
    }

    set activeTool(tool){
        this.tool = tool;
        console.log(this.tool);   
    }

    //funcionalidad ancho de pincel
    set lineWidth(linewidth){
        this._lineWidth = linewidth;
        this.context.lineWidth = this._lineWidth
    }

    set brushSize(brushsize){
        this._brushSize = brushsize;

    }

    set selectedColor(color){
        this.color = color;
        this.context.strokeStyle = this.color;
    }

    init(){
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }

    onMouseDown(e){

        this.saveData = this.context.getImageData(0,0,this.canvas.clientWidth, this.canvas.height);

        if (this.undoStack.length >= this.undoLimit) this.undoStack.shift();
        this.undoStack.push(this.saveData);

        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);

        this.startPos = getMouseCoordsOnCanvas(e,this.canvas);
        
        if(this.tool == TOOL_PENCIL || this.tool == TOOL_BRUSH){
            this.context.beginPath();
            this.context.moveTo(this.startPos.x, this.startPos.y);
        } else if (this.tool == TOOL_PAINT_BUCKET){
            //Herramienta de balde para pintar --> fillcolor
            new Fill(this.canvas, this.startPos,this.color);
        } else if (this.tool == TOOL_ERASER){
            //herramienta borrador
            this.context.clearRect(this.startPos.x,this.startPos.y,
                this._brushSize, this._brushSize)
        }else if (this.tool == TOOL_CIRCLE_PARAM || this.tool == TOOL_SQUARE_PARAM || this.tool == TOOL_TRIANGLE_PARAM){
            //this.capture();//captura valor del modal
            this.drawShapeParams();
        }
        
    }

    onMouseMove(e){
        this.currentPos = getMouseCoordsOnCanvas(e,this.canvas);
        console.log(this.currentPos);

        switch(this.tool){
            case TOOL_LINE:
            case TOOL_RECTANGLE:
            case TOOL_CIRCLE:
            case TOOL_TRIANGLE:
                this.drawShape();
                break;
            case TOOL_PENCIL:
                this.drawFreeLine(this._lineWidth);
                break;
            case TOOL_BRUSH:
                this.drawFreeLine(this._brushSize);
                break;
            case TOOL_ERASER:
                this.context.clearRect(this.currentPos.x,this.currentPos.y,
                    this._brushSize, this._brushSize)
            default:
                break;
        }
    }


    onMouseUp(e){
        this.canvas.onmousemove = null;
        document.onmouseup = null;
    }

    drawShape(){
        this.context.putImageData(this.saveData,0,0);

        this.context.beginPath();

        if(this.tool == TOOL_LINE){
            this.context.moveTo(this.startPos.x,this.startPos.y);
            this.context.lineTo(this.currentPos.x,this.currentPos.y);
        } else if(this.tool == TOOL_RECTANGLE){
            this.context.rect(this.startPos.x, this.startPos.y, this.currentPos.x - this.startPos.x, this.currentPos.y - this.startPos.y);
        } else if (this.tool == TOOL_CIRCLE){
            let distance = encontrarDistancia(this.startPos,this.currentPos);//cuando el mouse se ha alejado 10 empieza a hacer el circulo
            //Formula de la distancia:
            // https://www.purplemath.com/modules/distform.htm
            this.context.arc(this.startPos.x,this.startPos.y, distance,0,2*Math.PI, false);
        } else if (this.tool == TOOL_TRIANGLE){
            this.context.moveTo(this.startPos.x + (this.currentPos.x - this.startPos.x)/2, this.startPos.y);
            this.context.lineTo(this.startPos.x,this.currentPos.y);
            this.context.lineTo(this.currentPos.x,this.currentPos.y);
            this.context.closePath();
        } 
        this.context.stroke();
    }

    capture(){
        var valor = document.getElementById("param_figure").value;
        console.log(valor);

        return valor;
    }

    capture_cuadro(){
        var valor1 = document.getElementById("param_figure_largo").value;
        var valor2 = document.getElementById("param_figure_ancho").value;
        console.log(valor1,valor2);
        //dos parametros
        return [valor1,valor2];
    }

    drawShapeParams(){
        this.context.putImageData(this.saveData,0,0);

        this.context.beginPath();

        //document.getElementById('textbox_id').value

        if(this.tool == TOOL_CIRCLE_PARAM){
            //console.log("me dispare");
            this.valor = this.capture();
            //console.log(this.startPos.x, this.startPos.y,this.valor);
            this.context.arc(this.startPos.x,this.startPos.y, this.valor,0,2*Math.PI, false);
        } else if (this.tool == TOOL_SQUARE_PARAM){
            this.valores = this.capture_cuadro();
            let valor1 = this.valores[0];
            let valor2 = this.valores[1];
            
            this.context.rect(this.startPos.x, this.startPos.y, valor1, valor2);
        }else if (this.tool == TOOL_TRIANGLE_PARAM){
            this.valor = this.capture();

            this.context.moveTo(this.startPos.x, this.startPos.y);
            this.context.lineTo(this.startPos.x - this.valor, this.startPos.y);
            this.context.lineTo(this.startPos.x - (this.valor/2),this.startPos.y - this.valor);
            this.context.lineTo(this.startPos.x,this.startPos.y);
            this.context.closePath();
        }
        this.context.stroke();
    }

    drawFreeLine(lineWidth){
        this.context.lineWidth = lineWidth
        this.context.lineTo(this.currentPos.x, this.currentPos.y);
        this.context.stroke();
    }

    undoPaint(){
        if (this.undoStack.length > 0) {
            this.context.putImageData(this.undoStack[this.undoStack.length - 1],0,0);
            this.undoStack.pop();
        } else{
            alert("Paso Atras no disponible")
        }
    }
}