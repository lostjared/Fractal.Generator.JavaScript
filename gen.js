        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        document.getElementById('btn_gen').addEventListener('click', generateFractal);
        document.getElementById('btn_save').addEventListener('click', saveFractal);
        
        function generateFractal() {
            const real = parseFloat(document.getElementById('input_real').value);
            const imag = parseFloat(document.getElementById('input_imag').value);
            const zoom = parseFloat(document.getElementById('input_zoom').value);
            const iterations = parseInt(document.getElementById('input_iterations').value);
            const cores = parseInt(document.getElementById('input_cores').value);
            const width = parseInt(document.getElementById('input_width').value);
            const height = parseInt(document.getElementById('input_height').value);
            canvas.width = width;
            canvas.height = height;
            const wait_msg = document.getElementById("wait");
            wait_msg.innerHTML = "Loading....";
            setTimeout(() => {
                const fractal = new Fractal(real, imag, zoom, iterations, cores);
                fractal.draw(ctx, width, height);
                wait_msg.innerHTML = "";
            }, 100);
        }

        function saveFractal() {
            const link = document.createElement('a');
            link.download = 'fractal.png';
            link.href = canvas.toDataURL();
            link.click();
        }