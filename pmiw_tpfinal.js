let canvasWidth = 800;
let canvasHeight = 400;
let fontSize = canvasHeight * 0.045;
let margin = fontSize / 2;
let currentDialog = 0;
let numSteps = 11;
let strings;
let images = [];
let buttons = [];
let textboxes = [];

function preload() {
  strings = loadStrings("./assets/strings.txt");
  for (let i = 1; i <= numSteps; i++) {
    images.push(loadImage(`./assets/img/${i.toString().padStart(2, "0")}.png`));
  }
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  createNewButton("before", { x: 200, y: 350 }, 100, 25, () => {
    if (currentDialog != 0) {
      currentDialog--;
    }
  });
  createNewButton("next", { x: 350, y: 350 }, 100, 25, () => {
    if (currentDialog + 1 < numSteps) {
      currentDialog++;
      return;
    }
    currentDialog = 0;
  });
  createNewTextbox("", { x: 200, y: 300 }, 350, 50);
}

function draw() {
  background(200);
  cursor("default");
  textSize(fontSize);

  image(images[currentDialog], 125, 10, 540, 360);

  drawBoxes();
  updateCursor();

  textboxes[0].text = strings[currentDialog];
}

function mousePressed() {
  handleButtonClick();
}

function updateCursor() {
  handleCursorChange();
}
