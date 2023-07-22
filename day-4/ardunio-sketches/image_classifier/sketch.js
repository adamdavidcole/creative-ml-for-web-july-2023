/**
 * This model detects a hand thats either a fist or flat
 */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/skrvGuQev/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// 🚨 IMPORTANT fill in your serial port name here
let portName = "/dev/cu.usbmodem11201";
let serial; // variable to hold an instance of the serialport library
let outByte = 0; // for.usbming data

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  // Open serial port
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on("error", serialError); // callback for errors
  console.log("serial", serial);
  serial.openPort(portName); // open a serial port

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function serialError(err) {
  console.log("Something went wrong with the serial port. " + err);
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;

  if (label === "Class 1") {
    outByte = 1;
  } else if (label === "Class 2") {
    outByte = 2;
  }

  serial.write(outByte);

  // Classifiy again!
  classifyVideo();
}
