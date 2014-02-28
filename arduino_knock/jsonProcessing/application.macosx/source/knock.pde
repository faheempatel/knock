import httprocessing.*;
import org.firmata.*;
import cc.arduino.*;

JSONObject json;
import processing.serial.*;
Serial port;
int val = 0;
int state = 31;
void setup() {
  port = new Serial(this, Serial.list()[5], 9600);
  println(Arduino.list());
  port.bufferUntil('\n');
}

void draw() {
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

void serialEvent(Serial port) {
  val = port.read();
  println("Value is " + val);
}

