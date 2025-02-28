---
title: "Advanced React Patterns"
date: "2024-12-09"
excerpt: "Hello this is an excert"
---

Had some upsetting personal life news so today I built  a meditation app to focus my energy elsewhere. Its a clone of this [NYT 10](https://www.nytimes.com/interactive/2025/02/02/upshot/ten-minute-challenge-hunters.html) minute challenge. But boo paywall! plus I wanted to have a different image every time I sat to focus + i wanted to track my own times.

[Screen Recording 2025-02-03 at 7.40.37 PM.mp4](/user_uploads/13/6MH388rN0PuWP_2lZWAFa16y/Screen-Recording-2025-02-03-at-7.40.37PM.mp4)

- :art:  created an endpoint to the [MET Art Collection](https://metmuseum.github.io/) database to pull a random image + then cache it
- lets me know when i'm at the half way mark
- :time:  records to db how long I spend meditating each time (via start + quit button) - so i can answer how often I make it to 10mins (would be interesting to see how long others make it as well). I used supabase for the first time.
- learned you can do so much animation with just good ol css.