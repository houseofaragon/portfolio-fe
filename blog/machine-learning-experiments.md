---
title: "Machine Learning Experiments in the Browser"
date: "2025-02-09"
excerpt: "Building interactive apps with ML using Transformers and ONNX"
---

# Machine Learning Experiments in the Browser

My exploration into neural networks and models and [stable diffusion](stable-diffusion) has introduced me to pytorch and jupyter notebooks and gpus. I've written more python that I ever have (I've never used [iter](https://docs.python.org/3/library/functions.html#iter)!) and have managed to run things on my machine's gpu or exhaust my free remote gpu credits.

But I wondered when models would get so small we'd be able to run them directly in the browser without the need for running a server.

My internet searching eventually led me to one of my favorite libraries ever - HuggingFace's [Transformers.js](https://huggingface.co/docs/transformers.js/v3.0.0/index). I tried to get people interested in it while at my engineering sabbatical at the [Recurse Center](https://www.recurse.com/) but majority of people in my batch were following [fast.ai](https://course.fast.ai/) or training their own models or running experiments in jupyter notebooks - where as this is the opposite end of the spectrum. 

Download a model, cache it, run inference in the browser.

## Transformers.js Docs

Straight from the docs: 
*Transformers.js is designed to be functionally equivalent to Hugging Face’s transformers python library, meaning you can run the same pretrained models using a very similar API. These models support common tasks in different modalities*

Transformers.js uses the [ONNX Runtime](https://huggingface.co/docs/transformers.js/v3.0.0/index#:~:text=Transformers.js%20uses-,ONNX%20Runtime,-to%20run%20models) to run models in the browser.

I am forever grateful for the amazing docs and for the tons of demos which I have learned from and built my own applications on top of. 

Let's see how they're built.

# Speech Recognition with Whisper

The first project is an audio visualizer that enable a user to speak into their browser's microphone and have a text to speech model translate the audio and interact with a shader using react-three-fiber.

You can see the code [here via Github.](https://github.com/houseofaragon/oracle-whisper/tree/main)

## Tools used:
- React + React Three Fiber
- Shader
- Transformers.js + ONNX
- Web Worker


## The Frontend

The UI consists of a react app with react three fiber

## The Web Worker

A web worker is used to run JavaScript code in the background, separate from the main execution thread of the web page. *This means web workers run in a separate thread from the event loop of the main thread*. 

This allows long-running or computationally intensive tasks (in our case this is running inference) to be performed without blocking the user interface, ensuring that the page remains responsive.

In `App.tsx` we initialize a web worker after initial render.

```javascript
  const worker = useRef(null)

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Worker
    worker.current ??= new Worker(new URL('./worker.js', import.meta.url), {
      type: 'module'
    })

    const onMessage = ({ data }) => { ... }

    worker.current.addEventListener('message', onMessage)

    return () => {
      worker.current.removeEventListener("message", onMessage);
    };
  }, [])
```


## The Pipeline

Inside the web worker we'll leverage the pipeline provided to us from transformers.js. The pipeline() function enables us to use a pretrained model for inference.

To transcribe the text we can use the `automatic-speech-recognition` pipeline 

```javascript
const transcriber = await pipeline(
  "automatic-speech-recognition",
  "onnx-community/whisper-tiny.en",
  {
    device,
    dtype: DEVICE_DTYPE_CONFIGS[device],
  },
).catch((error) => {
  self.postMessage({ error });
  throw error;
});

const transcribe = async (buffer, data) => {
  const { text } = await (inferenceChain = inferenceChain.then((_) =>
    transcriber(buffer),
  ));

  self.postMessage({ type: "output", buffer, message: text, ...data });
};
```

## The Canvas

We leverage react three fiber to render a water shader into a canvas. We pass the `frequency` which will update the shader.

```javascript
     <Canvas camera={{ position: [0, 210, 0], fov: 75 }}>
        {...}
        <Water
          ready={status != null}
          active={status === 'recording_start' }
          frequency={frequency}
        />
      </Canvas>
```

and render the shader into a mesh object.

```javascript

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.ShaderLib['phong'].uniforms,
        { 
            heightmap: { value: null },
        }, 
      ]),
      vertexShader: waterVertexShader,
      fragmentShader: THREE.ShaderChunk['meshphong_frag'],
      lights: true,
      transparent: true,
    })
  }, [])


    <mesh ref={meshRef} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[WATER_BOUNDS, WATER_BOUNDS, WATER_WIDTH - 1, WATER_WIDTH - 1]} />
        <primitive object={shaderMaterial} />
     </mesh>
```