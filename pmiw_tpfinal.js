let anchoPantalla = 640;
let altoPantalla = 480;
let tamanoFuente = 16;
let actualPantalla;
let textos = [];
let actiones = [];
let imagenes = [];
let buttons = [];
let sonidos = [];
let pantallas = {};
let isPlayingBackground = false;

/*
  Tamaños obtenidos por prueba y error, utilizando el tamaño de la pantalla 
  y el tamaño de la fuente para ajustarse de la mejor manera posible 
  si se cambian estos valores. 
*/
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
  let rutasSonidos = [
    "assets/sound/garden-sunny-day.mp3",
    "assets/sound/intro.mp3",
    "assets/sound/swoosh-1.mp3",
    "assets/sound/swoosh-2.mp3",
  ];

  // precargar textos
  textos = loadStrings("/assets/textos.txt");
  actiones = loadStrings("/assets/actiones.txt");
  buttons = loadStrings("/assets/buttons.txt");

  // precargar imágenes
  for (let i = 1; i <= 20; i++) {
    imagenes.push(loadImage(`/assets/img2/${i}.png`));
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

  actualPantalla = "pantalla_1";

  pantallas["initio"] = "";
  pantallas["credito"] = "";

  for (let i = 0; i < 20; i++) {
    console.log(i);

    pantallas["pantalla_" + (i + 1)] = {
      image: imagenes[i],
      texto: textos[i],
      buttons: buttons[i].split("|"),
      actiones: actiones[i].split("|"),
    };
  }
}

function draw() {
  background(200);

  if (actualPantalla === "inicio") {
    dibujarInicio();
  }
  if (actualPantalla === "creditos") {
    dibujarCreditos();
  } else {
    dibujarFlujo(
      pantallas[actualPantalla]["image"],
      pantallas[actualPantalla]["texto"],
      pantallas[actualPantalla]["buttons"][0],
      pantallas[actualPantalla]["buttons"][1]
    );
  }
}

function dibujarFlujo(img, texto, button1, button2) {
  // imágenes
  if (img) {
    image(img, 0, 0, anchoPantalla, altoPantalla); // necesito 20 imágenes
  }

  // texto principal / primera linea (cuadro de texto en la parte superior)
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
    texto,
    textoPrincipal.posicionX,
    textoPrincipal.posicionY,
    textoPrincipal.ancho,
    textoPrincipal.alto
  );

  // opción 1 / segunda linea (boton a la izquierda)
  if (button1) {
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
      button1,
      botonDerecho.posicionX,
      botonDerecho.posicionY,
      botonDerecho.ancho,
      botonDerecho.alto
    );
  }

  // opción 2 / tercera linea (boton a la derecha)
  if (button2) {
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
      button2,
      botonIzquierdo.posicionX,
      botonIzquierdo.posicionY,
      botonIzquierdo.ancho,
      botonIzquierdo.alto
    );
  }

  // para ayudarle a orientarse, texto en la parte superior izquierda de la pantalla
  fill(255);
  text(`rama : ${actualPantalla}`, 100, tamanoFuente);
}

function mousePressed() {
  if (!isPlayingBackground) {
    sonidos[0].play();
    isPlayingBackground = true;
  }

  let actionDerecho = pantallas[actualPantalla]["actiones"][0];
  let actionIzquierdo = pantallas[actualPantalla]["actiones"][1];

  // verificar si está en el botón izquierdo
  if (
    mouseX > botonDerecho.posicionX &&
    mouseX < botonDerecho.posicionX + botonDerecho.ancho &&
    mouseY > botonDerecho.posicionY &&
    mouseY < botonDerecho.posicionY + botonDerecho.alto &&
    actionDerecho
  ) {
    console.log("go to", actionDerecho);
    sonidos[3].play();

    actualPantalla = actionDerecho;
  }

  // verificar si está en el botón derecho
  if (
    mouseX > botonIzquierdo.posicionX &&
    mouseX < botonIzquierdo.posicionX + botonIzquierdo.ancho &&
    mouseY > botonIzquierdo.posicionY &&
    mouseY < botonIzquierdo.posicionY + botonIzquierdo.alto &&
    actionIzquierdo
  ) {
    console.log("go to", actionIzquierdo);

    sonidos[2].play();
    actualPantalla = actionIzquierdo;
  }
}

function dibujarCreditos() {
  text("Créditos", 0, tamanoFuente);
}

function dibujarInicio() {
  text("Inicio", 0, tamanoFuente);
}
