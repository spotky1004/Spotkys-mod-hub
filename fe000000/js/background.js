function bgUpdate() {
  canvas = document.querySelector('#canvas');
  c = canvas.getContext('2d');

  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
