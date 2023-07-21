const myImageModelURL = 'https://teachablemachine.withgoogle.com/models/Sga1Yzuzx/model.json';
let myImageModel;
let video;
let resultDiv;
let label;

function preload() {
  video = createCapture(VIDEO);
  myImageModel = ml5.imageClassifier(myImageModelURL);
}

function setup() {
  myImageModel.classify(video, gotResults);
  resultDiv = createElement('h1',  '...');
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    // console.log(results);
    label = results[0].label;
    resultDiv.html('Result is: ' + label);
    myImageModel.classify(video, gotResults);
  }
}
