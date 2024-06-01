const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

document.getElementById('btn_gen').addEventListener('click', generateFractal);
document.getElementById('btn_save').addEventListener('click', saveFractal);

function generateFractal() {
    const real = parseFloat(document.getElementById('input_real').value);
    const imag = parseFloat(document.getElementById('input_imag').value);
    const zoom = parseFloat(document.getElementById('input_zoom').value);
    const iterations = parseInt(document.getElementById('input_iterations').value);
    const paramA = parseFloat(document.getElementById('input_param_a').value);
    const paramB = parseFloat(document.getElementById('input_param_b').value);
    const width = 400;
    const height = 400;
    canvas.width = width;
    canvas.height = height;
    const wait_msg = document.getElementById("wait");
    wait_msg.innerHTML = "Loading....";
    setTimeout(() => {
        const fractal = new Fractal(real, imag, zoom, iterations, 8);
        fractal.draw(ctx, width, height, paramA, paramB);
        wait_msg.innerHTML = "";
    }, 100);
}

function saveFractal() {
    const link = document.createElement('a');
    link.download = 'julia.fractal.png';
    link.href = canvas.toDataURL();
    link.click();
}