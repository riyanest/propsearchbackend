const PANOLENS = require("panolens");
      
const viewer = new PANOLENS.Viewer({
    container: document.querySelector('#viewer'),
  });

  let panorama = new PANOLENS.ImagePanorama('https://cdn.glitch.global/425409e4-e86e-4938-96ff-5daaa5649a5e/photo-1592761944705-40d554de7b11.jpg?v=1681034752799');
  viewer.add(panorama);


  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    viewer.enableControl(PANOLENS.CONTROLS.DEVICEORIENTATION);