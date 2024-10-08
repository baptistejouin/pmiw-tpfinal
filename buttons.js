function createNewButton(textContent, position, width, height, callback) {
  buttons.push({
    text: textContent,
    x: position.x,
    y: position.y,
    w: width,
    h: height,
    callback,
  });
}

function handleButtonClick() {
  buttons.forEach((button) => {
    if (
      mouseX > button.x &&
      mouseX < button.x + button.w + margin &&
      mouseY > button.y &&
      mouseY < button.y + button.h + margin
    ) {
      button.callback();
    }
  });
}

function handleCursorChange() {
  let cursorChanged = false;
  buttons.forEach((button) => {
    if (
      mouseX > button.x &&
      mouseX < button.x + button.w + margin &&
      mouseY > button.y &&
      mouseY < button.y + button.h + margin
    ) {
      cursor("pointer");
      cursorChanged = true;
    }
  });
  if (!cursorChanged) {
    cursor("default");
  }
}
