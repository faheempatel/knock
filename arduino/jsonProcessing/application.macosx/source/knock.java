import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import httprocessing.*; 
import org.firmata.*; 
import cc.arduino.*; 
import processing.serial.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class jsonProcessing extends PApplet {





JSONObject json;

Serial port;
int val = 0;
int state = 31;
public void setup() {
  port = new Serial(this, Serial.list()[5], 9600);
  println(Arduino.list());
  port.bufferUntil('\n');
}

public void draw() {
  json = loadJSONObject("http://my-other-box-37843.euw1.nitrousbox.com:8080/anand/door/answer");
  Boolean knock = json.getBoolean("knock");

  println("Doorbell - " + knock);

  if (knock == true) {
    println("Someone is downstairs");
    port.write('Y');
  }

  if (knock == false) {
    println("No one is downstairs");
    port.write('N');
  }

  println(val);

  if (port.available() > 0) {
    state = port.read();
    println("Button pressed");
    PostRequest post = new PostRequest("http://my-other-box-37843.euw1.nitrousbox.com:8080/anand/door/answer");
    post.addData("response", "true");
    post.send();
  }

  delay(2000);
}

public void serialEvent(Serial port) {
  val = port.read();
  println("Value is " + val);
}

  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "jsonProcessing" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
