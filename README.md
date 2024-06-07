# Fractal Generator

![screenshot](https://github.com/lostjared/Fractal.Generator.JavaScript/blob/main/screenshot.jpg)

This project is a Fractal Generator that uses JavaScript and HTML5 Canvas to render fractals. The generator allows users to input various parameters to customize the fractal and provides options to save the generated fractal image.

- contains a Julia Fractal generator in the julia/ subdirectory. 
- contains a WebGL implementation of a Fractal generator that has much better performance in the fractal_webgl/ subdirectory.
- contains a WebGL impelmentation of a Julia Fractal generator that has much better performance in the julia_webgl/ subdirectory.

Live versions of this project:

http://lostsidedead.biz/fractal-gl

http://lostsidedead.biz/julia-gl

http://lostsidedead.biz/fractal

http://lostsidedead.biz/julia

## Features

- Customizable parameters for real and imaginary parts, zoom, 
and iterations.
- Generates fractals using HTML5 Canvas.
- Displays a loading message while generating the fractal.
- Option to save the generated fractal image as a PNG file.

## Known Issues

- WebGL versions do not seem to be working on Android.


## Getting Started

### Prerequisites

To run this project, you need a modern web browser with JavaScript 
enabled.

Open `index.html` in your web browser.

### Usage

1. Open the `index.html` file in a web browser.
2. Enter the desired parameters in the input fields:
   - **Real**: The real part of the complex number.
   - **Imaginary**: The imaginary part of the complex number.
   - **Zoom**: The zoom level for the fractal.
   - **Iterations**: The number of iterations for the fractal algorithm.

3. Click the "Generate" button to create the fractal.
4. The fractal will be displayed on the canvas. A "Loading..." message will appear while the fractal is being generated.
5. Click the "Save" button to download the generated fractal as a PNG image.

### Example Parameters

For a quick start, you can use the following example parameters:

- **Real**: `-0.743643887032151`
- **Imaginary**: `0.142625924205330`
- **Zoom**: `1900`
- **Iterations**: `150`

### Project Structure

- `index.html`: The main HTML file containing the user interface.
- `fractal.js`: The JavaScript file that contains the `Fractal` class and logic for generating the fractal.
- `README.md`: This readme file.

### Acknowledgments

- [Math.js](https://mathjs.org/) for complex number calculations.

### Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

### Contact

For questions or suggestions, please open an issue in this repository.
