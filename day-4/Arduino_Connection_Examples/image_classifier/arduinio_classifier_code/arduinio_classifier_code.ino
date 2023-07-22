int ledPin1 = 2;
int ledPin2 = 3;

void setup() {
  pinMode(ledPin1, OUTPUT);  // sets the pin as output
  pinMode(ledPin2, OUTPUT);

  digitalWrite(ledPin1, HIGH);
  digitalWrite(ledPin2, HIGH);
  
  Serial.begin(9600);           // initialize serial communications
}

void loop() {
  if (Serial.available() > 0) { // if there's serial data available
    int inByte = Serial.read();   // read it
    Serial.println(inByte);
    if (inByte == 1) {
      digitalWrite(ledPin1, HIGH);
      digitalWrite(ledPin2, LOW);
    }else if (inByte == 2) {
      digitalWrite(ledPin2, HIGH);
      digitalWrite(ledPin1, LOW);
    } else {
      // Turn off all LEDs
      digitalWrite(ledPin1, LOW);
      digitalWrite(ledPin2, LOW);
    }
  }
}
