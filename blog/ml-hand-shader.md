---
title: "Interactive Sound Visualizer with ML"
date: "2025-02-09"
excerpt: "Building an interactive sound visualizer with machine learning and shaders"
tags: "React"
---

# Interactive Sound Visualizer with Machine Learning

I love that we can now download models in the browser to create fun interactive applications for the web. I have been playing around specifically with **Pose and Hand detection models**.

This project combines a hand detection model, sound generation, and a shader-based visualization to create an interactive audiovisual experience. 

Users can control sound notes and dynamic visual effects by moving their hands in front of the webcam. In other words, 

I built a thermin for the browser :) 

!['hand shader image'](/images/hand-shader-interaction.png)

## Key Features we'll explore

1. **Hand Tracking**: Uses MediaPipe's Hand Pose Detection to track hand positions and identify gestures.

2. **Sound Generation**: Plays musical notes based on hand positions using the p5.js sound library.

3. **Shader Visualization**: Dynamically adjusts visual effects (shaders) based on hand movement.


## HandPose Model

We can leverage ML5's HandPose model which uses [MediaPipe Hand Landmark](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker/web_js) model under the hood.

This allows a user to interact with the application with their hands. The MediaPipe Hand Landmarker works by detecting key points in hands.

For training the model
> The model was trained on approximately 30K real-world images, as well as several rendered synthetic hand models imposed over various backgrounds.

```javascript
async function preload() {
  model = await handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: "tfjs",
    modelType: "full",
  };
  detector = await   handPoseDetection.createDetector(model, detectorConfig);
}
```
We initialize the handpose model which will allow us to get handpoint information that we can track on a canvas.

We use the browser's camera to get images of the users hands

```javascript
createCapture(VIDEO)
```

## Sound Generation

We will use p5.js library for creating sounds based on the location of the hand on the canvas.

I used p5's [Envelope](https://p5js.org/reference/p5.sound/p5.Envelope/) and [Oscillator](https://p5js.org/reference/p5.sound/p5.Oscillator/)

I stored a note scale of frequencies that we use to generate sound based on value

```javascript
let notes = [
  493.8833, // B
  440.0000, // A
  391.9954, // G
  349.2282, // F
  329.6276, // E
  293.6648, // D
  261.6256, // C
]
```

## Shader Visualization

We draw the shader onto the canvas and update the shader based on the users indexFinger, but you can map to whatever point you'd like

```javascript
shader = createShader(vert, frag);
...
function updateShaderColor(indexFinger) {
  shaderColorX = map(indexFinger.x, 0, width, -1.0, 1.0)
  shaderColorY = map(indexFinger.y, 0, height, -1.0, 1.0);
  alphaColor = map(indexFinger.x, 0, width, 0.2, 0.9);
}
```

## Playing Notes

For playing notes we detect left hand or right hand and map the finger position to the frequency on the scale. We pass the freqency to the oscillator and envelope and update the shader. In the below example, a left hand has been detected.

```javascript
    // get x,y position of index finger
      leftIndex = prediction.keypoints[8]; 
      
      // map finger position to note on scale
      let index = map(leftIndex.x, width, 0, 6, 0);
      
      // normalized value of index finger (0-1)
      let vol = map(leftIndex.y, height, 0, 1, 0)
      
      // get note
      let frequency = notes[Math.floor(index)]
      oscillator.freq(frequency);
      envelope.play(oscillator, 0, 0.1, vol);
      updateShaderColor(leftIndex)
```

## Conclusion

This turned out to be such a fun project, I think I built a theremin without knowing it. I definitely spent a lot of time tweaking with the sound and getting the positioning of the hand detection model to line up with a note scale that sounded nice.

Anyway, I see a lot of more fun art projects with other models - like face and body! Until next time.