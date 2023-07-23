// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Creating a regression extracting features of MobileNet. Build with p5js.
=== */

let featureExtractor;
let regressor;
let video;
let loss;
let slider;
let samples = 0;
let positionX = 140;

let osc, playing, freq, amp;

// 🚨 IMPORTANT fill in your serial port name here
let portName = "/dev/cu.usbmodem11201";
let serial; // variable to hold an instance of the serialport library
let outByte = 0; // for.usbming data

function setup() {
  createCanvas(340, 280);
  // Create a video element
  video = createCapture(VIDEO);
  // Append it to the videoContainer DOM element
  video.hide();
  // Extract the features from MobileNet
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);
  // Create a new regressor using those features and give the video we want to use
  regressor = featureExtractor.regression(video, videoReady);

  // set up audio oscillator
  osc = new p5.Oscillator("sine");

  // Open serial port
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on("error", serialError); // callback for errors
  console.log("serial", serial);
  serial.openPort(portName); // open a serial port

  // Create the UI buttons
  setupButtons();
}

function serialError(err) {
  console.log("Something went wrong with the serial port. " + err);
}

function draw() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, 340, 280);
  pop();

  noStroke();
  fill(255, 0, 0);
  rect(positionX, 120, 50, 50);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }
}

// A function to be called when the model has been loaded
function modelReady() {
  select("#modelStatus").html("Model loaded!");
}

// A function to be called when the video has loaded
function videoReady() {
  select("#videoStatus").html("Video ready!");
}

// Classify the current frame.
function predict() {
  regressor.predict(gotResults);
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function stopOscillator() {
  osc.stop();
  playing = false;
}

// A util function to create UI buttons
function setupButtons() {
  slider = select("#slider");
  // When the Dog button is pressed, add the current frame
  // from the video with a label of "dog" to the classifier
  select("#addSample").mousePressed(function () {
    regressor.addImage(slider.value());
    select("#amountOfSamples").html(samples++);
  });

  // Train Button
  select("#train").mousePressed(function () {
    regressor.train(function (lossValue) {
      if (lossValue) {
        loss = lossValue;
        select("#loss").html("Loss: " + loss);
      } else {
        select("#loss").html("Done Training! Final Loss: " + loss);

        select("#audioOptions").removeClass("hidden");
      }
    });
  });

  // Predict Button
  select("#buttonPredict").mousePressed(predict);

  select("#playAudio").mousePressed(playOscillator);
  select("#stopAudio").mousePressed(stopOscillator);
}

// Show the results
function gotResults(err, result) {
  if (err) {
    console.error(err);
  }
  if (result && result.value != undefined) {
    positionX = map(result.value, 0, 1, 0, width);
    slider.value(result.value);

    freq = map(result.value, 0, 1, 20, 2000);

    // write servo value out
    servoValue = round(map(result.value, 0, 1, 0, 180));
    serial.write(servoValue);

    predict();
  }
}
