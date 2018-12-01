---
id: 52
title: 'Music Project Update #2 – I wrote some code!'
date: 2018-08-20T00:37:22+00:00
author: Oisin
layout: post
guid: https://oisin.io/b/?p=52
permalink: /2018/08/20/music-project-update-2-i-wrote-some-code/
categories:
  - Uncategorised
---
It’s been a long day, but I got a lot of work done in relation to this project. I started off finishing off my design concept. I put in the black gradient that I mentioned in the last post and added a review placeholder (which I borrowed from Hot Press – sorry guys!).
<!--more-->
![](/img/08/amhran-black-gradient.jpg)
*>What’s that “Amhran” thing in the top left hand corner? Well, that’s the project name. I didn’t want to give it away last time, but I think I might as well say it here – it’s not like anyone reads this…*

I was pretty happy with how the black gradient was working out. So with this rough design idea, it was time to get to work. I wanted to use React to build the site (since that what I used a few weeks ago to build [Box For Your Face,](http://boxforyourface.herokuapp.com/) even if it was more of a web-app than this will be). I ran “create-react-app” on npm, set up a [git repo](https://github.com/oisinq/amhran) and started coding.


<img src="/img/08/progress-1.jpg " height="700" />
*Progress!*

To be honest, things were pretty easy to code. I had some issues with CSS (but then again, who hasn’t) but that was mostly down to me being a bit rusty. I had issues with the linear-gradient, but once I figured out how to do what I wanted, the code itself is actually pretty simple.

<blockquote class="twitter-tweet" data-lang="en-gb"><p lang="en" dir="ltr">I&#39;m after spending an hour trying to figure out why my gradient would work in Chrome/Firefox and not Safari.<br><br>Turns out I had typed &quot;rgb&quot; instead of &quot;rgba&quot;, and Safari didn&#39;t like that</p>&mdash; Oisín (@Oisin1001) <a href="https://twitter.com/Oisin1001/status/1031172743339884545?ref_src=twsrc%5Etfw">19 August 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Anyway, I worked away bit by bit emulating my design mockup, and after a good few hours, I basically had the finished product, design-wise! Instead of a big play button, it has an embedded play button from Spotify, Soundcloud or Bandcamp. This means I don’t have to worry about copyright issues, as well as dealing with extra bandwidth. One issue with this is that for Spotify, you have to be logged in to stream the full track on desktop. If on mobile, you can only play the full track in the Spotify app, which is super annoying. But there’s nothing I can do about that really. I shouldn’t have that issue with Soundcloud or Bandcamp. Another issue is that my [Privacy Badger](https://www.eff.org/privacybadger) plugin disables the Spotify embed. There’s no real way around this – I should test the site with AdBlock Plus, Ghostify, etc.

I also added a submission form so people could send in tracks they think should be featured. I don’t really want to deal with POST requests if possible (I’ll say more about this later). I found [Formspree](http://formspree.io) on a random Reddit thread and it seems to exactly what I need – it forwards on any form submissions straight to my email, so I don’t have to deal with a server listening for POST requests or a database to store the submissions. I need to test it out more soon, but it seems perfect for my needs.

Anyway, just like that I had a working demo made in React! I was able to throw the code up on Heroku quickly and I now had a full website I could show off to my friends.

![](/img/08/firefox_2018-08-19_22-55-30.png)

![](/img/08/firefox_2018-08-19_22-55-40.png)

Of course, it’s 2018, so your mobile website is probably just as important as your desktop website. I’ve put a few screenshots below – I think it looks pretty slick.

<img src="/img/08/IMG_8259-1.png" height="700" />

<img src="/img/08/IMG_8260.png" height="700" />

<img src="/img/08/IMG_8261-1.png" height="700" />

<img src="/img/08/IMG_8262.png" height="700" />

After deploying the app, I started having some thoughts. With the React app I made a few weeks ago, I had two Heroku apps – one for the front-end and one for the back-end. They communicated using a RESTful API. It worked perfectly, but now I’m thinking I don’t really need this for this app? There’s no need to let users log in, and everything is pretty static. The only thing that changes is the song of the day and the review. I know I could do this with a database, but is that really necessary? I don’t really want to spend a fortune on hosting either (especially considering how expensive .ie domains are).

I’ve looked at [Netlify](http://netlify.com) before, and they seem really good – they offer completely free static website hosting. So do Github Pages actually. But how would these handle a site that updates everyday? Would I be able to schedule it so it updates at a certain time with minimal effort? I’ll have less time to work on this site when I go back to college, so if I feed data into the site, I want it to be able to do most of the work for me. From what I’ve seen, this might be possible, so that’s probably the route I’ll go down. I’ve a lot more research to do.

Even though I have the main page nearly completed, I still have more work to do:
* Archive of previous entries
* Figure out deployment
* Make a list of new Irish tracks
* Maybe try and get some people to work on the site with me?

Anyway, that’s all ahead of me. Probably gonna try and work on the Archive next, but I’m not sure how much time I’ll have with work and everything. If I could get this launched before college starts, I’d be very happy.