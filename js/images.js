// Static array of images to display (frontpage and photos page).

var base = "/images/frontpage/"
var gplus_base = "https://plus.google.com/+RobbieShade/"
var images = [
  ["Aiguilles Rouge", base + "aiguilles_rouge.jpg", gplus_base + "albums/5785516691853869217"], 
  ["Aple dHuez", base + "alpe_dhuez.jpg", gplus_base + "albums/5785858093338279217"], 
  ["Col du Galibier", base + "bike.jpg", gplus_base + "albums/5785858093338279217"], 
  ["Boston Back Bay", base + "boston_back_bay.jpg", gplus_base + "posts/HsKrxKuq1WZ?pid=5932588039618092274&oid=118222038073834017046"], 
  ["Fan Pier, Boston", base + "boston_fan_pier.jpg", gplus_base + "posts/iWZot4AwyUs?pid=5925872377682641010&oid=118222038073834017046"], 
  ["Boston skyline", base + "boston_skyline.jpg", gplus_base + "posts/Aj3bgRhXyLQ?pid=6004201149236014386&oid=118222038073834017046"], 
  ["Zakim Bridge, Boston", base + "boston_zakim_bridge.jpg", gplus_base + "posts/Nz7gUcYvSXi?pid=5891731564861842274&oid=118222038073834017046"], 
  ["Zakim Bridge, Boston", base + "boston_zakim_night.jpg", gplus_base +"posts/S3QsGeqgXxW?pid=5893620655464308818&oid=118222038073834017046"], 
  ["Col dIzoard", base + "col_dizoard_france.jpg", gplus_base + "albums/5785858093338279217"], 
  ["MIT Stata Center", base + "mit_stata_center.jpg", gplus_base + "posts/3FHgZ4X1XjW?pid=5909206520973176162&oid=118222038073834017046"], 
  ["Monument Valley, AZ", base + "monument_valley.jpg", gplus_base + "posts/9BR8cAHhv8X?pid=5997215010064913362&oid=118222038073834017046"], 
  ["Shafer Trail, Utah", base + "shafer_trail_utah.jpg", gplus_base + "posts/K46q1fNGMCs?pid=6077276840911514354&oid=118222038073834017046"], 
  ["Sgurr Alasdair, Skye", base + "skye.jpg", gplus_base + "albums/5787668202279958065/5787669767043417090?pid=5787669767043417090&oid=118222038073834017046"], 
  ["Yosemite Valley", base + "yosemite_valley.jpg", gplus_base + "posts/9BR8cAHhv8X?pid=5997215010064913362&oid=118222038073834017046"], 
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

function getImageHTML(image, imW, imH) {
  if(typeof(imW)==='undefined') imW = '800px';
  if(typeof(imH)==='undefined') imH = '500px';
  return "<img alt='" + image[0] + "' src ='" + image[1] + "' width='" + imW + "' height='" + imH + "' />"
}
