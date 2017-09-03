import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import org.openkinect.freenect.*; 
import org.openkinect.freenect2.*; 
import org.openkinect.processing.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class sketch extends PApplet {



 //<>//

Kinect2 kinect2;

public void setup() {
  size(1024, 848, P2D);

  kinect2 = new Kinect2(this);
  kinect2.initVideo();
  kinect2.initDepth();
  kinect2.initIR();
  kinect2.initRegistered();
  // Start all data
  kinect2.initDevice();
}


public void draw() {
  background(0);
  image(kinect2.getVideoImage(), 0, 0, kinect2.colorWidth*0.267f, kinect2.colorHeight*0.267f);
  image(kinect2.getDepthImage(), kinect2.depthWidth, 0);
  image(kinect2.getIrImage(), 0, kinect2.depthHeight);

  image(kinect2.getRegisteredImage(), kinect2.depthWidth, kinect2.depthHeight);
  fill(255);
  text("Framerate: " + (int)(frameRate), 10, 515);
}
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "sketch" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
