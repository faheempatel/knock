
int led = 0;
int inFlat;
int buttonPin = 1;
byte x = 99;

void setup() {                
  // initialize the digital pin as an output.
  pinMode(led, OUTPUT); 
  Serial.begin(9600);  
  pinMode(buttonPin, INPUT);
}

void loop() {
  checkCall();
}

void checkCall(){
  if(Serial.available()>0){
    int incomingCheck = Serial.read();
    if(incomingCheck == 'Y'){
      doorbellRing();
    }
    else if (incomingCheck == 'N'){
      noRing();
    }
  }
}

void noRing(){
  digitalWrite(led, LOW); 
  delay(1000);               // wait for a second
}

void doorbellRing(){
  int buttontemp = LOW;
  while (buttontemp != HIGH){
    delay(10);//fix button bouncing issue
    int buttonRead = digitalRead(buttonPin);
    buttontemp = buttonRead;
    digitalWrite(led, HIGH);
    delay(100);         // wait for a second
    digitalWrite(led, LOW); 
    delay(100);               // wait for a second
    digitalWrite(led, HIGH);
    delay(100);         // wait for a second
    digitalWrite(led, LOW); 
    delay(100);               // wait for a second
    digitalWrite(led, HIGH);
    delay(100);         // wait for a second
    digitalWrite(led, LOW); 
    delay(100);               // wait for a second
    digitalWrite(led, HIGH);
    delay(100);         // wait for a second
    digitalWrite(led, LOW); 
    delay(100);               // wait for a second

    if(buttontemp != digitalRead(buttonPin)){
    //  Serial.println("Button Pressed mate");
      Serial.write(45);
      delay(1000);
    //  Serial.println("Door has been answered");
      digitalWrite(buttonPin, LOW);
      buttontemp = LOW;
      break;
    }
    break;
  }

}

