---
id: 73
title: 'Music Project Update #4 &#8211; Archive &#038; Links'
date: 2018-08-26T02:34:17+00:00
author: Oisin
layout: post
guid: https://oisin.io/b/?p=73
permalink: /2018/08/26/music-project-update-4-archive-links/
categories:
  - Uncategorised
---
I know I posted eight or so hours ago, but I've done a lot of work in that time. I've finished the Archive page, and set up a linking system that loads specific tracks into the Home component depending on what URL is entered.

To start with, I made up the Archive in HTML. I used a flexbox so it shows a specific number of cards per line depending on the width of the user screen. I absolutely love flexboxes and they make CSS so much easier. If I'm doing anything with CSS at all, I seem to default to flexbox. It just makes everything look so pretty on both my laptop and my phone.

<!--more-->

As I mentioned in the last post, I mentioned how I was gonna use my experience in a past project to make the CardList component. What really shocked me about React was how easy it was to display an array of components. From my "tracks" object, I can use map() to create the card array really easily, and then I can just place that array into the JSX and React does all of the rest of the work for me! It means that a fairly complex part of my website can be written in only 17 lines of code.

<div class="wp-block-coblocks-gist wp-block-coblocks-gist--no-meta">
  <noscript>
    <a href="https://gist.github.com/oisinq/9911de3906eeb6f16ffd1af80c6ff35b">View this gist on GitHub</a>
  </noscript>
</div>

I don't think this is the finished product- I don't think this will work well as the number of tracks grows into the hundreds, so I need to find a way to make that better. I'm also using smaller versions of the main images to load things a bit quicker and not have multiple gradients. I think I'm going to drop the white border though.

<img src="/img/08/Screen-Shot-2018-08-26-at-01.49.25.png" alt="" class="wp-image-72" srcset="/img/08/Screen-Shot-2018-08-26-at-01.49.25.png 1000w, /img/08/Screen-Shot-2018-08-26-at-01.49.25-300x168.png 300w, /img/08/Screen-Shot-2018-08-26-at-01.49.25-768x429.png 768w, /img/08/Screen-Shot-2018-08-26-at-01.49.25-640x358.png 640w" sizes="(max-width: 1000px) 100vw, 1000px" />

I think it all looks pretty slick anyway. Only issue is it should be revere chronological (in this case #006 should be first), but I can work on that.

A major issue that I knew I had to work out was how to get links working for track pages without making a new component each time. As I mentioned before, I've been looking into [react-router](https://github.com/ReactTraining/react-router) and I dived into that a bit more tonight. Turns out with <Route />, you can pass in a function as a component and that function can access any URL parameters. For example, for the URL http://google.com/12345, this function can recognise the number 12345 and do something with it. With a bit more research, I was able to extract the specific track and pass that through to the <Home /> component (which passes it to <Track/> and <Description/>). This was basically exactly what I wanted, so I'm very happy with how that worked out. Also it means that /001 and /1 both bring you to the same page, which is perfect.

I also made up a quick and dirty navbar - it's not perfect and is hard to read sometimes, but it does the job for tonight. There's a weird glitch where when you click Home when on another track page, the Home page background image doesn't keep the "background-size: cover" property so it looks weird. Apart from those few small things I've mentioned here, I think that the site is nearly ready to launch??

<img src="/img/08/Screen-Shot-2018-08-26-at-01.35.58.png" alt="" class="wp-image-71" srcset="/img/08/Screen-Shot-2018-08-26-at-01.35.58.png 1000w, /img/08/Screen-Shot-2018-08-26-at-01.35.58-300x168.png 300w, /img/08/Screen-Shot-2018-08-26-at-01.35.58-768x429.png 768w, /img/08/Screen-Shot-2018-08-26-at-01.35.58-640x358.png 640w" sizes="(max-width: 1000px) 100vw, 1000px" />

I find that kinda crazy, because in the past, I've started projects but then I'd slow down a bit and get distracted by work, college or a shinier project. But in just one week, I've managed to make a near-complete project. I still have more work to do on the social side of things (finding content and making sure I'll have content going into the future) and promotion. I'm really happy with how the site has turned out - it's pretty much identical to what my design mock-ups were.

I'm really happy with how this is turning out. When I've got the things I've mentioned sorted out, I'll get to work with getting the domain and email sorted out, thinking through how the production site will work and general prep for launch (hopefully by mid-September!).