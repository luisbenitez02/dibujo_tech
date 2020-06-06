/*Si el tamaño de la ventana se reajusta, automaticamente se reajustan
los valores del lienzo*/
var canvas = document.querySelector('canvas');

/*window.onresize = function(event) {
  var canvas = document.querySelector('canvas');
  fitToContainer(canvas);
};*/

fitToContainer(canvas);

function fitToContainer(canvas){
  // Make it visually fill the positioned parent
  canvas.style.width ='100%';
  canvas.style.height='100%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}