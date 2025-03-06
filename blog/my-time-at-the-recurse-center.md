---
title: "My time at the Recurse Center"
date: "2025-02-09"
excerpt: "All the things I learned at my engineering sabbatical."
tags: "React"
---

# My time at the Recurse Center

The [Recurse Center](https://www.recurse.com/) is a truly special place where engineers go to be even better engineers. 

I worked at the edge of my abilities, exercised my volitional muscles, worked on so many projects, learned to be kind to my [inner artist](https://en.wikipedia.org/wiki/The_Artist%27s_Way).

And after completing a 12 week batch I truly know deep in my heart that I am a better engineer. The energy in my batch was contagious. I found confidence in myself that had waned a bit, I found joy in building things, 

During my batch I:
- built a neural network from scratch
- built a tokenizer
- built a browser
- learned how Stable Diffusion models works
- built a lot of interactive creative applications
- incorporate machine learning and art
- read the Nature of Code
- algorithmic filmmaking

## I went deep into Machine learning 

For the first 6 weeks of my batch I learned how to **build a neural network from scratch** in python by going through Andrj Karpathy's [Neural Networks: Zero to Hero course](https://karpathy.ai/zero-to-hero.html). 

I went from building a bigram character-level model to a  generatively pretrained **transformer** (GPT)

!['transformer image'](/images/transformer.png)

I wrote an implementation of [micrograd](https://github.com/karpathy/micrograd) - A tiny Autograd engine that implements backpropagation (reverse-mode autodiff) over a dynamically built DAG and a small neural networks library on top of it with a PyTorch-like API.

I wrote a lot of `python` and implemented methods in `Pytorch` (class Embedding, Flatten, Tanh ...) [Messy code here](https://github.com/houseofaragon/neural-network-labs/blob/main/6%20-%20Makemore%205%20-%20WaveNet/cnn.ipynb). 


## Built a tokenizer

I was inspired by 3Blue1Brown **Transformers** video to visualize the next token probabilities from `GPT-2`. So I built a fast-api endpoint using `from transformers import GPT2LMHeadModel, GPT2Tokenizer` to get the next tokens, and a simple react form  with d3 bar chart. 

!['tokenizer image'](/images/tokenizer.png)

Mainly as nice forcing function to play around with all of these things. At least for me, its helped to demystify these tools we use everyday now. Can see some results below - i think I'll play around with the UI a bit more and also selecting different tokenizers.



``` python
# Function to get next token probabilities
def get_next_token_probabilities(tokens):
    input_ids = torch.tensor(tokens).unsqueeze(0)  # Add batch dimension
    
    with torch.no_grad():
        outputs = model(input_ids)
        logits = outputs.logits[:, -1, :]  # Get logits for the last token

    probs = torch.nn.functional.softmax(logits, dim=-1)
    top_probabilities, top_indices = torch.topk(probs, 10)
    
    top_tokens = [tokenizer.decode([idx]) for idx in top_indices[0]]
    top_probabilities = top_probabilities[0].tolist()

    return top_tokens, top_probabilities

# Define the API endpoint
@app.post("/predict")
async def predict_next_token(input_data: TextInput):
    print(input_data)
    text = input_data.text
    tokens = tokenizer.encode(text)
    top_tokens, top_probabilities = get_next_token_probabilities(tokens)
    
    return {
        "top_tokens": top_tokens,
        "top_probabilities": top_probabilities
    }

# Run the API with: uvicorn main:app --reload
"""
curl -X 'POST' \
  'http://127.0.0.1:8000/predict' \
  -H 'Content-Type: application/json' \
  -d '{
  "text": "The boy jumped over the"
}'
"""
```

## Learned about Stable Diffusion

After using DALL-E and RunwayML and nice segway from building a GPT I really wanted to know how **text to image** worked so I followed fast.ai's [Practical Deep Learning for Coders](https://course.fast.ai/Lessons/lesson9.html) to learn the internals. I wrote about [stable diffusion here](/posts/a-stable-diffusion.html).


## Nature of Code

I joined a fun reading group for Daniel Shiffman's [Nature of Code](https://natureofcode.com/random/)

## Made some interactive art

-  I played around with pixelating my video feed  https://editor.p5js.org/houseofaragon/sketches/AOc9OEUVA
- wanted to shoot particles from my finger  :point_right:  https://editor.p5js.org/houseofaragon/sketches/Zy36rgQxM
- and to have sparkly hands :sparkle-stars:  https://editor.p5js.org/houseofaragon/sketches/mgFRKOM3i


## Learned how to build a browser 

I learned how to build a browser by working through  [Web Browser Engineering](https://browser.engineering/history.html)


## Learned about Algorithmic Filmmaking

- :movie:  I secretly have always wanted to make a film but i don't know anything about editing tools 
 or cameras nor do i have the resources  -- so today I am going to take a look at how ML can help me.  I started this series about [Algorithmic Filmmaking](https://www.youtube.com/watch?v=N-4_Ey4ZH2k&list=PLWuCzxqIpJs_8IpPl1bkKNFAe98ejDHsQ&index=29) which just happens to use some of my favorite models (pose, face detection). Gonna see where it takes me :wind:  Yet another plug for the `Artist's way` :) 

 