class Fractal {
    constructor(centerReal = -0.5, centerImag = 0, zoom = 1, iterations = 80, threadCount = 4) {
        this.centerReal = centerReal;
        this.centerImag = centerImag;
        this.zoom = zoom;
        this.iterations = iterations;
        this.threadCount = threadCount;
        this.colorPalette = [];
        this.loadPalette();
    }

    loadPalette() {
        for (let i = 0; i < this.iterations; i++) {
            this.colorPalette.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
        }
    }

    mandelbrot(c) {
        let z = math.complex(0, 0);
        let n = 0;
        while (math.abs(z) <= 2 && n < this.iterations) {
            z = math.add(math.multiply(z, z), c);
            n++;
        }
        return n;
    }

    drawPixel(data, width, height, x, y, start, end, imStart, imEnd) {
        const w = x / width;
        const h = y / height;
        const c = math.complex(start + w * (end - start), imStart + h * (imEnd - imStart));
        const n = this.mandelbrot(c);
        const index = (y * width + x) * 4;

        if (n === this.iterations) {
            data[index] = 0;
            data[index + 1] = 0;
            data[index + 2] = 0;
            data[index + 3] = 255; // alpha
        } else {
            const [r, g, b] = this.colorPalette[n].match(/\d+/g).map(Number);
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
            data[index + 3] = 255; // alpha
        }
    }

    draw(ctx, width, height) {
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        const aspectRatio = width / height;
        const rangeReal = 4.0 / this.zoom;
        const rangeImag = rangeReal / aspectRatio;
        const start = this.centerReal - rangeReal / 2;
        const end = this.centerReal + rangeReal / 2;
        const imStart = this.centerImag - rangeImag / 2;
        const imEnd = this.centerImag + rangeImag / 2;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.drawPixel(data, width, height, x, y, start, end, imStart, imEnd);
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }
}