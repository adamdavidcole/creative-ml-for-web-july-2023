# ML For Live Performance

## Prerequisites
1. Follow the install instructions for (p5.serialserver)[https://github.com/p5-serial/p5.serialserver]

## Connecting to Arduino: Classification Example
1. Start the p5.serialserver using `node startserver.js` within the p5.serialserver directory
2. Setup a circuit like the image above
3. Upload (Arduino code)[/ardunio-sketches/image_classifier/arduinio_classifier_code/arduino_classifier_code] to the Arduino board
4. Run (p5 code)[/ardunio-sketches/image_classifier/] locally (Remember to update the portName and model URL if you'd like)