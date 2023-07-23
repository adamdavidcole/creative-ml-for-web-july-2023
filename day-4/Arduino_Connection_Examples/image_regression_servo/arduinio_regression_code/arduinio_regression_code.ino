#include <Servo.h>

Servo myservo;  // create servo object to control a servo

int potpin = A0;  // analog pin used to connect the potentiometer
int val;    // variable to read the value from the analog pin

void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
  
  Serial.begin(9600);           // initialize serial communications
}

void loop() {
  if (Serial.available() > 0) {   // if there's serial data available
    int inByte = Serial.read();   // read it
    myservo.write(inByte);        // sets the servo position according to the scaled value
  }
}
