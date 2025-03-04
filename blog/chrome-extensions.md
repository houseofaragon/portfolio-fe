---
title: "Building a chrome extension"
date: "2024-12-09"
excerpt: "How to create a chrome extension with a machine learning model"
---

# Building a Chrome Extension 

> In this article we talk about the event loop and web api callbacks, content + background scripts, and persisting data. Hopefully by the end you'll know everything you need to build your own!

My parents come from a small town along the north west coastal region of the Philippines, called Tagudin. People from this region are called Ilocanos and speak **Ilocano**. 

Unfortunately, I grew up not learning any of it. My parents, intentionally or unintentionally, westernized us as much as possible so we'd assimilate as easily as possible. They spoke it to themselves in the house, but always spoke in English to me.

Anyways, this is a long winded way to say that now I want to learn my native language. And one way of doing that is by **building a chrome extension that enables a user to highlight any text and have it translated from English to Ilocano (or a language they choose)**.

!['an image of text with some text converted to emojis'](/images/octavia-translation.png)

I also did some silly things like **convert text to emoji's** because why not.

!['an image of text with some text converted to emojis'](/images/emojify.png)

## Let's build a browser extension to translate text

A browser extension is a program that is meant to enhance your browsing experience. They run in the background or interact with web pages through content scripts.

You can add extensions by navigating to **chrome://extensions/** in Chrome.

## Content Script
The content script contains the code which is injected into every page the user visits. It has access to the DOM and other web APIs. 

We'll use the `sendMessage` api to send the text we want translated to a background script which will do the job of translating the text.

[send message](https://developer.chrome.com/docs/extensions/reference/api/runtime#method-sendMessage)

```javascript
// in content.js
const message = {
    action: 'translate',
    text: selectedText
}

chrome.runtime.sendMessage(message, (response) => { 
    // handle translation response 
})
```

When you call chrome.runtime.sendMessage, the message is passed to the Web API provided by the chrome which handles the operation of sending the message and receiving the response asynchronously.

## Event Loop

Before we get into the background script I wanted to discuss the web api (chrome.runtime). Specifically when **chrome.runtime.sendMessage** or **chrome.runtime.onMessage** gets executed with respect to the browsers event loop. 

The **event loop** is responsible for checking the call stack (where functions get run) and the **task and microtask queue**. Web API callbacks get placed on the task queue vs promise callbacks which get placed on the micro task queue. There is a strict order: 
1. the event loop checks if the callstack is empty
2. When the callstack is empty, it starts placing items from the microtask queue on to the call stack
3. When the microtask queue is empty, it starts placing items from the task queue on the call stack

The listener for the onMessage event (set with chrome.runtime.onMessage.addListener) in the background script will not run immediately. Instead, it gets registered to listen for incoming messages. 

This listener function is executed asynchronously. This means that the callback itself is not immediately executed — it is placed on the task queue and will run when the call stack is empty.


## Background Script

The background script is responsible for doing the translation work as sending it back to the client.

We first need to listen for messages from the client via the [onMessage](https://developer.chrome.com/docs/extensions/reference/api/runtime#event-onMessage) handler.

```javascript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => { ... })
```
Then it runs the translation pipeline on the text using model [Xenova/nllb-200-distilled-600M](https://huggingface.co/Xenova/nllb-200-distilled-600M), and returns the translated text. 

We can use transformers.js [pipeline function](https://huggingface.co/docs/transformers.js/v3.0.0/pipelines#running) to run inference on the translation model. We'll create the translator, then we'll run it on the text passed in from the client. In other words, we'll translate the English text to Ilocano.

```javascript
let translator = await pipeline('translation', 'Xenova/nllb-200-distilled-600M');
```
Putting it all together:

```javascript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action !== 'translate') return; 

    // Run model prediction asynchronously
    (async function () {
        let result = await translator(message.text, 
        // just showing you can set language here
        {
            src_lang: 'eng_Latn', 
            tgt_lang: 'ilo_Latn',
        });

        // Send response back to client
        sendResponse(result);
    })();

    return true;
});
```
You will need to reload the extension (by visiting **chrome://extensions/** and clicking the refresh button) after editing this file for changes to be visible in the extension. 

Full list of languages available [here](https://github.com/facebookresearch/flores/blob/main/flores200/README.md#languages-in-flores-200).


## Persisting data

I wanted to persist the translations I created between browser sessions so I created a helper in the content script to store the highlights in localStorage. LocalStorage was fine for me, if it got wiped out, its okay. I might consider using IndexedDb since there's no storage limit. If this were a full-fledged app were state needed to be persisted I'd need to consider some centralalized database - like supabase of sqlite.

```javascript
function saveHighlight(data) {
    let highlights = JSON.parse(localStorage.getItem('highlights') || '[]');
    highlights.push(data);
    localStorage.setItem('highlights', JSON.stringify(highlights));
}
```

## Popup
This is straight from the docs and adding here, I didn't actually utilize this because I didn't need it for my app.

> The popup script contains the code for the popup which is visible to the user when they click the extension's icon from the extensions bar. For development, we recommend opening the `popup.html` file in its own tab by visiting `chrome-extension://<ext_id>/popup.html` (remember to replace `<ext_id>` with the extension's ID). You will need to refresh the page while you develop to see the changes you make.

## Conclusion

I had a really fun time learning about the internals for building a browser extension. The main parts being the **content** script which allowed me to manipulate the DOM and pass the text to the **background** script which did all the translation work.

There's a bunch of others I'd like to build, but that's for another day.