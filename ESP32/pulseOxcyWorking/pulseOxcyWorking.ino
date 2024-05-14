
// Accompanying video: https://youtu.be/xjwSKy6jzTI
// Code for ESP32 to interface with MAX30102 breakout board and report blood oxygen level
// Refer to https://github.com/DKARDU/bloodoxygen - below code is simplified version
// https://www.analog.com/media/en/technical-documentation/data-sheets/MAX30102.pdf
// Connections from WEMOS D1 R32 board to MAX30102 Breakout Board as follows:
//  SCL (ESP32) to SCL (breakout board)
//  SDA (ESP32) to SDA (breakout board)
//  3V3 (ESP32) to VIN (breakout board)
//  GND (ESP32) to GND (breakout board)

#include <Wire.h>
#include "MAX30105.h" //sparkfun MAX3010X library
MAX30105 particleSensor;

double avered    = 0; 
double aveir     = 0;
double sumirrms  = 0;
double sumredrms = 0;
int    i         = 0;
int    Num       = 100;  // calculate SpO2 by this sampling interval
int    Temperature;
int    temp;
float  ESpO2;            // initial value of estimated SpO2
double FSpO2     = 0.7;  // filter factor for estimated SpO2
double frate     = 0.95; // low pass filter for IR/red LED value to eliminate AC component
#define TIMETOBOOT 3000  // wait for this time(msec) to output SpO2
#define SCALE      88.0  // adjust to display heart beat and SpO2 in the same scale
#define SAMPLING   100 //25 //5     // if you want to see heart beat more precisely, set SAMPLING to 1
#define FINGER_ON  30000 // if red signal is lower than this, it indicates your finger is not on the sensor
#define USEFIFO


void setup()
{
  Serial.begin(115200);
  Serial.setDebugOutput(true);
  Serial.println();

  Serial.println("Running...");
  delay(3000);

  // Initialize sensor
  while (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
  {
    Serial.println("MAX30102 was not found. Please check wiring/power/solder jumper at MH-ET LIVE MAX30102 board. ");
    //while (1);
  }

  //Setup to sense a nice looking saw tooth on the plotter
  byte ledBrightness = 0x7F; //Options: 0=Off to 255=50mA
  byte sampleAverage = 4; //Options: 1, 2, 4, 8, 16, 32
  byte ledMode       = 2; //Options: 1 = Red only, 2 = Red + IR, 3 = Red + IR + Green
  //Options: 1 = IR only, 2 = Red + IR on MH-ET LIVE MAX30102 board
  int sampleRate     = 200; //Options: 50, 100, 200, 400, 800, 1000, 1600, 3200
  int pulseWidth     = 411; //Options: 69, 118, 215, 411
  int adcRange       = 16384; //Options: 2048, 4096, 8192, 16384
  
  // Set up the wanted parameters
  particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange); //Configure sensor with these settings

  particleSensor.enableDIETEMPRDY();
}

void loop()
{

  uint32_t ir, red, green;
  double fred, fir;
  double SpO2 = 0; //raw SpO2 before low pass filtered
  
#ifdef USEFIFO
  particleSensor.check(); //Check the sensor, read up to 3 samples

  while (particleSensor.available()) {//do we have new data
#ifdef MAX30105
   red = particleSensor.getFIFORed(); //Sparkfun's MAX30105
   ir  = particleSensor.getFIFOIR();  //Sparkfun's MAX30105
#else
   red = particleSensor.getFIFOIR();  //why getFOFOIR output Red data by MAX30102 on MH-ET LIVE breakout board
   ir  = particleSensor.getFIFORed(); //why getFIFORed output IR data by MAX30102 on MH-ET LIVE breakout board
#endif
   
    i++;
    fred = (double)red;
    fir  = (double)ir;
    avered = avered * frate + (double)red * (1.0 - frate); //average red level by low pass filter
    aveir = aveir * frate + (double)ir * (1.0 - frate); //average IR level by low pass filter
    sumredrms += (fred - avered) * (fred - avered); //square sum of alternate component of red level
    sumirrms += (fir - aveir) * (fir - aveir);//square sum of alternate component of IR level
    if ((i % SAMPLING) == 0) {//slow down graph plotting speed for arduino Serial plotter by thin out
      if ( millis() > TIMETOBOOT) {
        float ir_forGraph = (2.0 * fir - aveir) / aveir * SCALE;
        float red_forGraph = (2.0 * fred - avered) / avered * SCALE;
        //truncation for Serial plotter's autoscaling
        if ( ir_forGraph > 100.0) ir_forGraph = 100.0;
        if ( ir_forGraph < 80.0) ir_forGraph = 80.0;
        if ( red_forGraph > 100.0 ) red_forGraph = 100.0;
        if ( red_forGraph < 80.0 ) red_forGraph = 80.0;
        // Print out red and IR sensor reading to serial interface for monitoring...
        Serial.print("Red: "); Serial.print(red); Serial.print(","); Serial.print("Infrared: "); Serial.print(ir); Serial.print(".    ");
        float temperature = particleSensor.readTemperatureF();
        
        if (ir < FINGER_ON){ // no finger on the sensor
           Serial.println("No finger detected");
           break;
        }
        if(ir > FINGER_ON){
           //Temperature = mlx.readObjectTempC();
           Serial.print("Oxygen % = ");
           Serial.print(ESpO2);
           Serial.println("%");
        }
      }
    }
    if ((i % Num) == 0) {
      double R = (sqrt(sumredrms) / avered ) / (sqrt(sumirrms) / aveir);
      // Serial.println(R);
      SpO2 = -23.3 * (R - 0.4) + 100; //http://ww1.microchip.com/downloads/jp/AppNotes/00001525B_JP.pdf -- I don't see this directly in the App Note... look here https://github.com/espressif/arduino-esp32/issues/4561
      ESpO2 = FSpO2 * ESpO2 + (1.0 - FSpO2) * SpO2;//low pass filter
      //  Serial.print(SpO2);Serial.print(",");Serial.println(ESpO2);
      sumredrms = 0.0; sumirrms = 0.0; i = 0;
      break;
    }
    particleSensor.nextSample(); //We're finished with this sample so move to next sample
   // Serial.println(SpO2);
  }
#endif

}
