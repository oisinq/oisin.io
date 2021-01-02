---
title: "dBikes Planner – Predictive Cycle Route-Planning for Dublinbikes"
date: 2020-05-24T19:24:00+00:00
author: Oisín
layout: post
categories:
  - dev
---

To finish off my undergrad degree, I had to complete a long-term Final Year Project that I'd start in September and finish by April.

I've been really interested in the role tech can play in improving public transport recently, and over the summer I started using Dublinbikes as the final leg of my commute. I knew Dublinbikes had a [great open API](https://data.smartdublin.ie/dataset/dublinbikes/resource/d008c9bf-f34b-46e0-9bc2-a099d728fa1e) and I thought it would be interesting to make something substational with it.

It was a real rollercoaster of a project with many, _many_ failures (which I might put into its own post when I've a bit of perspective), but in the end I'm really happy with how everything ended up.

## My Final Year Project – dBikes Planner

dBikes Planner is an Android journey planning app for cyclists using the Dublinbikes bike-sharing scheme. It allows users to generate cycling routes from their location to a destination. The back-end predicts availability of bikes at each station when generating a route.

Here's the app in action (in all its dark mode glory):

<!-- markdownlint-disable MD033 -->
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Bgo1CEgx-2w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

You can check out the codebase on the [GitHub repo](https://github.com/oisinq/fyp), or the formal [Final Report](https://github.com/oisinq/fyp), which goes into much more detail than this post will on the background, implementation, design and results.

## How I built it

The back-end for this project is a Flask web server in Python. It uses a microservices approach, building a HTTP API. scikitlearn is used for generating predictions (specifically their KNeighborsClassifier). I ran into many issues with regression approaches like pyGAM and ARMA/SARIMAX, mostly relating to really long fitting times that didn't work in a real-time environment. I'm pretty new to the world of ML and had a strict deadline, so I switched to kNN which surprisingly gave sufficient results.

The app is currently designed to run on Google AppEngine, incorporating many Google Cloud features. Cloud Storage is used to store historical bike data, and Cloud Functions and Cloud Scheduler are used to add the latest data to this dataset. CycleStreets and OpenStreetMap are used for generating routes.

![UML Diagram](/img/2020/05/uml.png)
_UML Diagram of the system architecture_

The front-end is an Android application. It displays the location and status of each station in Dublin, as well as historical data for a station. Users can input a destination, and will receive a cycling route to reach this destination, incorporating bike-sharing stations. Basic directions are also provided.

![The app's map view](/img/2020/05/map_view.jpg)
_The main map view of the application, showing the status of each station in the Dublinbikes bike-sharing scheme_

![The app's station view](/img/2020/05/station_view.jpg)
_When a user clicks on a station, they can see a Google Street View of the station location, and a graph showing historical and current bike availability._

![The app's route view](/img/2020/05/route_view.jpg)
_The user can generate a route, and it'll match up the route to the most appropriate bike station, take bike availability prediction into account._

This project had a few problems over the ~8 months, but I managed to overcome all of them with a bit of time. I think the best thing I did was taking a step back, thinking about the core problem I'm trying to solve and coming up with a reasonable compromise.

## Additional Thoughts

This project thought me a lot about Android, Python and ML. In my mind, each of these points are nearly projects in themselves, and it was really satisfying to link them altogether as the project went on. I was pretty new to the worlds of Python and ML, but the availability of so many libraries in Python made it really easy to get up-and-running fast. As someone who used Spring a lot this year, being able to write a API in a handful of lines is really useful. I'm still not sure if I'm a fan of having no types, but it certainly helps you write quick code.

I was really impressed by the versatility of Google Cloud. I never used gcloud before this project (or any other major cloud platform). I originally planned to use Heroku, but I encountered performance issues as well as RAM issues due to how I was loading the model. AppEngine worked really well for me (especially when I transitioned from Flex instances to Standard) and I was really impressed by how Google Cloud has a product to solve pretty much any potential need. This was really overwhelming at the start, but with a bit of time I was able to find exactly what I needed.

Overall, I'm really happy with the finished product. I'm not 100% sure if I'll end up officially releasing the app on Google Play (need to make sure it doesn't bankrupt me lol) but this was still a really good learning experience. I've got a few issues up on [GitHub](https://github.com/oisinq/fyp/issues) if anyone's interested in helping out. I've got a few ideas planned out for future development, but honestly I'm not sure if I want to stay in Android development much longer.

If you want to try out the app for yourself, you can download the [demo .apk over here](https://github.com/oisinq/fyp/releases) if you're based in Dublin. It currently sets Charlemont as a mock location to make testing a bit easier, since I'm in sweet sweet Cavan these days.
