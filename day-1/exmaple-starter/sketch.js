let myClassifier;
let catImg;
let result;

function preload() {
  myClassifier = ml5.imageClassifier("MobileNet");
  catImg = loadImage("cat.jpg");
}

function setup() {
  createCanvas(400, 400);
  console.log("ml5 version:", ml5.version);
  myClassifier.classify(catImg, gotResults);
}

function draw() {
  ellipse(56, 46, 55, 55);
  image(catImg, 0, 0, width, height);

  if (result)
}

function gotResults(error, results) {
  // an array of objects with “label” and “confidence”
  // [ { label: ‘cat’, confidence: 0.74 } ]
  console.log(results);
}
