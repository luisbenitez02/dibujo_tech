import Point from './point.model.js'

export function getMouseCoordsOnCanvas(e,canvas){
    let rect = canvas.getBoundingClientRect();
    let x = Math.round(e.clientX - rect.left);
    let y = Math.round(e.clientY - rect.top);
    return new Point(x,y); //{x:x,y:y}
}

//Usada para la herramienta circulo
// Formula de la distancia: https://www.purplemath.com/modules/distform.htm
export function encontrarDistancia(cordenada1,cordenada2){//vienes desde paint.class.js
    let exp1 = Math.pow(cordenada1.x - cordenada2.x,2);//expresion 1 en x
    let exp2 = Math.pow(cordenada1.y - cordenada2.y,2);//expresion 2 en y

    let distancia = Math.sqrt(exp1 + exp2);

    return distancia
}