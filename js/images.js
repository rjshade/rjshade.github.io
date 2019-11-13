// Static array of images to display (frontpage and photos page).
var images = [
  ["Aiguilles Rouge", "aiguilles_rouge.jpg"],
  ["Aple dHuez", "alpe_dhuez.jpg"],
  ["Boston Back Bay", "boston_back_bay.jpg"],
  ["Boston skyline", "boston_skyline.jpg"],
  ["Boston",  "boston_prudential.jpg"],
  ["Bryce Canyon", "bryce_canyon.jpg"],
  ["Col dIzoard", "col_dizoard_france.jpg"],
  ["Col du Galibier", "bike.jpg"],
  ["Fan Pier, Boston", "boston_fan_pier.jpg"],
  ["Fiacaill Ridge",  "fiacaill_ridge.jpg"],
  ["Frenchman Bay", "frenchman_bay.jpg"],
  ["Grand Teton",  "grand_teton.jpg"],
  ["MIT Stata Center", "mit_stata_center.jpg"],
  ["Mad River",  "mad_river.jpg"],
  ["Mesa Arch", "mesa_arch.jpg"],
  ["Monument Valley, AZ", "monument_valley.jpg"],
  ["San Francisco",  "san_francisco.jpg"],
  ["Sgurr Alasdair, Skye", "skye.jpg"],
  ["Shafer Trail, Utah", "shafer_trail_utah.jpg"],
  ["Washington DC",  "washington_dc.jpg"],
  ["Yosemite El Capitan", "yosemite_el_capitan.jpg"],
  ["Yosemite Valley",  "yosemite_valley.jpg"],
  ["Zakim Bridge, Boston", "boston_zakim_bridge.jpg"],
  ["Zakim Bridge, Boston", "boston_zakim_night.jpg"],
]

function getRandomImage(num) {
  return images[Math.floor(Math.random() * images.length)];
}

function getImages(num) {
  if(typeof(num)==='undefined') num = images.length;
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
         "' width='100%' height='auto' srcset='" +
         image_path + " 1x, " +
         image_path_retina + " 2x' />"
}
