---
title: "Stable Diffusion"
date: "2025-02-09"
excerpt: "Explaining how text to image generation works, for the rest of us."
---

# Stable Diffusion

During my sabbatical at the [Recurse Center](https://www.recurse.com/) own of my goals was to understand how `text to image` generation works. 

So here we go!

...

I'd like to start witha simple exercise. Close your eyes and think of the image of a block of cheese.

!['A block of cheese'](https://images.pexels.com/photos/11126279/pexels-photo-11126279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

What do you see in your mind? For me I see a yellow block of swiss cheese floating somewhere in the back of my mind. Yours might be completely different.
And the image of the cheese that we "see" has been formed from past learnings of cheese. Maybe you had it in a sandwhich, saw an image in a book, bought a piece of cheese at the store.

Our mental image of the cheese was formed by past learnings of the cheese and I think of stable diffusion this way.

Stable Diffusion is a beautiful deep learning model that can turn a simple text prompt "a block of yellow cheese" into a brand new image. You can get this for `free` today by prompting into your favorite LLM.

What’s a deep learning model you ask? Simply put, it's a type of model that uses neural networks to learn patterns and make predictions. And Stable Diffusion is part of a larger family of models called diffusion models.

Diffusion models are all about generating new things—like images—that look similar to what they’ve seen during training. So when you give it a text prompt, it creates something unique, but still in line with what it's learned.

## Why is diffusion in the name?

Stable Diffusion is called `diffusion` because its core mechanism closely resembles the physical process of diffusion, where something gradually spreads out from a concentrated area to a less concentrated one, mirroring how the model works by adding noise to an image (like spreading out information) and then gradually removing that noise to generate a new image, essentially "reversing" the diffusion process; this mathematical similarity to physics is why the model is named "diffusion". 

## Key components of Stable Diffusion

`1.` Autoencoder - used to encode and decode image.  
`2.` CLIP - used to generate text-image relationship.  
`3.` UNet - used to denoise the image.

## Stable Diffusion Pipeline
**__Step 1__**  
Start with a text prompt and a randomly generated image of noise in latent space. (a compressed or abstracted form of the image)

**__Step 2__**  
Use the CLIP model (trained on image-text pairs) to generate a text embedding of the prompt.

**__Step 3__**  
Use the UNet model to gradually denoise the image with the guidance of the CLIP text embedding based on a noise schedule.

**__Step 4__**  
Use the Autoencoder model to decode the image from latent space into a pixel image.


## Step 1 Prompt + latent image

We start with a text prompt

```javascript
prompt = ["a banana riding a skateboard"]
```

!['A banana riding a skateboard'](https://files.oaiusercontent.com/file-DsRkCsBuA8X2rBUH4v83WA?se=2025-02-27T20%3A20%3A00Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D3148adf7-7750-4233-835d-9b40e64f42f3.webp&sig=nY3jgRPPtiG3tylYjUaV9eNY0Q%2BgdaiMYveXqykBWCY%3D)

and a randomly generated image of noise in latent space or latent image for short. This is not an image in pixels, it is a random noise vector or you can thinkg of this as an array of randomly distributed values (normally a Gaussian distribution)

```javascript
latents = torch.randn(
  (batch_size, unet.in_channels, height // 8, width // 8),
  generator=generator,
)

latents = latents.to(device)
```

Normally, when we think of images, we think about pixels. However, the reason Stable Diffusion stands out from other diffusion models is that it uses images in latent space which means images compressed down with smaller memory footprint. Working in pixels at a high resolution requires a lot of GPU memory. So as we'll see below, Stable diffusion starts with an image in latent space, then the latent representation is decoded back into a full-resolution image.

# Step 2 - Image + Text relationship with CLIP

## What is CLIP??
CLIP stands for Contrastive Language-Image Pretraining and was developed by OpenAI

CLIP is a model that understands the relationship between and image and text, because it was trained on image-text pairs.

When CLIP is given a text like *"a cute teddy"* it returns a text embedding which is a numerical representation that the computer can understand. But we can think of this as a dictionary or object containing information about the prompt.

![CLIP Text encoder](https://rekil156.github.io/rekilblog/posts/lesson9_stableDissufion/clip2.png)

If the prompt was `a cute teddy` the text embedding stores key characteristics of a "a cute teddy"--like the shape (round), facial features (2 eyes, nose)  and other related associations that CLIP has learned from training on imag-text pairs.

```javascript
tokenizer = CLIPTokenizer.from_pretrained("openai/clip-vit-large-patch14")
text_encoder = CLIPTextModel.from_pretrained("openai/clip-vit-large-patch14")

text_input = tokenizer(prompt, padding="max_length", max_length=tokenizer.model_max_length, truncation=True, return_tensors="pt")

with torch.no_grad():
  text_embeddings = text_encoder(text_input.input_ids.to(device))[0]
```

This text embedding with the characterists of the prompt is important because it is used in the UNet model to help guide the denoising of the latent image from step 1. 


# Step 3 Denoising image with UNet

## What is a UNet?
UNet is a convolutional neural network that gets its name from the "U" shape it generates from encoding an image down to a smaller representation then doing the reverse to decode it back to larger representation. 

![U-net architecture](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*W-RkwGIiKDF3A3WXwZQMWg.png)


CNN's like UNet have been trained with a huge variety of images with corresponding text descriptions so they're great at recognizing patterns and learning general features like edges, shapes, and colors.

## Running the model
When the model is run, it starts with the random noise from Step 1 and uses the text embedding from Step 2 to guide the denoising process. The model uses CLIP to guide the UNet by finding the closest image to the text prompt in the shared embedding space. Because it has learned general patterns and characteristics `yellow` and `ball` it can eventually denoise the image to a point where an image of a `yellow ball` is created.

Instead of copying exact images, it generates a new composition that best matches the text embedding.

```javascript
for t in tqdm(scheduler.timesteps):
  latent_model_input = scheduler.scale_model_input(latent_model_input, t)

  # predict the noise residual
  with torch.no_grad():
    noise_pred = unet(latent_model_input, t, encoder_hidden_states=text_embeddings).sample

  # perform guidance
  noise_pred_uncond, noise_pred_text = noise_pred.chunk(2)
  noise_pred = noise_pred_uncond + guidance_scale * (noise_pred_text - noise_pred_uncond)

  # compute the previous noisy sample x_t -> x_t-1
  latents = scheduler.step(noise_pred, t, latents).prev_sample
```

## Similarity Between Text and Image Embeddings
- The model uses the text embedding to guide the generation of an image. The model’s goal is to generate an image whose image embedding is close to the text embedding in the embedding space.
- The similarity is computed by taking the dot product of the text embedding and image embedding. A higher dot product means the text and image are more similar.
- For generating images, the text embedding guides the generation of images so that when the image is generated and passed through the image encoder, it should be close to the text embedding in this shared embedding space.

# Step 4 - Decoding the latent image

The final outcome is to take the denoised image from the UNet and convert it back into a pixel representation using the Autoencoders decoder.

```
# scale and decode the image latents with vae
latents = 1 / 0.18215 * latents

with torch.no_grad():
  image = vae.decode(latents).sample
```

## What happens during training the Neural Network?

The above steps outline what happens when running the model after it has already be trained (this means running inference on the model).

But lets take a step back and talk about the process of training the model.

**__Step 1__**  
Start with a clean training image.

**__Step 2__**
Use the Autoencder to encode the image (to make training faster).

**__Step 3__** 
Gradually add noise to the image using a scheduler (which would add noise at an interval)

**__Step 4__**  
Train the UNet to predict the noise and learn how to remove it during the denoising process.

## Thank you to fast.ai

Thank you to the team at fast.ai fo your [Practical Deep Learning for Coders](https://course.fast.ai/Lessons/lesson9.html) course!

The jupyter notebooks are in this [diffusion-nbs repo](https://github.com/fastai/diffusion-nbs).
