---
id: 68
title: 'Music Project Update #3 &#8211; Routing, Reading from JSON and Archive Design'
date: 2018-08-25T18:10:35+00:00
author: Oisin
layout: post
guid: https://oisin.io/b/?p=68
permalink: /2018/08/25/music-project-update-3-routing-reading-from-json-and-archive-design/
categories:
  - Uncategorised
---
So far this week, I've made some good progress in getting this project up and running.

To start things off, the most important thing was to get rid of the hardcoding in the website. I don't want to have to manually update HTML every day just to add a new song. I could use a database for this, but I don't want to pay for a server, so I'm aiming for using a free host like Netlify or Github Pages. To this, I need the website to be static. That's where the idea of reading from a simple JSON file came from. It means I just have to add details about a new track to the JSON file and the details will fill in automatically. This seems to play pretty nicely with React as well.
<!--more-->
{% gist 22f5d280834b96ded6118f210236e946 %}

Based off this file, I started to set up my website to use this tracks object as a prop. I'm able to store all the details (including the background colour) in this file and means I can reuse the same page for all apps. Since the last post, I've experimented with editing the artist image to include the gradient instead of a CSS gradient, but I feel like this made things slower (or at least make it feel slower while you wait for the image). I'll experiment more when I've more actual work done with Archive and the like. I had some issues getting the CSS parts right (had to mess around with inline styles and Javascript objects), but everything seems to work like it should. I'll definitely go back and tidy things up a bit when I get the chance. I also had issues with the relative path to the image not existing in the deployed version for funky React reasons, but I eventually solved this by messing around a bit and importing the image into the JS using require(). Apart from that, it went fairly ok. Just as I write this, I might have an issue with this system over time when tracks.json gets really big, but I can probably make a separate JSON file for the latest track and only use tracks.json for the archive.

I also started looking into routing – React is designed for single-page apps, so you need something like [react-router](https://github.com/ReactTraining/react-router) to handle multiple pages and URLs. I think I'll need this so people can link to individual tracks. I have a basic router in the app right now with an Archive placeholder and a 404 page, but I've definitely more research to do (especially for pages that will just have a number i.e. amhran.ie/34).

I also got talking to a few people about helping out with the music discovery part of the project (sidenote: if you're reading this and listen to new Irish music, please get in contact with me. My contact details are all on [here](https://oisin.io)) and I've got two or three people willing to help me find great new music. I'll really need people to help me out if I want this project to succeed and survive. I think I'm gonna post in some musician Facebook groups to try and find some new music.<figure class="wp-block-embed-twitter wp-block-embed is-type-rich is-provider-twitter"> 

<blockquote class="twitter-tweet" data-lang="en-gb"><p lang="en" dir="ltr">Hi so I&#39;m working on a pretty big music curation project - if anyone on here listens to a good bit of Irish music and is willing to help me out (it won&#39;t be time-consumung, I promise), please drop me a DM!</p>&mdash; Oisín (@Oisin1001) <a href="https://twitter.com/Oisin1001/status/1031667582254960640?ref_src=twsrc%5Etfw">20 August 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


Finally, I've started work on the Archive. I want the design to be a list of cards, each corresponding to a different song. This shouldn't be too difficult to code &#8211; it's similar to a [project I followed along](https://github.com/aneagoie/robofriends) as part of a Udacity course I did. The difference is that when you click on one of these cards, it should open the individual track. I don't know how to do this yet, so that part will be a bit of work. (I know it'll be something like passing the correct track to a track component). I'll figure it out.

Anyway, here's the design mockup I've made in Sketch for the archive. It should be responsive and show as many cards as it can in each row, depending on the screen size. I'm not 100% certain yet, but I'm thinking about loading smaller versions of the artist image with a pre-applied gradient for each card. I don't know if having lots of CSS gradients on the screen at the same time is a great idea, so I'm hesitant to do that, but that might change when I start optimising the website for different devices/internet speeds later on. I want to get a barebones version of the site sorted first.

![](/img/08/amhran-archive.png)

Anyway, that's the update. I'm gonna keep working on the archive and see how I get on.