// Static array of images to display (frontpage and photos page).
var images = [
  ["Aiguilles Rouge", "aiguilles_rouge.jpg"],
  ["Aple dHuez", "alpe_dhuez.jpg"],
  ["Col du Galibier", "bike.jpg"],
  ["Boston Back Bay", "boston_back_bay.jpg"],
  ["Fan Pier, Boston", "boston_fan_pier.jpg"],
  ["Boston skyline", "boston_skyline.jpg"],
  ["Zakim Bridge, Boston", "boston_zakim_bridge.jpg"],
  ["Zakim Bridge, Boston", "boston_zakim_night.jpg"],
  ["Col dIzoard", "col_dizoard_france.jpg"],
  ["MIT Stata Center", "mit_stata_center.jpg"],
  ["Monument Valley, AZ", "monument_valley.jpg"],
  ["Shafer Trail, Utah", "shafer_trail_utah.jpg"],
  ["Sgurr Alasdair, Skye", "skye.jpg"],
  ["Yosemite Valley",  "yosemite_valley.jpg"],
]

// Fisher-Yates shuffle
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getRandomImages(num) {
  if(typeof(num)==='undefined') num = 1;
  return shuffle(images).slice(0, num);
}

function getImages(num) {
  if(typeof(num)==='undefined') num = 1;
  return images.slice(0, num);
}

function getImageHTML(image, imW, imH, extra_path) {
  // An example |extra_path| may be "thumbs/"
  if(typeof(extra_path)==='undefined') extra_path = '';

  var base = "/images/photos/"
  var retina_base = "/images/photos/retina/"

  var image_path = base + extra_path + image[1]
  var image_path_retina = retina_base + extra_path + image[1]
  return "<img alt='" + image[0] + "' src ='" + image_path +
         "' width='" + imW + "' height='" + imH +
         "' srcset='" + image_path + " 1x, " +
         image_path_retina + " 2x' />"
}
