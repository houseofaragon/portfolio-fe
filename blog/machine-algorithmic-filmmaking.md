---
title: "Algorithmic Filmmaking"
date: "2024-12-09"
excerpt: "Using machine learning in film production."
---

# Algorithmic Filmmaking

> **Warning** This is a work in progress post as I make my way through this Algorithmic Filmmaking course 
https://www.youtube.com/watch?v=OsaMj-WQ8lc&list=PLWuCzxqIpJs-QIFhAMEsa-IO0jp5k4RI8&index=1

- Google Colab
- Google Drive 
- Video Data

# A Shot Database
Shot Detection - shots are building blocks of scenes.
PySceneDetect - command line tool
Davinci Resolver

What movies am i into? 
Keep track of data with JSON document - or consider what db could handle this.

```python
!pip install yt-dlp
```

I also had some fun playing around with `ML and video` via this [colab notebook](https://colab.research.google.com/drive/1CTdvlpW3x9-vCNfKGY1p3Y-vsChuu0ro?usp=sharing#scrollTo=_BwzFvaxwtPX)- incorporating my favorite model!!- pose detection onto some groundhog day scenes via `yt-dl` and `scenedetector` for breaking it up into clips I could mess around with. Still noodling on what art i'm going to make with this - might play around with some pose tracking dance clips.
[groundhog_pose_tracking.mp4](/user_uploads/13/g9njCFjW_1SsZ8vRw5X4FFbV/groundhog_pose_tracking.mp4)


:video_camera:  The second being my algo filmmaking journey. I played around with two classification models [Kinetics-400](https://www.google.com/url?q=https%3A%2F%2Fgist.github.com%2Fwillprice%2Ff19da185c9c5f32847134b87c1960769) and [Something Something V2](https://www.google.com/url?q=https%3A%2F%2Fhuggingface.co%2Fdatasets%2FHuggingFaceM4%2Fsomething_something_v2) which classifies all types of very specific actions like `waxing eyebrows` to `bee keeping` to `Letting something roll down a slanted surface.` I ran it on clips of GroundHog Day. There was a clip of someone holding the groundhog and it labeled the clips as `sheering sheep` oops. hehe.

- run the video classifiers on my own set of personal videos. I am curious what types of scenes i've recorded throughout the years. I'm hoping it will come back with a set of very specific ones like `Poking something so lightly that it doesn't or almost doesn't move` or `Trying to bend something unbendable so nothing happens` from [Something Something V2 classifier](https://huggingface.co/datasets/HuggingFaceM4/something_something_v2)
```spoiler I like these pretending labels
 |63 | Pretending or failing to wipe something off of something | |64 | Pretending or trying and failing to twist something | |65 | Pretending to be tearing something that is not tearable | |66 | Pretending to close something without actually closing it | |67 | Pretending to open something without actually opening it | |68 | Pretending to pick something up | |69 | Pretending to poke something | |70 | Pretending to pour something out of something, but something is empty | |71 | Pretending to put something behind something | |72 | Pretending to put something into something | |73 | Pretending to put something next to something | |74 | Pretending to put something on a surface | |75 | Pretending to put something onto something | |76 | Pretending to put something underneath something | |77 | Pretending to scoop something up with something | |78 | Pretending to spread air onto something | |79 | Pretending to sprinkle air onto something | |80 | Pretending to squeeze something | |81 | Pretending to take something from somewhere | |82 | Pretending to take something out of something | |83 | Pretending to throw something | |84 | Pretending to turn something upside down
```


:movie:  Instead I system designed something I plan to build which is running an [ML classification model](https://www.google.com/url?q=https%3A%2F%2Fhuggingface.co%2Fdatasets%2FHuggingFaceM4%2Fsomething_something_v2) against a large set of my own personal videos.  High level design -> Enable a user to batch upload videos -> classifier service -> run model against videos -> return classifications. (In reality i'm running a pytorch notebook to test things out)

I think it will be super helpful to have tags for video clips then I can learn things about myself (like what I like to shoot, what I have shot) but it'll also enable me to compose clips together. Like if i for whatever reason want to create a reel of  all the cheese :cheese:  i've ever eaten, i'll know exactly where to find them. Props to this [free algorithmic filmmaking course](https://www.youtube.com/playlist?list=PLWuCzxqIpJs_8IpPl1bkKNFAe98ejDHsQ). Also cant stress enough how much this [NN course](https://karpathy.ai/zero-to-hero.html) has helped usher me into this ML world.