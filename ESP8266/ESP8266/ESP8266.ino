void setup() {
  pinMode(ledPin, OUTPUT);

  Serial.begin(115200);
  // connect to the school's wifi network with the appropiate SSID and password
  WiFi.begin("Class-2018", "jun1orsmayh3m"); //Connect to the WiFi network

  // wait until the wifi network is connected before doing anything else
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println(“Waiting to connect…”);
  }

  // let us know the IP address of the ESP8266 for debugging purposes
  Serial.print(“IP address: “);
  Serial.println(WiFi.localIP()); //Print the local IP

  server.on(“/on”, turnOn);         //Associate the handler function to the path
  server.on(“/off”, turnOff);        //Associate the handler function to the path
  server.on(“/toggle”, toggle);   //Associate the handler function to the path

  // start the server
  server.begin();
  Serial.println(“Server listening”);
}

void loop() {
  // run the server
  server.handleClient();
}
