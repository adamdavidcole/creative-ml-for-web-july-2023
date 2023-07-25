// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
KNN Classification on Webcam Images with Hand Pose. Built with p5.js
=== */
let video;
// Create a KNN classifier
const knnClassifier = ml5.KNNClassifier();
let handpose, predictions;

function setup() {
  createCanvas(640, 480);

  // Create a video element
  video = createCapture(VIDEO);

  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", (results) => {
    predictions = results;
  });

  video.hide();

  // Create the UI buttons
  createButtons();
}

function modelReady() {
  select("#status").html("HandPose Model Loaded");
}

function draw() {
  image(video, 0, 0, width, height);

  drawKeypoints();
}

function drawKeypoints() {
  if (!predictions) return;

  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}

// Add the current frame from the video to the classifier
function addExample(label) {
  if (!predictions || !predictions[0]) return;
  // Get the features of hand pose prediction
  const features = predictions[0].landmarks;
  // console.log("features", features);

  // Add an example with a label to the classifier
  knnClassifier.addExample(features, label);
  updateCounts();
}

// Predict the current frame.
function classify() {
  let features = [];
  if (predictions && predictions[0]) {
    // Get the hand pose features of the input video

    features = predictions[0].landmarks;
  } else {
    // if no predictions in screen, wait 100ms and try again
    setTimeout(classify, 100);
    return;
  }

  // Get the total number of labels from knnClassifier
  const numLabels = knnClassifier.getNumLabels();
  if (numLabels <= 0) {
    console.error("There is no examples in any label");
    return;
  }

  // Use knnClassifier to classify which label do these features belong to
  // You can pass in a callback function `gotResults` to knnClassifier.classify function
  knnClassifier.classify(features, gotResults);
  // You can also pass in an optional K value, K default to 3
  // knnClassifier.classify(features, 3, gotResults);

  // You can also use the following async/await function to call knnClassifier.classify
  // Remember to add `async` before `function predictClass()`
  // const res = await knnClassifier.classify(features);
  // gotResults(null, res);
}

// A util function to create UI buttons
function createButtons() {
  // When the A button is pressed, add the current frame
  // from the video with a label of "rock" to the classifier
  buttonA = select("#addClassRock");
  buttonA.mousePressed(function () {
    addExample("Rock");
  });

  // When the B button is pressed, add the current frame
  // from the video with a label of "paper" to the classifier
  buttonB = select("#addClassPaper");
  buttonB.mousePressed(function () {
    addExample("Paper");
  });

  // When the C button is pressed, add the current frame
  // from the video with a label of "scissor" to the classifier
  buttonC = select("#addClassScissor");
  buttonC.mousePressed(function () {
    addExample("Scissor");
  });

  // Reset buttons
  resetBtnA = select("#resetRock");
  resetBtnA.mousePressed(function () {
    clearLabel("Rock");
  });

  resetBtnB = select("#resetPaper");
  resetBtnB.mousePressed(function () {
    clearLabel("Paper");
  });

  resetBtnC = select("#resetScissor");
  resetBtnC.mousePressed(function () {
    clearLabel("Scissor");
  });

  // Predict button
  buttonPredict = select("#buttonPredict");
  buttonPredict.mousePressed(classify);

  // Clear all classes button
  buttonClearAll = select("#clearAll");
  buttonClearAll.mousePressed(clearAllLabels);

  // Get classifier dataset
  buttonGetData = select("#save");
  buttonGetData.mousePressed(saveMyKNN);
}

// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }

  if (result.confidencesByLabel) {
    const confidences = result.confidencesByLabel;
    // result.label is the label that has the highest confidence
    if (result.label) {
      select("#result").html(result.label);
      select("#confidence").html(`${confidences[result.label] * 100} %`);
    }

    select("#confidenceRock").html(
      `${confidences["Rock"] ? confidences["Rock"] * 100 : 0} %`
    );
    select("#confidencePaper").html(
      `${confidences["Paper"] ? confidences["Paper"] * 100 : 0} %`
    );
    select("#confidenceScissor").html(
      `${confidences["Scissor"] ? confidences["Scissor"] * 100 : 0} %`
    );
  }

  classify();
}

// Update the example count for each label
function updateCounts() {
  const counts = knnClassifier.getCountByLabel();

  select("#exampleRock").html(counts["Rock"] || 0);
  select("#examplePaper").html(counts["Paper"] || 0);
  select("#exampleScissor").html(counts["Scissor"] || 0);
}

// Clear the examples in one label
function clearLabel(label) {
  knnClassifier.clearLabel(label);
  updateCounts();
}

// Clear all the examples in all labels
function clearAllLabels() {
  knnClassifier.clearAllLabels();
  updateCounts();
}

// Save dataset as myKNNDataset.json
function saveMyKNN() {
  knnClassifier.save("myKNNDataset");
}

// Load dataset to the classifier
function loadMyKNN() {
  knnClassifier.load("./myKNNDataset.json", updateCounts);
}
