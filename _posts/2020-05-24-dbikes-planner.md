---
title: "dBikes Planner – Predictive Cycle Route-Planning for Dublinbikes"
date: 2019-05-24T21:54:00+00:00
author: Oisín
layout: post
categories:
  - dev
---

As part of my undergrad degree, I had to complete a long-term project that I'd start in September and finish by April. It was a real rollercoaster of a project with many, _many_ failures (which I might put into its own post with a bit of perspective), but in the end I like to think that it all came together in the end.

## My Final Year Project – dBikes Planner

dBikes Planner is an Android journey planning app for cyclists using the Dublinbikes bike-sharing scheme. It allows users to generate cycling routes from their location to a destination, taking into account the availability of bikes at each station.

## Demo time

Here's the app in action (in all its dark mode glory):

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Bgo1CEgx-2w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I'm really happy with how it all turned out! Android UI is finnicky at times, but I think the end result is a very usable app.

## Link to code

You can check it out for yourself over on my [GitHub repo](https://github.com/oisinq/fyp).

## How I built it

The back-end for this project is a Flask web server in Python. It uses a microservices approach, building a HTTP API. scikitlearn is used for generating predictions (specifically their KNeighborsClassifier). I ran into many issues with regression approaches like pyGAM and ARMA/SARIMAX, mostly relating to really long fitting times. I'm pretty new to the world of ML and had a strict deadline, so I switched to kNN which surprisingly gave sufficient results.

The app is currently designed to run on Google AppEngine, incorporating many Google Cloud features. Cloud Storage is used to store historical bike data, and Cloud Functions and Cloud Scheduler are used to add the latest data to this dataset. CycleStreets and OpenStreetMap are used for generating routes.

![UML Diagram](https://dev-to-uploads.s3.amazonaws.com/i/teas901k5a8a88c3engo.png)
_UML Diagram of the system architecture_

The front-end is an Android application. It displays the location and status of each station in Dublin, as well as historical data for a station. Users can input a destination, and will receive a cycling route to reach this destination, incorporating bike-sharing stations. Basic directions are also provided.

![The app's map view](https://dev-to-uploads.s3.amazonaws.com/i/y7caju8eei9nejqyz9wf.jpg)
_The main map view of the application, showing the status of each station in the Dublinbikes bike-sharing scheme_

![The app's station view](https://dev-to-uploads.s3.amazonaws.com/i/na3fwj0sluei7kaniz24.jpg)
_When a user clicks on a station, they can see a Google Street View of the station location, and a graph showing historical and current bike availability._

![The app's route view](https://dev-to-uploads.s3.amazonaws.com/i/elfz88g01ev4klxiyumi.jpg)
_The user can generate a route, and it'll match up the route to the most appropriate bike station, take bike availability prediction into account._

I honestly encountered more failures than I can mention in one post, but I managed to overcome all of them by taking a step back, thinking about the core problem I'm trying to solve and coming up with a reasonable compromise.

I was really impressed by the versatility of Google Cloud. I never used gcloud before this project (or any other major cloud platform). I originally planned to use Heroku, but I encountered performance issues as well as RAM issues due to how I was loading the model. AppEngine worked really well for me (especially when I transitioned from Flex instances to Standard) and I was really impressed by how Google Cloud has a product to solve pretty much any potential need. This was really overwhelming at the start, but with a bit of time I was able to find exactly what I needed.

## Additional Thoughts

This project thought me a lot about Android, Python and ML. In my mind, each of these points are nearly projects in themselves, and it was really satisfying to link them altogether as the project went on. I was pretty new to the worlds of Python and ML, but the availability of so many libraries in Python made it really easy to get up-and-running fast.

Overall, I'm really happy with the finished product. I'm not 100% sure if I'll end up officially releasing the app on Google Play (need to make sure it doesn't bankrupt me lol) but this was still a really good learning experience. I've got **many** issues up on [GitHub](https://github.com/oisinq/fyp/issues) if anyone's interested in helping out, or you can download the [.apk over here](https://github.com/oisinq/fyp/releases) if you're based in Dublin.

If you liked this post, [follow me on Twitter](https://twitter.com/oisinq_). I'm more fun there, I promise.
