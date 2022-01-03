# oisin.io

This is my personal website and blog. It's built using 11ty and TailwindCSS.

Based off the [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog) template, with lots of custom styling.

## Installation

Make sure you have [node and npm](https://nodejs.org/en/) installed. Then run:

```
npm install
```

## Running locally

Run these commands in two concurrently in two different terminals (both of these commands run in `--watch` mode, but there's probably a better way to do this...):

```
npm start
npm run tailwind
```

Then navigate to the web server address listed in the first terminal window (it will look something like this: `localhost:8080`).

If you want to display my last.fm listening history, you'll need to set the env variable `LASTFM_API_KEY` with a [last.fm API key](https://www.last.fm/api/account/create).
