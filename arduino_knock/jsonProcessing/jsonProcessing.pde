import httprocessing.*;
import org.firmata.*;
import cc.arduino.*;
import ddf.minim.*;
import processing.serial.*;


JSONObject json;
Serial port;
int val = 0;
int state = 31;

Minim minim;
AudioPlayer player;


void setup() {
  port = new Serial(this, Serial.list()[5], 9600);
  println(Arduino.list());
  port.bufferUntil('\n');

  minim = new Minim(this);

  player = minim.loadFile("data/knocking.mp3");
}

void draw() {

  try {
    json = loadJSONObject("http://my-other-box-37843.euw1.nitrousbox.com:8080/anand/door/answer");
    Boolean knock = json.getBoolean("knock");

    println("Doorbell - " + knock);

    if (knock == true) {
      println("Someone is downstairs");
      port.write('Y');
      player.loop();
    }

    if (knock == false) {
      player.pause();
      println("No one is downstairs");
      port.write('N');
    }

    println(val);

    if (port.available() > 0) {
      state = port.read();
      println("Door Answered");
      PostRequest post = new PostRequest("http://my-other-box-37843.euw1.nitrousbox.com:8080/anand/door/answer");
      post.addData("response", "true");
      post.send();
    }
  }
  catch(NullPointerException e) {
    println("Server down/No data");
  }
  delay(2000);
}

void serialEvent(Serial port) {
  val = port.read();
  println("Value is " + val);
}

