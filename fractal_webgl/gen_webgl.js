const canvas = document.getElementById('canvas');
let gl = canvas.getContext('webgl');

if (!gl) {
    console.error("WebGL not supported, falling back on experimental-webgl");
    gl = canvas.getContext('experimental-webgl');
}

if (!gl) {
    alert("Your browser does not support WebGL");
}

document.getElementById('btn_gen').addEventListener('click', generateFractal);
document.getElementById('btn_save').addEventListener('click', saveFractal);

function generateFractal() {
    console.log("Generating fractal...");
    const real = parseFloat(document.getElementById('input_real').value);
    const imag = parseFloat(document.getElementById('input_imag').value);
    const zoom = parseFloat(document.getElementById('input_zoom').value);
    const iterations = parseInt(document.getElementById('input_iterations').value);
    const width = parseInt(document.getElementById('input_width').value);
    const height = parseInt(document.getElementById('input_height').value);
    const seed = Math.random() * 1000.0; // New seed every time

    canvas.width = width;
    canvas.height = height;
    const wait_msg = document.getElementById("wait");
    wait_msg.innerHTML = "Loading....";
    setTimeout(() => {
        initializeWebGL(real, imag, zoom, iterations, width, height, seed);
        wait_msg.innerHTML = "";
        console.log("Fractal generation complete.");
    }, 100);
}

function saveFractal() {
}

function initializeWebGL(centerReal, centerImag, zoom, iterations, width, height, seed) {
    console.log("Initializing WebGL...");
    const vertexShaderSource = document.getElementById('vertex-shader').text;
    const fragmentShaderSource = document.getElementById('fragment-shader').text;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
        console.error("Shader creation failed");
        return;
    }

    const program = createProgram(gl, vertexShader, fragmentShader);

    if (!program) {
        console.error("Failed to create WebGL program");
        return;
    }

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const centerUniformLocation = gl.getUniformLocation(program, 'u_center');
    const zoomUniformLocation = gl.getUniformLocation(program, 'u_zoom');
    const iterationsUniformLocation = gl.getUniformLocation(program, 'u_iterations');
    const seedUniformLocation = gl.getUniformLocation(program, 'u_seed');

    console.log("WebGL locations initialized.");

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setRectangle(gl, -1, -1, 2, 2);  // This covers the entire canvas

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform2f(centerUniformLocation, centerReal, centerImag);
    gl.uniform1f(zoomUniformLocation, zoom);
    gl.uniform1i(iterationsUniformLocation, iterations);
    gl.uniform1f(seedUniformLocation, seed);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    console.log("Drawing complete.");
}

function createShader(gl, type, source) {
    console.log(`Creating shader of type: ${type}`);
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        console.log("Shader compiled successfully");
        return shader;
    } else {
        console.error("Shader compilation failed:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
}

function createProgram(gl, vertexShader, fragmentShader) {
    if (!vertexShader || !fragmentShader) {
        console.error("Invalid shaders passed to createProgram");
        return null;
    }

    console.log("Creating WebGL program");
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        console.log("Program linked successfully");
        return program;
    } else {
        console.error("Program linking failed:", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
}

function setRectangle(gl, x, y, width, height) {
    const x1 = x;
    const y1 = y;
    const x2 = x + width;
    const y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,
    ]), gl.STATIC_DRAW);
}