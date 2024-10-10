let anchoPantalla = 640;
let altoPantalla = 480;
let tamanoFuente = 16;
let pantalla;
let rama;
let textos = [];
let imagenes = [];
let sonidos = [];
let rutasSonidos = [];
let rutasImagenes = [
  "/assets/img/01.png",
  "/assets/img/02.png",
  "/assets/img/03.png",
  "/assets/img/04.png",
  "/assets/img/05.png",
  "/assets/img/06.png",
  "/assets/img/07.png",
  "/assets/img/08.png",
  "/assets/img/09.png",
  "/assets/img/10.png",
  "/assets/img/11.png",
];

let mitadAnchoPantalla = anchoPantalla / 2;
let anchoBoton = mitadAnchoPantalla - 75;
let posicionYBoton = altoPantalla - tamanoFuente * 3.5;
let altoTexto = tamanoFuente * 4;
let altoBoton = tamanoFuente * 3;

let textoPrincipal = {
  posicionX: 50,
  posicionY: altoPantalla - tamanoFuente * 8,
  ancho: anchoPantalla - 100,
  alto: altoTexto,
};

let botonIzquierdo = {
  posicionX: 70,
  posicionY: posicionYBoton,
  ancho: anchoBoton,
  alto: altoBoton,
};

let botonDerecho = {
  posicionX: anchoPantalla - anchoBoton - 70,
  posicionY: posicionYBoton,
  ancho: anchoBoton,
  alto: altoBoton,
};

function preload() {
  // precargar textos
  textos = loadStrings("./assets/textos.txt");

  // precargar imágenes
  for (let i = 0; i < rutasImagenes.length; i++) {
    imagenes.push(loadImage(rutasImagenes[i]));
  }

  // precargar sonidos
  soundFormats("mp3");
  for (let i = 0; i < rutasSonidos.length; i++) {
    sonidos.push(loadSound(rutasSonidos[i]));
  }
}

function setup() {
  createCanvas(anchoPantalla, altoPantalla);
  textSize(tamanoFuente);
  textAlign(CENTER, CENTER);
  noStroke();

  pantalla = "flujo"; // hay 3 pantallas: inicio, creditos, flujo
  rama = 0; // cada 3 líneas, hay un nuevo texto principal, una línea para la primera opción y otra para la segunda
}

function draw() {
  background(200);

  if (pantalla === "inicio") {
    dibujarInicio();
  }
  if (pantalla === "creditos") {
    dibujarCreditos();
  }
  if (pantalla === "flujo") {
    dibujarFlujo();
  }
}

function mousePressed() {
  // verificar si está en el botón izquierdo
  if (
    mouseX > botonIzquierdo.posicionX &&
    mouseX < botonIzquierdo.posicionX + botonIzquierdo.ancho &&
    mouseY > botonIzquierdo.posicionY &&
    mouseY < botonIzquierdo.posicionY + botonIzquierdo.alto &&
    textos[rama + 1] !== ""
  ) {
    /* 
      Extrae los 2 primeros caracteres de la línea correspondiente a la opción 
      (estos caracteres representan el número de línea de la siguiente rama). 
      Luego, convierte esos caracteres en un número utilizando parseInt 
      (ya que inicialmente son de tipo texto). 

      Después, resta 1 para obtener el índice correcto dentro del array de textos. 
      Podríamos empezar desde 0 para evitar esta resta, pero en la visualización 
      de Processing la numeración de las líneas comienza en 1, lo que hace que sea 
      más fácil ubicarse al crear el árbol en textos.txt.
    */
    rama = parseInt(textos[rama + 1].slice(0, 2)) - 1;
  }

  // verificar si está en el botón derecho
  if (
    mouseX > botonDerecho.posicionX &&
    mouseX < botonDerecho.posicionX + botonDerecho.ancho &&
    mouseY > botonDerecho.posicionY &&
    mouseY < botonDerecho.posicionY + botonDerecho.alto &&
    textos[rama + 2] !== ""
  ) {
    rama = parseInt(textos[rama + 2].slice(0, 2)) - 1;
  }
}

function dibujarFlujo() {
  // imágenes
  /*
    Muestra una imagen del array 'imagenes' correspondiente a la rama actual. 
    Divide el número de la rama por 3 porque cada imagen está asociada 
    a un conjunto de 3 líneas de texto. 
  */
  // image(imagenes[rama / 3], 0, 0, anchoPantalla, altoPantalla); // necesito 20 imágenes

  // texto principal
  fill("rgba(0, 0, 0, 0.35)");
  rect(
    textoPrincipal.posicionX,
    textoPrincipal.posicionY,
    textoPrincipal.ancho,
    textoPrincipal.alto,
    2
  );
  
  fill(255);
  text(
    textos[rama],
    textoPrincipal.posicionX,
    textoPrincipal.posicionY,
    textoPrincipal.ancho,
    textoPrincipal.alto
  );

  // opción 1 (izquierda)
  if (textos[rama + 1] !== "") {
    fill("rgba(0, 0, 0, 0.35)");
    rect(
      botonIzquierdo.posicionX,
      botonIzquierdo.posicionY,
      botonIzquierdo.ancho,
      botonIzquierdo.alto,
      2
    );
    
    fill(255);
    text(
      textos[rama + 1].slice(2),
      botonIzquierdo.posicionX,
      botonIzquierdo.posicionY,
      botonIzquierdo.ancho,
      botonIzquierdo.alto
    );
  }

  // opción 2 (derecha)
  if (textos[rama + 2] !== "") {
    fill("rgba(0, 0, 0, 0.35)");
    rect(
      botonDerecho.posicionX,
      botonDerecho.posicionY,
      botonDerecho.ancho,
      botonDerecho.alto,
      2
    );
    fill(255);
    text(
      /*
        Extrae el texto desde el tercer carácter de la línea correspondiente 
        a la segunda opción de la rama actual. Los dos primeros caracteres 
        representan el número de línea de la siguiente rama, por lo que se omiten, 
        dejando solo el texto de la opción en sí. 
      */
      textos[rama + 2].slice(2),
      botonDerecho.posicionX,
      botonDerecho.posicionY,
      botonDerecho.ancho,
      botonDerecho.alto
    );
  }

  // debug
  fill(255);
  text(`rama línea : ${rama + 1} | imagen: ${rama / 3}`, 10, tamanoFuente);
}

function dibujarCreditos() {
  text("Créditos", 0, tamanoFuente);
}

function dibujarInicio() {
  text("Inicio", 0, tamanoFuente);
}
