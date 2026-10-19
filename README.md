# Engineer Connect

A website where engineers can share ideas and make connections.

## Pages
1. `index.html`: home page. Choose your area (Mechanical, Electrical, Chemical, Civil, Aerospace, Software).
2. `goals.html`: choose what you want: **Ideas** or **Connections**.
3. `ideas.html`: post ideas, filter by area, and back the ones you like.
4. `connections.html`: browse engineers, search by skill or location, and send connection requests.

Shared look: `style.css`. Shared code and starter content: `app.js`.

## Current limits
Everything is saved in your own browser only, so other people can't see your ideas yet.
The engineers on the Connections page are made-up examples. Real sign-up, shared data
and messaging need a server and a database, which is the next stage.

## When you change style.css or app.js
Every page loads them as `style.css?v=3` and `app.js?v=3`. Bump the number on all pages
after a change, so browsers fetch the new version instead of an old saved copy.
