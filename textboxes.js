function createNewTextbox(textContent, position, width, height) {
  textboxes.push({
    text: textContent,
    x: position.x,
    y: position.y,
    w: width,
    h: height,
  });
}

function drawBoxes() {
  [...textboxes, ...buttons].forEach((item) => {
    fill(255, 255, 255);
    rect(item.x, item.y, item.w + margin, item.h + margin);
    fill(0);
    text(item.text, item.x + margin, item.y + margin, item.w, item.h);
  });
}
