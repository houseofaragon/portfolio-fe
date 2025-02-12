---
title: "Stable Diffusion"
date: "2025-02-09"
excerpt: "Stable Diffusion for the rest of us."
---

# Stable Diffusion

Stable diffusion is a model that takes text as an input and outputs an image. It belongs to a class of deep learning models called diffusion models.

Diffusion models are generative models that generate new data similar to what they have seen in training - which are images.

## The Magic API

Imagine you are trying to generate images of cheese. How could we go about it? We have a magic handwritten function we can call.
We pass in an image Image1 into the Magic API and it tells us the probability that image is an image of cheese..

This Magic API is special because we can use it to generate actual images of cheese.

Let's start with a 28x28 image with 784 pixels. Each time we update a pixel in the image (either ligther or darker) we pass it into the function and see how the probability changes.

We want the gradient of the probability that Image1 is a handwritten digit with respect to the pixels of Image1. Remember: As I change the input pixels, we expect the probability that it is a cheese image, and hopefully that probability goes up 

## Generating Training Data

We can take actual images of cheese and add random noise on top of it. Then we can predict how much noise was added, verses generating an exact score telling us how much these noisy images are like images of cheese.

So, an image with no noise has a high probability it is cheese versus an image with a lot of noise looks less like cheese.

## Lets build the Neural Network - UNet
A UNet is a convolutional neural network 


Inputs- images with random ranges of noise on top of them

Output - noise

Loss Function - mean square error between the predicted output (noise) and the actual noise)


## Training the Neural Network

We pass the NN an image and its going to ouput information about what part of the image it thinks is noise. This happens over many many iterations

## Building blocks of Stable Diffusion

We Can teach a neural network to predict the noise added. UNET - takes an image -> predicts the noise in the image. Images are 512x512x3 (rgb) - but this would take a long long time to train so to speed things up with can think about using an Autoencoder (encoder/decoder)

- pick a training image, image of cheese
- generate a random noise image (actually random tensor in latent space - latent noise)
- add the noise to the image of cheese (latent image)
- teach the UNET to predict how much noise is added

## UNet

`1.` A random latent space matrix is generated. Forward Diffusion - corrupting training image by adding noise to it
`2.` The noise predictor estimates the noise of the latent matrix. 
`3.` The estimated noise is then subtracted from the latent matrix. Reverse Diffusion - recovering original image by removing the noise added

`4.` Steps 2 and 3 are repeated up to specific sampling steps.
`5.` The decoder of VAE converts the latent matrix to the final image.

`2` VAE - Variational Autoencoder - for image compression. There is an encoder and decords. 
The encoder encodes the larger image into a smaller image representation - called latents.

Decoder does the opposite, decoding the latests (smaller images) back to a larger image representation.

We can use the encoded (smaller) images and pass them into the UNet which returns the predicted noise in the image

We can then take the predicted noise and subtract it from the encoders latents to get denoised latents.

The denoised latents are then passed through the VAE's decoder which returns a larger image representation.

Notes:
`1)` VAE is optional. used to make training faster
`2)` VAE is only needed during training, not during inference

## CLIP - Contrastive Language Image Pretraining
## Gathering training images

CLIP is a deep learning model that produces text descriptions of any images.

We can scrape images from the web with an alt tag with some description

<img href="..." alt="a block of swiss cheese" />

## Create Text and Image Encoder (Multimodal - using more than one mode)

## CLIP Tokenizer
- We pass text to the text encoder (tokenizer) which will output a text embedding. The tokenizer looks at each word from the prompt and embeds this in a vector.
- We pass an image to the image encoder which will output an image embedding.

Our hope is that we find text embeddings similar to image embeddings. We can tell our model to do this by taking the dot product of each embedding (image embedding * text embedding) the higher the result the more similar they are.

## Recap

There are three main parts.
`1.` UNet - denoises latents into noisy latents
`2.` Variational AutoEncoder - take an image and encode it into a latent, take a latent and decode it into image.
`3)` CLIP - we introduce a text encoder that can guide the UNet with captions


Stable Diffusion is a latent diffusion model - meaning it doesn't operate in the pixel space, it operates in the latent space of a Variational Autonencoder.


## Noise schedule

noise graph from 0 -> # of steps. The higher the step the less noise the image will have, meaning if you select 0 there will be a lot of noise in the image, and if you select 1000, there will be very little if not none.

Gradients 

Creating mini batches from training. 

`1. ` You randomly pick images from training set  
`2.` Randomly pick the amount of noise or select a number from the noise graph.  
`3. ` When you pass mini batch into model, the model is trained to predict NOISE



Step 1: Generate random noise in latent space (a vector) using encoder from VAE
Step 2: Feed this latent image + text embedding into the UNet model which predicts the amount of noise in the image
Step 3: Subtract the noise predicted in step 2 from the image created in step 1
Repeat Step 2 + 3 based on number of steps user provides

Step 4: Decode latent image to get high resolution image