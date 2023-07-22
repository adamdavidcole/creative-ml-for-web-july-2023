# ML For Live Performance

## Prerequisites
1. Follow the install instructions for (p5.serialserver)[https://github.com/p5-serial/p5.serialserver]

## Connecting to Arduino: Classification Example
![arduino classification setup](https://github.com/adamdavidcole/creative-ml-for-web-july-2023/blob/main/day-4/images/arduino_classification_setup_1.jpg?raw=true)
1. From the command line, navigate to the downloaded p5.serialserver directory and run `node startserver.js`
2. Setup a circuit like the image above: Pin 2 connected to a red LED, pin 3 connected to a green LED.
3. Upload [Arduino code](https://github.com/adamdavidcole/creative-ml-for-web-july-2023/tree/main/day-4/Arduino_Connection_Examples/image_classifier/arduinio_classifier_code) to the Arduino board
4. Run [p5 code](https://github.com/adamdavidcole/creative-ml-for-web-july-2023/tree/main/day-4/Arduino_Connection_Examples/image_classifier) locally (Remember to update the portName and model URL if you'd like)

When you show a fist ✊ in the camera, the red LED should light up, when you show a flat hand ✋ the green LED should light up.

Troubleshooting:
Keep in mind the order things are turned on matters. Ensure you upload the sketch, then start the p5.serialservar and then load the webpage with your p5.js script