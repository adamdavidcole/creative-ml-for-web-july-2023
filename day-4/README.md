# ML For Live Performance

## Prerequisites
1. Follow the install instructions for (p5.serialserver)[https://github.com/p5-serial/p5.serialserver]

## Connecting to Arduino: Classification Example
![arduino classification setup](https://github.com/adamdavidcole/creative-ml-for-web-july-2023/blob/main/day-4/images/arduino_classification_setup_1.jpg?raw=true)
1. From the command line, navigate to the downloaded p5.serialserver directory and run `node startserver.js`
2. Setup a circuit like the image above: Pin 2 connected to a red LED, pin 3 connected to a green LED.
3. Upload [Arduino code](https://github.com/adamdavidcole/creative-ml-for-web-july-2023/blob/main/day-4/Arduino_Connection_Examples/image_classifier/arduinio_classifier_code/arduinio_classifier_code.ino) to the Arduino board
4. Run [p5 code](https://github.com/adamdavidcole/creative-ml-for-web-july-2023/tree/main/day-4/Arduino_Connection_Examples/image_classifier) locally (Remember to update the portName and model URL if you'd like)

When you show a fist ✊ in the camera, the red LED should light up, when you show a flat hand ✋ the green LED should light up.


## Connecting to Arduino: Regression Example
1. From the command line, navigate to the downloaded p5.serialserver directory and run `node startserver.js`
2. Setup a circuit that has a servo connected to power, ground, and the control pin attached to Pin #9
3. 3. Upload [Arduino code](https://github.com/adamdavidcole/creative-ml-for-web-july-2023/blob/main/day-4/Arduino_Connection_Examples/image_regression_servo/arduinio_regression_code/arduinio_regression_code.ino) to the Arduino board
4. Run [p5 code](https://github.com/adamdavidcole/creative-ml-for-web-july-2023/tree/main/day-4/Arduino_Connection_Examples/image_regression_servo) locally (Remember to update the portName and model URL if you'd like)

## Troubleshooting:
1. The order things are turned on matters. If something isn't working, repload the sketch, then start the p5.serialservar and then reload the webpage with your p5.js script.
2. Double check that your circuit is correctly set up. Test controlling it without the p5.js sketch.
3. Check your p5.js for any console errors that could be breaking your program.
