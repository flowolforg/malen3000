# Family Slideshow

A tiny static site to display a photo slideshow. No build tools or external dependencies.

## Use
Open `index.html` locally or host the whole folder with any static web host (e.g. GitHub Pages).

## Add/Remove Photos
Put image files in the `images/` folder and list them inside `index.html` (search for `window.SLIDES`). Keep relative paths so it works on Pages.

## Publish on GitHub Pages
1. Create a new public repo on GitHub (e.g. `family-slideshow`).
2. Upload everything from this folder to the repo root (`index.html`, `styles.css`, `script.js`, and the `images/` folder).
3. In the repo settings, enable **Pages** → **Deploy from branch** → branch `main`, folder `/ (root)`.
4. Wait a minute, then open the URL GitHub gives you.
