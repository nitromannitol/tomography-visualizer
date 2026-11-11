# Tomography Visualizer

A small in-browser demonstration of tomography: estimating an image from noisy line
integral measurements. The page draws a random target image, simulates noisy measurements
along a chosen number of lines (500, 1000 or 2000), and reconstructs the target by
regularized least squares with an adjustable smoothing parameter `λ`. The true target can be
revealed for comparison.

A demonstration was published at
<http://web.stanford.edu/class/ee103/visualizations/tomography/tomography.html>; the page
footer says it was made for the Stanford course EE103.

## Running

The page is static HTML and JavaScript and has no build step. It loads jQuery and Bootstrap from public CDNs
and MathJax from `cdn.mathjax.org` ([`tomography.html`](tomography.html)), so it needs an
internet connection; `cdn.mathjax.org` was retired in 2017, so the formulas on the page may
not render. The target image is read through a canvas
([`tomography.js`](tomography.js) around line 203), and some browsers refuse canvas pixel
access for pages opened from `file://` URLs. Serve the directory with any static web server
and open the page, for example:

```
python3 -m http.server 8000
```

and then open `http://localhost:8000/tomography.html`.

The reconstruction solves `(AᵀA + λ DᵀD) x = Aᵀ y` for the pixel vector `x`, where `A` holds
the line integral weights, `y` the measurements with Gaussian noise of standard deviation
`0.3`, and `D` the finite differences between neighbouring pixels. The slider moves `λ`
on a logarithmic scale between `0.1` and `100`.

## Repository layout

| Path | Contents |
|---|---|
| [`tomography.html`](tomography.html), [`tomography.css`](tomography.css) | the page and its style |
| [`tomography.js`](tomography.js) | measurement generation, reconstruction and plots |
| [`tomo-linalg.js`](tomo-linalg.js) | small matrix helpers (`eye`, `zeros`, `horzcat`, `vertcat`, …) |
| [`range-slider.js`](range-slider.js), [`range-slider.css`](range-slider.css) | slider widget (`range-slider.js` is third party, see Third-party files) |
| [`img/`](img/) | the target images `img1.png` to `img22.png` that the page picks from, and `heatmap.png`, the colour legend |
| [`generateHeatMapLegend.jl`](generateHeatMapLegend.jl) | Julia script (Plotly heat map with a custom colour scale) for the legend; written for a Julia release before 1.0 and not maintained |
| [`normalizeImages.py`](normalizeImages.py) | resizes full-size `.tif` images to 60 × 60 PNG; written for the legacy `import Image` form of the Python Imaging Library, and it reads `full_size_imgs/*.tif` and writes `img2/` |
| [`d3.min.js`](d3.min.js), [`numeric-1.2.6.js`](numeric-1.2.6.js), [`jquery.flot.js`](jquery.flot.js) | bundled third-party libraries (see Third-party files); `numeric-1.2.6.js` and `jquery.flot.js` are loaded by the page, `d3.min.js` is not |

## Authors and citation

The code is by **Ahmed Bou-Rabee**; the bundled libraries are by their own authors, named
under Third-party files.

## Third-party files

The bundled third-party files keep their own licences and notices:

- [`d3.min.js`](d3.min.js) is d3 version 3.3.0 by Mike Bostock, distributed upstream under
  the BSD 3-clause licence.
- [`numeric-1.2.6.js`](numeric-1.2.6.js) is numeric.js 1.2.6 by Sébastien Loisel, distributed
  upstream under the MIT licence. The file embeds a seeded random number generator by David Bau
  whose BSD licence notice is kept in the file.
- [`jquery.flot.js`](jquery.flot.js) is Flot 0.8.3, "Copyright (c) 2007-2014 IOLA and Ole
  Laursen. Licensed under the MIT license." The notice is kept in the file header, which also
  contains the jQuery color helpers plugin by Ole Laursen, released under the MIT licence.
- [`range-slider.js`](range-slider.js) is the range slider of Taufik Nurrohman, dedicated
  to the public domain (the notice is kept in the file header).

