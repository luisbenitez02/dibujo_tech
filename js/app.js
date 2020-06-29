import { TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE,
TOOL_PAINT_BUCKET, TOOL_PENCIL, TOOL_BRUSH, TOOL_ERASER, TOOL_CIRCLE_PARAM, TOOL_TRIANGLE_PARAM, TOOL_SQUARE_PARAM} from "./tool.js";

import Paint from "./paint.class.js"

var paint = new Paint('canvas');
paint.activeTool = TOOL_LINE;
paint.lineWidth = 1;//ancho de brocha predeterminado
paint.brushSize = 4;
//paint.selectedTool = "#000000";
paint.selectedColor = "#000000";
paint.init();
/* Selector de comandos atras y descarga */
document.querySelectorAll("[data-command]").forEach(
    item => {
        item.addEventListener("click", e=> {
            console.log(item.getAttribute("data-command"));
            let command = item.getAttribute("data-command");

            if (command === "undo") {
                paint.undoPaint();
            } else if (command === "download"){
                var canvas = document.getElementById("canvas");
                var image = canvas.toDataURL("image/png",1.0).replace("image/png", "image/octe-stream");
                var link = document.createElement("a");
                link.download="my-lienzo.png";
                link.href = image;
                link.click();
            } 
        });
    }
);

/* Selectores de los comandos:
linea,cuadro, circulo, triangulo, lapiz, brocha, rellenar, y borrar */
document.querySelectorAll("[data-tool]").forEach(
    item => {
        item.addEventListener("click", e => {//cuando hago click cambio propiedad entre ellos
            document.querySelector("[data-tool].active").classList.toggle("active");
            item.classList.toggle('active')

            let selectedTool = item.getAttribute("data-tool");//obtiene nombre boton seleccionado
            paint.activeTool = selectedTool

            switch(selectedTool){
                case TOOL_LINE:
                case TOOL_RECTANGLE:
                case TOOL_CIRCLE:
                case TOOL_TRIANGLE:
                case TOOL_PENCIL:
                case TOOL_CIRCLE_PARAM:
                case TOOL_SQUARE_PARAM:
                case TOOL_TRIANGLE_PARAM:
                    //activar el selector de grosor para shapes
                    document.querySelector(".for-shapes").style.display = "block";
                    //invisible shape para brush
                    document.querySelector(".for-brush").style.display = "none";
                    break;
                case TOOL_BRUSH:
                case TOOL_ERASER:
                    //activar grososres brush
                    document.querySelector(".for-brush").style.display = "block";
                    //invisible shape para pencil
                    document.querySelector(".for-shapes").style.display = "none";
                    break;
                default:
                    document.querySelector(".for-brush").style.display = "none";
                    document.querySelector(".for-shapes").style.display = "none";
            }
        });        
    }
);

/** Selectores de grueso en lapiz */
document.querySelectorAll("[data-line-width]").forEach(
    item => {
        item.addEventListener("click", e => {//cuando hago click cambio propiedad entre ellos
            document.querySelector("[data-line-width].active").classList.toggle("active");
            item.classList.toggle('active');

            let linewidth = item.getAttribute('data-line-width');
            paint.lineWidth = linewidth; //asigno tamaño de brocha seleccionado
        });
    }
);

/** Selectores de grueso en brochitas */
document.querySelectorAll("[data-brush-width]").forEach(
    item => {
        item.addEventListener("click", e => {//cuando hago click cambio propiedad entre ellos
            document.querySelector("[data-brush-width].active").classList.toggle("active");
            item.classList.toggle('active');
            
            let brushSize = item.getAttribute('data-brush-width');
            paint.brushSize = brushSize; //asigno tamaño de brocha seleccionado
        });
    }
);

/** Selector de colores */
document.querySelectorAll("[data-color]").forEach(
    item => {
        item.addEventListener("click", e => {//cuando hago click cambio propiedad entre ellos
            document.querySelector("[data-color].active").classList.toggle("active");
            item.classList.toggle('active');

            let color = item.getAttribute("data-color");
            paint.selectedColor = color;
        });
    }
);