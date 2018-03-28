/*************************************************************
  Download latest Blynk library here:
    https://github.com/blynkkk/blynk-library/releases/latest

  Blynk is a platform with iOS and Android apps to control
  Arduino, Raspberry Pi and the likes over the Internet.
  You can easily build graphic interfaces for all your
  projects by simply dragging and dropping widgets.

    Downloads, docs, tutorials: http://www.blynk.cc
    Sketch generator:           http://examples.blynk.cc
    Blynk community:            http://community.blynk.cc
    Follow us:                  http://www.fb.com/blynkapp
                                http://twitter.com/blynk_app

  Blynk library is licensed under MIT license
  This example code is in public domain.

 *************************************************************
  This example runs directly on ESP8266 chip.

  Note: This requires ESP8266 support package:
    https://github.com/esp8266/Arduino

  Please be sure to select the right ESP8266 module
  in the Tools -> Board menu!

  Change WiFi ssid, pass, and Blynk auth token to run :)
  Feel free to apply it to any other example. It's simple!
 *************************************************************/

/* Comment this out to disable prints and save space */
#define BLYNK_PRINT Serial


#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include <Stepper.h>


const int stepsPerRevolution = 200;
const int inputPin = 16;
const int servoPin = 12;

Stepper myStepper(stepsPerRevolution, 15, 12, 13, 4);

int stepCount = 0;
int dirStep = 1;

// You should get Auth Token in the Blynk App.
// Go to the Project Settings (nut icon).
char auth[] = "bff269d14a824b6e8e4283478e2e9d1e";

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "Class-2018";
char pass[] = "jun1orsmayh3m";

void setup()
{
  // Debug console
  Serial.begin(9600);

  pinMode(inputPin, INPUT);
  //pinMode(servoPin, OUTPUT);
  
  Blynk.begin(auth, ssid, pass);
}

void loop()
{
  Blynk.run();
  if (digitalRead(inputPin)) {
    //digitalWrite(servoPin, HIGH);
    myStepper.step(dirStep);
    Serial.print("steps:");
    Serial.println(stepCount);
    stepCount++;
    if( stepCount > 500){
      stepCount = 0;
      if( dirStep == 1) dirStep = -1;
      else dirStep = 1;
  }

 
  delayMicroseconds(50);
    Serial.println("Button pressed");
  } else {
    //digitalWrite(servoPin, LOW);
    Serial.println("Button not pressed");
  }
}

