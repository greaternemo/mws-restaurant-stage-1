# Mobile Web Specialist Certification Course
---

## Project Overview: Stage 1

For the **Restaurant Reviews** projects, I have parially converted a static webpage to a mobile-ready web application. In **Stage One**, I have taken a static design that lacks accessibility and converted the design to be responsive on different sized displays and accessible for screen reader use. You will also add a service worker to begin the process of creating a seamless offline experience for your users.

### Specification

I was provided the code for a restaurant reviews website. The code had, and to be fair, still has a lot of issues. It was barely usable on a desktop browser, much less a mobile device. It also didn’t include any standard accessibility features, and it didn’t work offline at all. My job was to update the code to resolve those issues while still maintaining the included functionality.

### How do I set up and review the site?

1. In this folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer.

In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

2. With your server running, visit the site: `http://localhost:8000`.
3. Explore the provided code, and start making a plan to review the implementation of the required features in three areas: responsive design, accessibility and offline use.

I mean, I'll tell you what I did, but I'm not going to teach you how to use the Chrome dev tools.

## So what did you do to fulfill the requirements?

1. To meet the Responsive Design requirements, I restructured most of the static HTML in the pages in minor ways to create consistent columns that I could manipulate in a contained fashion. I added a significant number of classes and went so far as to basically rewrite an expanded stylesheet to accommodate the new class-based styles vs the previous id-based styles. The page scales down on mobile to a width of 360px and hits a static width for the main content after you hit 840px. The responsive redesign was so thorough that I was able to get away with a minimum of media query usage because the content scales very well based solely on the new styles.

2. To meet the Accessibility requirements, I went into this project trying to keep in mind the relation between the semantic meaning of an element and its intrinsic ARIA roles. Most of the page content needed no adjustment. There were no makeshift buttons to graft classes onto or anything. I used the accessibility audit in the Chrome dev tools to check on my style and structure and I was able to pin down some key items that I'd overlooked like low text contrast and the nigh-invisibility of the focus ring. The image alt descriptions are populated dynamically by a utility function on the backend whenever the img elements have their src attributes populated. The page content is arranged according to its' DOM order so the tab flow on the page goes in a logical order, and I added custom labels to the filter dropdowns for screen reader clarity.

3. To meet the Offline Availability requirements, I wrote a script to register a new service worker on page load, and then I wrote a service worker script that's loaded by both of the static HTML pages. The worker has 3 listeners. The 'install' listener adds the baseline content to a cache when the worker is created. The 'fetch' listener intercepts fetch requests and supplies cached content if any is found and requests and caches any content that isn't already cached. And the 'activate' listener clears out any caches tagged with old cache versions when a new instance of the worker is activated. The whole site is cached neatly and loads offline, maps and all.

## Leaflet.js and Mapbox:

This repository uses [leafletjs](https://leafletjs.com/) with [Mapbox](https://www.mapbox.com/).

### Note about ES6

Most of the code in this project that was provided to me was written to the ES6 JavaScript specification for compatibility with modern web browsers and future proofing JavaScript code. I tried to adhere to the same standard in the work I did for the project.

### License

This code is based on a repo that was provided for this project and is not intended for reuse.

